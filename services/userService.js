import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";
import { Users } from "../model/users";
import { Op } from "sequelize";
import sequelize from "../db";

export async function getAllUser() {
  const user = await Users.findAll();
  return user;

  // const [rows] = await pool.query("SELECT * FROM Users");
  // return rows;
}

export async function registerUser(userData) {
  try {
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [
          { username: { [Op.eq]: userData.username } },
          { email: { [Op.eq]: userData.email } },
        ],
      },
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await Users.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
    });
    return user
  } catch (error) {
    if (userData.image) {
      const imagePath = path.join(process.cwd(), "uploads", userData.image);
      try {
        await fs.unlink(imagePath);
      } catch (unlinkError) {
        throw new Error(
          `Failed to delete image after register error: ${unlinkError}`
        );
      }
    }
    throw error; // โยน error ต่อไปให้ controller จัดการ}
  }

  // try {
  //   const [existingUsers] = await pool.query(
  //     "SELECT * FROM Users WHERE username = ? OR email = ?",
  //     [username, email]
  //   );
  //   if (existingUsers.length > 0) {
  //     throw new Error("Username or email already exists");
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const [result] = await pool.execute(
  //     "INSERT INTO Users (username, email, password, firstname, lastname, image) VALUES (?, ?, ?, ?, ?, ?)",
  //     [username, email, hashedPassword, firstname, lastname, image]
  //   );
  //   return { id: result.insertId, username, email, firstname, lastname, image };
  // } catch (error) {
  //   // ถ้ามี image ให้ลบไฟล์รูปที่เก็บไว้ก่อน throw error ต่อ
  //   if (image) {
  //     const imagePath = path.join(process.cwd(), "uploads", image);
  //     try {
  //       await fs.unlink(imagePath);
  //     } catch (unlinkError) {
  //       // log error ลบไฟล์ไม่สำเร็จ แต่ไม่ขัดขวาง flow หลัก
  //       console.error(
  //         "Failed to delete image after register error:",
  //         unlinkError.message
  //       );
  //     }
  //   }
  //   throw error; // โยน error ต่อไปให้ controller จัดการ
  // }
}

export async function loginUser(username, password) {
  const user = await Users.findOne({
    where: { username: { [Op.eq]: username } },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  return user;

  // const [rows] = await pool.query("SELECT * FROM Users WHERE username = ?", [
  //   username,
  // ]);
  // if (rows.length === 0) {
  //   throw new Error("Invalid username or password");
  // }

  // const user = rows[0];
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   throw new Error("Invalid username or password");
  // }
  // return user;
}

export async function deleteUser(uid) {
  const user = await Users.findByPk(uid);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.image) {
    const imagePath = path.join(process.cwd(), "uploads", user.image);
    try {
      await fs.unlink(imagePath);
    } catch (err) {
      throw new Error("Failed to delete image");
    }
  }

  await user.destroy();
  return user
  // const [rows] = await pool.query("SELECT image FROM Users WHERE UID = ?", [
  //   uid,
  // ]);
  // if (rows.length === 0) {
  //   throw new Error("User not found");
  // }

  // const image = rows[0].image;
  // if (image) {
  //   // path ไฟล์รูป
  //   const imagePath = path.join(process.cwd(), "uploads", image);

  //   // ลบไฟล์รูป ถ้ามี
  //   try {
  //     await fs.unlink(imagePath);
  //   } catch (err) {
  //     // ถ้าไฟล์ไม่เจอหรือ error อื่น ๆ อาจจะ log ไว้
  //     console.error("Failed to delete image:", err.message);
  //   }
  // }

  // const [result] = await pool.execute("DELETE FROM Users WHERE UID = ?", [uid]);
  // if (result.affectedRows === 0) {
  //   throw new Error("User not found");
  // }
}

export async function updateUser(userData) {
  const user = await Users.findByPk(userData.uid);

  if (!user) throw new Error("User not found");

  // hash password ถ้ามี
  let hashedPassword = null;
  if (
    typeof userData.password === "string" &&
    userData.password.trim() !== ""
  ) {
    hashedPassword = await bcrypt.hash(userData.password, 10);
  }

  // เก็บรูปเก่าเพื่อลบถ้ามีการเปลี่ยนแปลง
  const oldImage = user.image;

  // อัปเดตข้อมูล user (ใช้ Sequelize update)
  await user.update({
    username: userData.username ?? user.username,
    email: userData.email ?? user.email,
    password: hashedPassword ?? user.password,
    firstname: userData.firstname ?? user.firstname,
    lastname: userData.lastname ?? user.lastname,
    image: userData.image ?? user.image,
  });

  if (userData.image && oldImage && oldImage !== userData.image) {
    const oldImagePath = path.join(process.cwd(), "uploads", oldImage);
    try {
      await fs.unlink(oldImagePath);
    } catch (err) {
      throw new Error(`Failed to delete old image: ${err.message}`);
    }
  }

  return user;

  // const [rows] = await pool.query("SELECT image FROM Users WHERE UID = ?", [
  //   uid,
  // ]);
  // if (rows.length === 0) throw new Error("User not found");

  // const oldImage = rows[0].image;

  // let hashedPassword = null;
  // if (typeof password === "string" && password.trim() !== "") {
  //   hashedPassword = await bcrypt.hash(password, 10);
  // } else {
  //   hashedPassword = null; // หรือจะไม่ส่งค่าเลย เพื่อเก็บ password เดิมก็ต้องแก้ SQL เพิ่ม
  // }

  // const sql = `
  //   UPDATE Users SET
  //     username = COALESCE(?, username),
  //     email = COALESCE(?, email),
  //     password = COALESCE(?, password),
  //     firstname = COALESCE(?, firstname),
  //     lastname = COALESCE(?, lastname),
  //     image = COALESCE(?, image)
  //   WHERE UID = ?
  // `;
  // const params = [
  //   username,
  //   email,
  //   hashedPassword,
  //   firstname,
  //   lastname,
  //   image,
  //   uid,
  // ];

  // const [result] = await pool.execute(sql, params);

  // if (result.affectedRows === 0) throw new Error("User not found");

  // // ถ้าอัปโหลดรูปใหม่และมีรูปเก่า ให้ลบรูปเก่า
  // if (image && oldImage && oldImage !== image) {
  //   const oldImagePath = path.join(process.cwd(), "uploads", oldImage);
  //   try {
  //     await fs.unlink(oldImagePath);
  //   } catch (err) {
  //     console.error("Failed to delete old image:", err.message);
  //   }
  // }
}

export async function getImage(uid) {
  const user = await Users.findByPk(uid);

  if (!user) {
    throw new Error("User not found");
  }

  return user.image || null;

  // const [rows] = await pool.query("SELECT image FROM Users WHERE UID = ?", [
  //   uid,
  // ]);

  // if (rows.length === 0) {
  //   throw new Error("User not found");
  // }

  // return rows[0].image || null;
}

export async function getFullname(uid) {
  const user = await Users.findByPk(uid);

  if (!user) throw new Error("User not found");

  // ดึงข้อมูลทั้งหมดเป็น plain object
  const userData = user.get({ plain: true });

  // เพิ่ม fullname เข้าไป
  userData.fullname = `${userData.firstname} ${userData.lastname}`;

  return userData;

  //const [rows] = await pool.query("SELECT * FROM Users WHERE  UID = ?" ,[uid]);
  //if(rows.length === 0) thorw nre Error("User not found") ;
  // const userData = rows[0];
  // userData.fullname = `${userData.firstname} ${userData.lastname}`;
  //  return userData;
}
