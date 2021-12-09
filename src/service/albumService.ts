import { Album } from "../model/Album";
import { Photo } from "../model/Photo";
import { BadRequestError } from "../errorHandler/BadRequestError";
import { ChangeAlbumTitleQuery } from "../interface";

export const albumService = {
  deleteAlbum: async (albumId: string, userId: string): Promise<{ message: string }> => {
    if (!userId || !albumId) throw new BadRequestError("Not all params were passed");

    const albumIds = albumId.split(",");
    const albums = await Album.find({ _id: { $in: albumIds } });

    if (!albums.length) return { message: "Such album(s) does not exist" };

    await Album.deleteMany({ _id: { $in: albumIds }, owner: userId });
    await Photo.deleteMany({ albumId: { $in: albumIds }, owner: userId });

    return { message: "Album(s) were removed successfully" };
  },
  changeAlbumTitle: (data: Partial<ChangeAlbumTitleQuery>) => {
    const { albumId, title } = data;

    if (!albumId || !title) throw new BadRequestError("Not all params were passed");

    return Album.findByIdAndUpdate(
      albumId,
      { title },
      {
        new: true,
      }
    );
  },
};
