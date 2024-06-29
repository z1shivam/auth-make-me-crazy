import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";

export const getAllUsers = async () => {
  await dbConnect();
  const result = await User.find({});
  return result;
}