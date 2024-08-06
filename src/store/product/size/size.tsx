import { create } from "zustand";
import axios from "axios";

interface size {
  [x: string]: any;
  _id: string;
  length: string;
  width: string;
  size: string;
}

interface sizeStore {
  sizeData: size[];
  postSizeData: (data: size) => Promise<void>;
  getProductSizes: (productId: string) => Promise<void>;
  deleteProductSize: (productId: string) => Promise<void>;
  updateProductSize: (id: string, data: size) => Promise<void>;
  updateStatus: (_id: string, status: boolean) => Promise<void>;
}

const useSizeStore = create<sizeStore>((set) => ({
  sizeData: [],

  postSizeData: async (data: any) => {
    try {
      const saveRecord = await axios.post(
        "http://127.0.0.168:3500/size/create",
        data
      );
    } catch (error) {
      console.log("Failed to add size data");
    }
  },

  getProductSizes: async (productId) => {
    try {
      const getRecords = await axios.post(
        `http://127.0.0.168:3500/size/get/${productId}`
      );
      if (getRecords.status === 200) {
        set({ sizeData: getRecords.data.response });
      }
    } catch (error) {
      console.log("Failed to get product sizes");
    }
  },

  deleteProductSize: async (id) => {
    try {
      const deleteRecord = await axios.delete(
        `http://127.0.0.168:3500/size/${id}`
      );

      if (deleteRecord.status === 200) {
        set((state) => ({
          sizeData: state.sizeData.filter((val) => val._id !== id),
        }));
      }
    } catch (error) {
      console.log("Failed to delete product size");
    }
  },

  updateProductSize: async (id, data) => {
    try {
      const updateRecord = await axios.put(
        `http://127.0.0.168:3500/size/${id}`,
        data
      );

      if (updateRecord.status === 200) {
        set((state) => ({
          sizeData: state.sizeData.map((val) =>
            val._id === id ? { ...val, ...data } : val
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to update product size");
    }
  },

  updateStatus: async (_id, status) => {
    try {
      const newStatus = status == true ? false : true;

      const updateStatus = await axios.put(
        `http://127.0.0.168:3500/size/status/${_id}`,
        { newStatus }
      );

      if (updateStatus.status === 200) {
        set((state) => ({
          sizeData: state.sizeData.map((val) =>
            val._id === _id ? { ...val, status: newStatus } : val
          ),
        }));
      }
    } catch (error) {
      console.log("failed to update product status");
    }
  },
}));

export default useSizeStore;
