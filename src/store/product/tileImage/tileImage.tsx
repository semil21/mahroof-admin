import { create } from "zustand";
import axios from "axios";

interface image {
  image: string;
  color: string;
  _id: string;
}

interface imageStore {
  tileImages: image[];
  addTileImage: (image: string, color: string) => Promise<void>;
  getTileImage: (color: string) => Promise<void>;
  editTileImage: (id: string, image: string) => Promise<void>;
}

const usetileIamageStore = create<imageStore>((set) => ({
  tileImages: [],

  addTileImage: async (image, color) => {
    try {
      const addImage = await axios.post(
        "http://localhost:3500/tile-image/add",
        {
          image,
          color,
        }
      );
    } catch (error) {
      console.log("Failed to add tile image");
    }
  },

  getTileImage: async (color) => {
    try {
      const getImage = await axios.post(
        `http://localhost:3500/tile-image/${color}`
      );

      if (getImage.status === 200) {
        set({ tileImages: getImage.data.response });
      }
    } catch (error) {
      console.log("Failed to get tile image");
    }
  },

  editTileImage: async (id, image) => {
    try {
      const editRecord = await axios.put(
        `http://localhost:3500/tile-image/edit/${id}`,
        { image: image }
      );
    } catch (error) {
      console.log("Failed to edit tile image");
    }
  },
}));

export default usetileIamageStore;
