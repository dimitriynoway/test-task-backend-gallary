import { Schema, model, Types } from "mongoose";
import { AlbumEntity } from "../interface";

export const AlbumSchema = new Schema({
  title: {
    type: String,
  },
  owner: {
    type: Types.ObjectId,
    required: true,
  },
});

export const Album = model<AlbumEntity>("Album", AlbumSchema);
