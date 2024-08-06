import { create } from "zustand";
import axios from "axios";

interface color {
  name: string;
  stock: number;
  price: number;
  discount: number;
  product: string;
  size: string;
  status: boolean;
  _id: string;
}

interface colorStore {
  colorsData: color[];
  postColorData: (data: color) => Promise<void>;
  getColorsData: (product: string, size: string) => Promise<void>;
  updateColorData: (data: color, _id: string) => Promise<void>;
  deleteColorRecord: (_id: string) => Promise<void>;
  updateColorStatus: (_id: string, status: boolean) => Promise<void>;
}

const useColorStore = create<colorStore>((set) => ({
  colorsData: [],

  postColorData: async (data: color) => {
    try {
      const saveData = await axios.post(
        "http://127.0.0.168:3500/color/create",
        data
      );
    } catch (error) {
      console.log("Failed to add new color data");
    }
  },

  getColorsData: async (product, size) => {
    try {
      const getRecord = await axios.post("http://127.0.0.168:3500/color", {
        product,
        size,
      });

      if (getRecord.status === 200) {
        set({ colorsData: getRecord.data.response });
      } else {
        console.log("Failed to get colors record ");
      }
    } catch (error) {
      console.log("Failed to get colors data");
    }
  },

  updateColorData: async (data, _id) => {
    try {
      const updateRecord = await axios.put(
        `http://127.0.0.168:3500/color/${_id}`,
        data
      );

      if (updateRecord.status === 200) {
        set((state) => ({
          colorsData: state.colorsData.map((val) =>
            val._id === _id ? { ...val, ...data } : val
          ),
        }));
      }
      console.log("updateRecord -", updateRecord);
    } catch (error) {
      console.log("Failed to update colors data");
    }
  },

  deleteColorRecord: async (_id) => {
    try {
      const deleteRecord = await axios.delete(
        `http://127.0.0.168:3500/color/${_id}`
      );

      if (deleteRecord.status === 200) {
        set((state) => ({
          colorsData: state.colorsData.filter((val) => val._id !== _id),
        }));
      }
    } catch (error) {
      console.log("Failed to delete color record ");
    }
  },

  updateColorStatus: async (_id, status) => {
    const newStatus = status === true ? false : true;
    try {
      const updateRecord = await axios.put(
        `http://127.0.0.168:3500/color/status/${_id}`,
        { newStatus }
      );

      if (updateRecord.status === 200) {
        set((state) => ({
          colorsData: state.colorsData.map((val) =>
            val._id === _id ? { ...val, status: newStatus } : val
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to update color status ");
    }
  },
}));

export default useColorStore;
