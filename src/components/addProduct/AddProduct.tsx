"use client"
import React ,{useEffect , useState}from 'react'
import useCategoryStore from '@/store/category/category'
import { Input , Select, Button} from '@chakra-ui/react'
import {useForm} from "react-hook-form"

const AddProduct = () => {

  const {categoriesData , getCategories} = useCategoryStore()
  const { register, control, handleSubmit } = useForm();

    const [image, setImage] = useState<File | null>(null);



  useEffect(()=>{

    if(categoriesData.length == 0){
      getCategories()
    }
  },[])

  const companyName = [
    { key : 'click', value : 'click'},
    {key :'mahroof' , value: "mahroof"}
  ]

  const handleAddPRoduct = (data : any) =>{
    data.tileImage = image
    try{
      console.log('data :', data)
    }
    catch(error){
      console.log('Failed to add new product')
    }
  }

  return (
    <div className=''>
    <div className='text-center mt-10 text-[25px] font-[500]'>Add New Product</div>

      <div className=" flex items-center my-6 justify-center ">~
        <div className="flex">
          <div className="flex  w-[200px] items-center  ">
            <p className="font-medium font-[18px]">Product Name : </p>
          </div>

          <div className="w-96 ">
            <Input
              placeholder="Enter Product Name"
              size="md"
              {...register("name")}
            />
            {/* {errors?.name && (
              <p className="text-red-500 text-[15px] mx-4 my-1">
                {errors.name.message}
              </p>
            )} */}
          </div>
        </div>
      </div>

       <div className=" flex items-center my-6 justify-center ">
        <div className="flex">
          <div className="flex  w-[200px] items-center  ">
            <p className="font-medium font-[18px]">Select Category : </p>
          </div>

          <div className="w-96 ">
            <Select
              {...register("category", { validate: (value) => value !== "0" })}
            >
              {categoriesData?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
            {/* {errors?.category && (
              <p className="text-red-500 text-[15px] mx-4 my-1">
                {errors.category.message}
              </p>
            )} */}
          </div>
        </div>
      </div>

      <div className=" flex items-center my-6 justify-center ">
        <div className="flex">
          <div className="flex  w-[200px] items-center  ">
            <p className="font-medium font-[18px]">Select Company : </p>
          </div>

          <div className="w-96 ">
            <Select
              {...register("company", { validate: (value) => value !== "0" })}
            >
              {companyName?.map((company, index) => (
                <option key={index} value={company.key}>
                  {company.value}
                </option>
              ))}
            </Select>
            {/* {errors?.category && (
              <p className="text-red-500 text-[15px] mx-4 my-1">
                {errors.category.message}
              </p>
            )} */}
          </div>
        </div>
      </div>

       <div className=" flex items-center my-6 justify-center ">
        <div className="flex">
          <div className="flex  w-[200px] items-center  ">
            <p className="font-medium font-[18px]">Unique Code : </p>
          </div>

          <div className="w-96 ">
            <Input
              placeholder="Example : 1123 "
              size="md"
              type='number'
              {...register("uniqueCode")}
            />
            {/* {errors?.name && (
              <p className="text-red-500 text-[15px] mx-4 my-1">
                {errors.name.message}
              </p>
            )} */}
          </div>
        </div>
      </div>

      <div className="flex items-center my-6 justify-center">
        <div className="flex">
          <div className="flex w-[200px] items-center">
            <p className="font-medium text-[18px]">Tile Image:</p>
          </div>
          <div className="w-96">
            <Input
              size="md"
              type="file"
              accept="image/*"
              {...register("tileImage", {
                    required: "Brand logo is required",
                  })}
                   onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-5'>
        <Button colorScheme='green' onClick={handleSubmit(handleAddPRoduct)}>Submit</Button>
      </div>

     
    </div>
  )
}

export default AddProduct