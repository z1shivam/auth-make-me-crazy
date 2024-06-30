
import dbConnect from "../lib/dbConnect";
import User from "@/model/userModel";

export const getAllUsers = async () => {
  await dbConnect();
  const result = await User.find({});
  return result;
}
export const getUserByEmail = async (email: string) => {
  await dbConnect();

  const result = await User.findOne({ email });
  return result;
};

export const getUserById = async (id: string) => {};
