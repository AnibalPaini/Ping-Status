import DeviceHistoryService from "../services/deviceHistory.service.js";

const deviceHistoryService = new DeviceHistoryService();

export const getDeviceHistoryController = async (req, res) => {
  try {
    const { did } = req.params;

    const deviceHistory = await deviceHistoryService.findById(did);

    if (!deviceHistory) {
      return res.status(404).send({ error: "No encontrado!" });
    }

    // Ordenar el array de history en cada documento
    deviceHistory.forEach((doc) => {
      if (Array.isArray(doc.history)) {
        doc.history.sort((a, b) => new Date(b.time) - new Date(a.time));
      }
    });

    res.status(200).send({ status: "Success", payload: deviceHistory });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const deleteDeviceHistoryController = async (req, res) => {
  try {
    const { did } = req.params;
    const result = await deviceHistoryService.update(did, { history: [] });

    if (!result) {
      return res.status(404).send({ error: "No encontrado!" });
    }

    res.status(200).send({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const deleteDeviceHistoryByIdDeviceController = async (req, res) => {
  try {
    const { did } = req.params;
    const result = await deviceHistoryService.deleteHistoryByIdDevice(did, { history: [] });

    if (!result) {
      return res.status(404).send({ error: "No encontrado!" });
    }

    res.status(200).send({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};