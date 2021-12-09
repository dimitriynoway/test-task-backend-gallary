import axios from "axios";
import { Types } from "mongoose";
import { User } from "../model/User";
import { Album } from "../model/Album";
import { Photo } from "../model/Photo";
import { BadRequestError } from "../errorHandler/BadRequestError";
import {
  GetPhotoPatams,
  LoadPhotoQuery,
  Photo as PhotoInterface,
  PhotoEntity,
  Photos,
} from "../interface";

export const photoService = {
  loadPhotos: async (payload: Partial<LoadPhotoQuery>): Promise<void> => {
    const { limit, userId } = payload;
    const { data } = await axios.get(
      limit
        ? `http://jsonplaceholder.typicode.com/photos?_limit=${limit}`
        : "http://jsonplaceholder.typicode.com/photos"
    );

    const photos: Photos = {};

    data.map((photo: PhotoInterface) => {
      if (!photos[photo.albumId]) {
        photos[photo.albumId] = [];
      }
      photos[photo.albumId].push(photo);
    });

    for (const key in photos) {
      const album = new Album({ title: key, owner: userId });
      await album.save();

      photos[key] = photos[key].map((photo: PhotoInterface) => ({
        ...photo,
        owner: new Types.ObjectId(userId),
        albumId: album._id,
      }));

      console.log(photos[key]);

      await Photo.insertMany(photos[key]);
    }
  },
  getPhotos: async (params: Partial<GetPhotoPatams>): Promise<PhotoEntity[]> => {
    const { ownerId, page, maxCount } = params;

    const PAGE_SIZE = 10;

    if (!page || !maxCount) {
      throw new BadRequestError("Not all params were passed");
    }

    if (ownerId) {
      const user = await User.findById(ownerId);

      if (!user) throw new BadRequestError("User is not found");

      const photos: PhotoEntity[] = await Photo.find(
        { owner: ownerId },
        {},
        { skip: (page - 1) * PAGE_SIZE, limit: maxCount }
      );

      return photos;
    }
    const photos: PhotoEntity[] = await Photo.find(
      {},
      {},
      { skip: (page - 1) * PAGE_SIZE, limit: maxCount }
    );

    return photos;
  },
  deletePhotos: (photoId: string) => Photo.deleteMany({ _id: { $in: photoId.split(",") } }),
};
