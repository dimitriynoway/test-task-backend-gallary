import { Schema, model, Types } from "mongoose";
import { PhotoEntity } from "../interface";

export const PhotoSchema = new Schema({
  albumId: {
    type: Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  owner: {
    type: Types.ObjectId,
    required: true,
  },
});

export const Photo = model<PhotoEntity>("Photo", PhotoSchema);
