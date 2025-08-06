import { getUserByEmail, saveuser } from "../Utilities/database";
import bcrypt from "bcryptjs";
import { setUser } from "./storage";
import type { AuthType } from "../constants/authTypes";

export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  //debugger
  const existingUser = await getUserByEmail(email);
  //console.log(password, existingUser.password);
  if (!existingUser) return { success: false, message: "User not found." };

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) return { success: false, message: "Incorrect password." };

  setUser(existingUser);
  return { success: true, message: "Login successful." };
};

export const registerUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  type: AuthType
): Promise<{ success: boolean; message: string }> => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { success: false, message: "User already exists." };

  //const hashedPassword = type === "MANUAL" ? await bcrypt.hash(password, 10) : password;
    const hashedPassword = await bcrypt.hash(password, 10);

  const user = { firstname, lastname, email, password: hashedPassword, type };
  await saveuser(user);
  setUser(user);
  return { success: true, message: "Registration successful." };
};
