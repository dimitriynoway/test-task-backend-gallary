import { Types } from "mongoose";

export interface RegisterBody {
  email: string;
  login: string;
  password: string;
  registerData: Date;
}

export interface UserEntity extends RegisterBody {
  _id: string;
  __v: number;
}

export interface LoginParams {
  loginOrEmail: string;
  password: string;
}

export interface Photo {
  albumId: number | string;
  id: number | string;
  title: string;
  url: string;
  thumbnailUrl: string;
  owner: Types.ObjectId;
}

export interface Photos {
  [key: string]: Photo[];
}

export interface GetPhotoPatams {
  ownerId?: string;
  page: number;
  maxCount: number;
}

export interface AlbumEntity {
  title: string;
  owner: string;
}

export interface PhotoEntity {
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  owner: string;
}

export interface ChangeAlbumTitleQuery {
  albumId: string;
  title: string;
}

export interface DeleteAlbumQuery {
  albumId: string;
  userId: string;
}

export interface LoadPhotoQuery {
  userId: string;
  limit?: number;
}
