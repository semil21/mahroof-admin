import { create } from "zustand";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  status: boolean;
}

interface CategoryStore {
  categoriesData: Category[];
  getCategories : () => Promise<void>
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categoriesData: [],


   getCategories : async() =>{
      try{

        const getRecords = await axios.get("http://localhost:3500/category")

        if(getRecords.status === 200){
          set({categoriesData : getRecords.data.response })
        }
        else{
          console.log('failed to get categories')
        }
      }
      catch(error){
        console.log('Failed to get categories')
      }
  }


  
}));

export default useCategoryStore;
