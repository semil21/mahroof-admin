import { create } from "zustand";
import axios from "axios";

interface image {
  image: string;
  status: boolean;
  _id: string;
  if: string;
}

interface imageStore {
  imagesData: image[];
  postImages: (image: string, color: string) => Promise<void>;
  getImagesData: (_id: string) => Promise<void>;
  updateImageStatus: (id: string, status: Boolean) => Promise<void>;
}

const useImageStore = create<imageStore>((set) => ({
  imagesData: [],

  postImages: async (image, color) => {
    try {
      const saveRecord = await axios.post("http://localhost:3500/image/add", {
        color,
        image,
      });
    } catch (error) {
      console.log("Failed to add new images data");
    }
  },

  getImagesData: async (_id) => {
    try {
      const getRecords = await axios.post(`http://localhost:3500/image/${_id}`);
      if (getRecords) {
        set({ imagesData: getRecords.data.response });
      }
    } catch (error) {
      console.log("Failed to get images data");
    }
  },
  updateImageStatus: async (_id, status) => {
    try {
      const newStatus = status === true ? false : true;

      const updateSTatus = await axios.put(
        `http://localhost:3500/image/${_id}`,
        { newStatus }
      );

      if (updateSTatus.status === 200) {
        set((state) => ({
          imagesData: state.imagesData.map((item) =>
            item._id === _id ? { ...item, status: newStatus } : item
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to update product status");
    }
  },
}));

export default useImageStore;
