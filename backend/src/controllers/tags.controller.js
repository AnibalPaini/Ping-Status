import TagsService from "../services/tag.service.js";
import DeviceService from "../services/device.service.js";

const tagsService = new TagsService();
const deviceService = new DeviceService();

export const getTagsController = async (req, res) => {
  try {
    const tags = await tagsService.getAll();
    res.status(200).send({ status: "Success", payload: tags });
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

export const getTagsByIdController = async (req, res) => {
  try {
    const { tid } = req.params;
    const tag = await tagsService.getById(tid);
    if (!tag) {
      return res.status(404).send("No se encontro el tag");
    }
    res.status(200).send({ status: "Success", payload: tag });
  } catch (error) {
    console.log(error);

    res.status(500).send("error");
  }
};

export const postTagsController = async (req, res) => {
  try {
    const { name, color } = req.body;
    if ((!name, !color)) {
      return res.status(400).send("Debe completar los campos");
    }
    const tag = await tagsService.create({ name, color });
    res.status(201).send({ status: "Success", payload: tag });
  } catch (error) {
    console.log(error);
    res.status(500).send("error" + error);
  }
};

export const deleteTagsController = async (req, res) => {
  try {
    const { tid } = req.params;
    if (!tid) {
      return res.status(400).send({ error: "ID invalido o indefinido!" });
    }
    const deleteTag = await tagsService.delete(tid);
    if (!deleteTag) {
      return res.status(404).send({ error: "ID no encontrado!" });
    }

    //Actualizar dispositivos que tengan esa etiqueta
    const devices = await deviceService.getDevicesByTag(tid);
    

    for (const d of devices) {
      const updatedTags = d.tag.filter((tag) => tag.toString() !== tid);
      await deviceService.update(d._id, { tag: updatedTags });
    }

    res.status(200).send({ status: "Success", payload: deleteTag });
  } catch (error) {
    console.log(error);
    res.status(500).send("error" + error);
  }
};
