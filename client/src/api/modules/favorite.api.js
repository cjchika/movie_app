import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
};

const favoriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list());
      return { response };
    } catch (error) {
      {
        return { error };
      }
    }
  },
  addFavorite: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate,
  }) => {
    try {
      const response = await privateClient.post(
        favoriteEndpoints.add({
          mediaId,
          mediaType,
          mediaTitle,
          mediaPoster,
          mediaRate,
        })
      );
      return { response };
    } catch (error) {
      {
        return { error };
      }
    }
  },
  removeFavorite: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({ favoriteId })
      );
      return { response };
    } catch (error) {
      {
        return { error };
      }
    }
  },
};

export default favoriteApi;
