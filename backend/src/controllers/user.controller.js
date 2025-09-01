import UserService from "../services/users.service.js";
import {
  createHash,
  isValidPassword,
  generateJWToken,
} from "../utils/utils.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const userService = new UserService();

export const postUserController = async (req, res) => {
  try {
    const { user, password, rol } = req.body;

    if (!user || !password || !rol) {
      return res.status(400).send({ error: "Debe completar los campos!" });
    }

    let exist = await userService.findUser(user);
    if (exist) {
      return res
        .status(400)
        .send({ error: "Usuario no disponible, intenta con otro!" });
    }

    const userCreate = await userService.post({
      user,
      password: createHash(password),
      rol,
    });
    res.status(201).send({ status: "Success", payload: userCreate });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).send({ error: "Debe completar los campos!" });
    }

    let userLogin = await userService.findUser(user);
    if (!userLogin) {
      return res.status(400).send({ error: "Credenciales invalidas!" });
    }

    if (!isValidPassword(userLogin, password)) {
      return res
        .status(401)
        .send({ status: "error", error: "Credenciales invalidas" });
    }

    const tokenPayload = {
      id: userLogin._id,
      user: userLogin.user,
      rol: userLogin.rol,
    };

    const token = generateJWToken(tokenPayload);

    res.cookie("jwtCookieToken", token, {
      maxAge: 5 * 60 * 60 * 1000,
      httpOnly: true,
      signed: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).send({ status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const logoutController = async (req, res) => {
  try {

    res.clearCookie("jwtCookieToken", {
      httpOnly: true,
      signed: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).send({ status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    res.send({ payload: req.user });
  } catch (error) {
    console.log(error);
    res.send({ error: "Error al obtener el usuario" });
  }
};

export const getUsersController = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.send({ status: "Success", payload: users });
  } catch (error) {
    console.log(error);
    res.send({ error: "Error al obtener los usuarios" });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userService.getById(uid);
    if (!user) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }
    res.send({ status: "Success", payload: user });
  } catch (error) {
    console.log(error);
    res.send({ error: "Error al obtener el usuario!" });
  }
};

export const putUsersController = async (req, res) => {
  try {
    const { uid } = req.params;
    const { user, password } = req.body;

    if (!user && !password) {
      return res
        .status(400)
        .send({ error: "Debe completar al menos 1 campo!" });
    }

    let exist = await userService.findUser(user);
    console.log(exist)
    if (exist) {
      return res
        .status(400)
        .send({ error: "Usuario no disponible, intenta con otro!" });
    }

    // Buscar el usuario actual
    const userExistente = await userService.getById(uid);
    if (!userExistente) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    if (userExistente.rol === "superadmin") {
      return res
        .status(403)
        .send({ error: "No puedes modificar un usuario superadmin!" });
    }

    // Construir objeto de update solo con los campos enviados
    const updateData = {};
    if (user) updateData.user = user;
    if (password) updateData.password = createHash(password);

    const userUpdate = await userService.update(uid, updateData);

    res.send({ status: "success", payload: userUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al actualizar el usuario" });
  }
};

export const deleteUsersController = async (req, res) => {
  try {
    const { uid } = req.params; //Usuario a eliminar
    const userId = req.user.id; //Usuario que realiza la peticion

    if (uid === userId) {
      return res
        .status(400)
        .send({ error: "No puedes eliminar tu propio usuario!" });
    }

    const isSuperAdmin = await userService.getById(uid);
    if (isSuperAdmin.rol === "superadmin") {
      return res
        .status(403)
        .send({ error: "No tienes permisos para eliminar usuarios!" });
    }

    const userDelete = await userService.delete(uid);
    if (!userDelete) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }
    res.send({ status: "Success", payload: userDelete });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al eliminar el usuario" });
  }
};

export const editPasswordController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, password } = req.body;

    if (!oldPassword || !password) {
      return res
        .status(400)
        .send({ error: "Debe completar todos los campos!" });
    }

    const user = await userService.getById(userId);
    if (!user) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    if (!isValidPassword(user, oldPassword)) {
      return res.status(401).send({ error: "Contraseña actual incorrecta" });
    }

    const hashedNewPassword = createHash(password);
    await userService.update(userId, { password: hashedNewPassword });

    res.send({
      status: "Success",
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).send({ error: "Error al actualizar la contraseña" });
  }
};
