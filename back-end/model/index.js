import dotenv from "dotenv";
import mongoose from "mongoose";

export { User } from "./User.js";

dotenv.config({ path: new URL("../../.env", import.meta.url).pathname });

console.log(new URL("../../.env", import.meta.url).pathname);
mongoose.connect(process.env.DB);