import { Schema, model } from "mongoose";
import { UserEntity } from "../interface";

export const UserSchem = new Schema({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerData: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<UserEntity>("User", UserSchem);
