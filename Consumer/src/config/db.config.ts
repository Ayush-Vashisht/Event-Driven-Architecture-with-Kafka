import mongoose from "mongoose";

export const connectToDatabse = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) throw new Error("MONGODB_URL Missing");
  await mongoose.connect(MONGODB_URL);
};
