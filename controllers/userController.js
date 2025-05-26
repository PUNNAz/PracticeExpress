import * as userService from "../services/userService.js";
import jwt from "jsonwebtoken";
import path from "path";

export async function getAllUserController(req, res) {
  try {
    const users = await userService.getAllUser();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
}

export async function registerController(req, res) {
  const { username, email, password, firstname, lastname } = req.body;
  const imageFile = req.file;
  const imagePath = imageFile ? imageFile.filename : null;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "username, email, and password are required" });
  }

  try {
    const result = await userService.registerUser({
      username,
      email,
      password,
      firstname,
      lastname,
      image: imagePath,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function loginController(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  try {
    const user = await userService.loginUser(username, password);

    const token = jwt.sign(
      { id: user.UID, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export async function deleteUserController(req, res) {
  const { uid } = req.params;
  try {
    await userService.deleteUser(uid);
    res.json({ message: `User ID : ${uid} deleted successfully` });
  } catch (error) {
    if (error.message === "User not Found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Database error" });
  }
}

export async function updateUserController(req, res) {
  const { uid } = req.params;
  const body = req.body || {}; // ป้องกัน req.body เป็น undefined
  const { username, email, password, firstname, lastname } = body;
  const imageFile = req.file;
  const imagePath = imageFile ? imageFile.filename : null;
  try {
    await userService.updateUser(uid, {
      username,
      email,
      password,
      firstname,
      lastname,
      image: imagePath,
    });

    res.json({ message: `User ID :  ${uid}  updated successfully` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getImageController(req, res) {
  const { uid } = req.params;
  try {
    const imageName = await userService.getImage(uid);
    if (!imageName) {
      return res.status(404).json({ error: "Image not found" });
    }
    const imagePath = path.join(process.cwd(), "uploads", imageName);
    res.sendFile(imagePath, (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to send image" });
      }
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export async function getFullnameController(req, res) {
  const { uid } = req.params;
  try {
    const result = await userService.getFullname(uid);
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
