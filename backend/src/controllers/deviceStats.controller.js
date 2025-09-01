import DeviceStatsService from "../services/deviceStats.service.js";
const deviceStatsService = new DeviceStatsService();

export const getDeviceStatController = async (req, res) => {
  try {
    const { did } = req.params;
    const stats = await deviceStatsService.getByDeviceId(did);

    let total = stats?.recentPings.length || 0;
    let pingUp = stats?.recentPings.filter((p) => p.status === "UP").length ||0;
    let pingDown = total - pingUp||0;
    let promedio = total > 0 ? (pingUp / total) * 100 : 0;
    promedio = promedio.toFixed(promedio === 100 ? 0 : 2);
    let paused = (stats?.deviceId && stats.deviceId.paused) || false;

    let lastPing = stats?.recentPings[total - 1] || 0;
    let ms = lastPing.ms ||0;

    res.status(200).send({
      payload: { total, pingUp, pingDown, promedio, paused, ms },
    });
  } catch (error) {
    res.status(500).send("Error");
    console.log(error);
  }
};

export const getDevicesPromedios = async (req, res) => {
  try {
    const { did } = req.params;
    const stats = await deviceStatsService.getByDeviceId(did);

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hora atrás

    const lastHourPings = stats?.recentPings.filter(
      (p) => p.timestamp > oneHourAgo && p.ms !== null
    ) || 0;

    const avgLastHour =
      lastHourPings.length > 0
        ? (
            lastHourPings.reduce((sum, p) => sum + parseFloat(p.ms), 0) /
            lastHourPings.length
          ).toFixed(2)
        : 0;
    //---------------
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const lastDayPings = stats?.recentPings.filter(
      (p) => p.timestamp > dayAgo && p.ms !== null
    ) || 0;

    const avgLastDay =
      lastDayPings.length > 0
        ? (
            lastDayPings.reduce((sum, p) => sum + parseFloat(p.ms), 0) /
            lastDayPings.length
          ).toFixed(2)
        : 0;
    //----------------

    const avgLastDowns = stats?.recentPings.filter(
      (p) => p.status === "DOWN"
    ).length;

    res
      .status(200)
      .send({ payload: { avgLastDay, avgLastHour, avgLastDowns } });
  } catch (error) {
    res.status(500).send("Error en el servidor.");
    console.log(error);
  }
};

export const getLastsPings = async (req, res) => {
  try {
    const { did } = req.params;
    const device = await deviceStatsService.getByDeviceId(did);
    if (!device) {
      return res.status(404).send({error:"Not Found"})
    }
    const lastsPings= device.recentPings.slice(-20)

    res.send({status:"Success", payload:lastsPings});
  } catch (error) {
    console.log(error);
    res.status(500).send("Error")
  }
};
