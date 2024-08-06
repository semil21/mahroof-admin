import { create } from "zustand";
import axios from "axios";

interface Product {
  newArrival: boolean;
  featured: boolean;
  _id: string;
  brand: string;
  category: string;
  subCategory: string;
  name: string;
  description: string;
  material: string;
  origin: string;
  manufacturer: string;
  gender: string;
  status: boolean;
}

interface ProductStore {
  productData: Product[];
  postProductData: (data: Product) => Promise<void>;
  getProducts: () => Promise<void>;
  fetchProductDetails: (product: string) => Promise<void>;
  updateFeatureStatus: (_id: string, status: boolean) => Promise<void>;
  updateNewArrivalStatus: (_id: string, status: boolean) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  productData: [],

  getProducts: async () => {
    try {
      const getRecords = await axios.get(
        "http://127.0.0.168:3500/product/get-products"
      );

      if (getRecords.status === 200) {
        set({ productData: getRecords?.data.response });
      } else {
        console.log("Error in getting products data");
      }
    } catch (error) {
      console.log("Failed to get products details");
    }
  },

  postProductData: async (data: any) => {
    try {
      const saveData = await axios.post(
        "http://127.0.0.168:3500/product/create",
        data
      );
    } catch (error) {
      console.log("Failed to add product data");
    }
  },

  fetchProductDetails: async (product) => {
    try {
      const getProductDetails = axios.post(
        `http://127.0.0.168:3500/product/products-details/${product}`
      );
    } catch (error) {
      console.log("Failed to get product details");
    }
  },
  updateFeatureStatus: async (_id, status) => {
    const newStatus = status === true ? false : true;
    try {
      const updateStatus = await axios.put(
        `http://127.0.0.168:3500/product/feature-status/${_id}`,
        { newStatus }
      );

      if (updateStatus.status === 200) {
        set((state) => ({
          productData: state.productData.map((item) =>
            item._id === _id ? { ...item, featured: newStatus } : item
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to update feature status");
    }
  },

  updateNewArrivalStatus: async (_id, status) => {
    const newStatus = status === true ? false : true;
    try {
      const updateArrivalStatus = await axios.put(
        `http://127.0.0.168:3500/product/arrival-status/${_id}`,
        { newStatus }
      );

      if (updateArrivalStatus.status === 200) {
        set((state) => ({
          productData: state.productData.map((item) =>
            item._id === _id ? { ...item, newArrival: newStatus } : item
          ),
        }));
      }
    } catch (error) {
      console.log("Failed to update new arrival status");
    }
  },
}));

export default useProductStore;
