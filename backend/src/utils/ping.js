import ping from "ping";
import deviceHistoryModel from "../db/models/deviceHistory.model.js";
import deviceStatsModel from "../db/models/deviceStats.model.js";
import DeviceService from "../services/device.service.js";
import { io } from "../app.js";
import { sendTelegramMessage } from "./botTelegram.js";
import config from "../config/config.js"; 

const deviceService = new DeviceService();

const timePing = 60 * 1000; //1min


const pings = () => {
  setInterval(async () => {
    const hosts = await deviceService.getAll();
    eventStatusDevices(hosts);
    for (let host of hosts.filter((h) => h.paused === false)) {
      checkDevice(host);
    }
  }, timePing);
};

const checkDevice = async (host) => {
  let devicesStats = await deviceStatsModel.findOne({ deviceId: host._id });
  if (!devicesStats) {
    devicesStats = await deviceStatsModel.create({
      deviceId: host._id,
      recentPings: [],
    });
  }
  const res = await ping.promise.probe(host.ip, { timeout: 5 });
  const newIsAlive = res.alive;

  if (newIsAlive !== host.isAlive) {
    const existingHistory = await deviceHistoryModel.findOne({
      deviceId: host._id,
    });

    const historyEntry = {
      status: newIsAlive ? "UP" : "DOWN",
      message: res.output,
      time: new Date(),
    };

    if (existingHistory) {
      await deviceHistoryModel.updateOne(
        { deviceId: host._id },
        {
          $push: { history: historyEntry },
        }
      );

      // limpieza por dias configurados
      if (host.historyRetentionDays > 0) {
        const msToKeep = host.historyRetentionDays * 24 * 60 * 60 * 1000;
        await deviceHistoryModel.updateOne(
          { deviceId: host._id },
          {
            $pull: {
              history: { time: { $lt: new Date(Date.now() - msToKeep) } },
            },
          }
        );
      }
    } else {
      await deviceHistoryModel.create({
        deviceId: host._id,
        history: [historyEntry],
      });
    }

    await deviceService.update(host.id, { isAlive: newIsAlive });

    if (host.notifications) {
      // Verifica que la configuración de Telegram esté completa antes de enviar
      if (config.TELEGRAM_TOKEN && config.TELEGRAM_CHAT_ID) {
        sendTelegramMessage(
          `${host.name} -(${host.ip}) ${newIsAlive ? "🟢UP" : "🔴DOWN"}`
        ).catch((err) => {
          console.error("Error al enviar mensaje a Telegram:", err);
        });
      } else {
        // Telegram no configurado, solo loguea y sigue
        console.warn("Telegram no está configurado correctamente. Mensaje no enviado.");
      }
    }
  }

  await deviceStatsModel.updateOne(
    { deviceId: host._id },
    {
      $push: {
        recentPings: {
          $each: [
            {
              status: newIsAlive ? "UP" : "DOWN",
              timestamp: new Date(),
              ms: res.avg === "unknown" ? null : parseFloat(res.avg),
            },
          ],
        },
      },
    }
  );

  await deviceStatsModel.updateOne(
    { deviceId: host._id },
    {
      $pull: {
        recentPings: {
          timestamp: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // elimina pings más antiguos de 24 horas
        },
      },
    }
  );

  let updatedStats = await deviceStatsModel.findOne({ deviceId: host._id });

  let total = updatedStats.recentPings.length;
  let pingUp = updatedStats.recentPings.filter((p) => p.status === "UP").length;
  let pingDown = total - pingUp;
  let promedio = total > 0 ? (pingUp / total) * 100 : 0;
  promedio = promedio.toFixed(promedio === 100 ? 0 : 2);

  io.emit("stats:update", {
    deviceId: host._id,
    promedio: promedio,
    ms: res.avg === "unknown" ? "Not Response" : res.avg,
  });

  io.emit("device:update", {
    deviceId: host._id,
    isAlive: newIsAlive,
  });

  let lastsPings = updatedStats.recentPings.slice(-20);

  io.emit("pings:update", {
    deviceId: host._id,
    lastsPings: lastsPings,
  });
};

const eventStatusDevices = (hosts) => {
  let devicesConnected = hosts.filter(
    (host) => host.isConnected && host.paused === false
  ).length;

  let devicesDisconnected = hosts.filter(
    (host) => host.isConnected === false
  ).length;

  io.emit("pings:connected", {
    connected: devicesConnected,
    disconnected: devicesDisconnected,
  });
};

export default pings;
