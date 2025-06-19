import * as userService from "../services/userService.js";
import jwt from "jsonwebtoken";
import path from "path";
import {
  successResponse,
  errorResponse,
} from "../middleware/responseMessage.js";

export async function getAllUserController(req, res) {
  try {
    const users = await userService.getAllUser();
    successResponse(res, users);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function registerController(req, res) {
  const body = req.body;
  const imageFile = req.file;
  const imagePath = imageFile ? imageFile.filename : null;

  if (!body.username || !body.email || !body.password) {
    throw new Error("username, email, and password are required");
  }

  const userData = { ...body, image: imagePath };
  try {
    const result = await userService.registerUser(userData);
    successResponse(res, result, "Register Success");
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function loginController(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error("username and password are required");
  }

  try {
    const user = await userService.loginUser(username, password);

    const token = jwt.sign(
      { id: user.UID, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({ token });
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function deleteUserController(req, res) {
  const { uid } = req.params;
  try {
    const result = await userService.deleteUser(uid);
    successResponse(res, result, `User ID : ${uid} deleted successfully`);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function updateUserController(req, res) {
  const { uid } = req.params;
  const body = req.body;
  const imageFile = req.file;
  const imagePath = imageFile ? imageFile.filename : null;

  const userData = {
    uid,
    ...body,
    image: imagePath,
  };
  try {
    const result = await userService.updateUser(userData);
    successResponse(res, result, `User ID :  ${uid}  updated successfully`);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function getImageController(req, res) {
  const { uid } = req.params;
  try {
    const imageName = await userService.getImage(uid);
    if (!imageName) {
      throw new Error("Image not found");
    }
    const imagePath = path.join(process.cwd(), "uploads", imageName);
    res.sendFile(imagePath, (err) => {
      if (err) {
        throw new Error("Failed to send image");
      }
    });
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function getFullnameController(req, res) {
  const { uid } = req.params;
  try {
    const result = await userService.getFullname(uid);
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}
