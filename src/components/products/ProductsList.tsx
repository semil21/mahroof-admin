"use client";
import React, { useEffect } from "react";
import { Spinner, Button } from "@chakra-ui/react";

import ProductDetailsModal from "./ProductDetailsModal";
import useProductStore from "@/store/product/product";

import AddProductSizeModal from "../productSize/AddProductSizeModal";
import ViewSizeModal from "../productSize/ViewSizeModal";

const ProductsList = () => {
  const {
    productData,
    getProducts,
    updateFeatureStatus,
    updateNewArrivalStatus,
  } = useProductStore();

  useEffect(() => {
    if (productData.length === 0) {
      getProducts();
    }
  }, []);

  const handleFeatureStatus = async (_id: string, status: boolean) => {
    await updateFeatureStatus(_id, status);
  };

  const handleArrivalsStatus = async (_id: string, status: boolean) => {
    await updateNewArrivalStatus(_id, status);
  };

  return (
    <>
      {productData.length === 0 ? (
        <div className="flex items-center justify-center mt-[25%] ">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <div className="flex flex-wrap -mx-2  justify-around mx-2  	">
          {productData?.map((product) => (
            <div
              className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 "
              key={product._id}
            >
              <div className="p-6 border-1">
                <h5 className="block mb-2  text-center font-sans text-xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900 text-[23px]">
                  {product.name}
                </h5>
                <table className="min-w-full leading-relaxed text-inherit">
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="font-semibold p-2">Gender :</td>
                      <td className="p-2">{product.gender}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="font-semibold p-2">Material :</td>
                      <td className="p-2">{product.material}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="font-semibold p-2">Manufacturer :</td>
                      <td className="p-2">{product.manufacturer}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="font-semibold p-2">Origin :</td>
                      <td className="p-2">{product.origin}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="font-semibold p-2">Specs :</td>
                      <td className="p-2 flex-row  justify-between	">
                        <AddProductSizeModal
                          productId={product._id}
                          isEdit={false}
                        />

                        <ViewSizeModal productId={product._id} />
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="font-semibold p-2">Featured :</td>
                      <td className="p-2">
                        <Button
                          size="sm"
                          className="w-[64px] "
                          colorScheme={
                            product.featured === false ? "red" : "green"
                          }
                          onClick={() =>
                            handleFeatureStatus(product._id, product.featured)
                          }
                        >
                          {product.featured === false ? "False" : "True"}
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="font-semibold p-2">New Arrivals :</td>
                      <td className="p-2">
                        <Button
                          size="sm"
                          className="w-[64px] "
                          colorScheme={
                            product.newArrival === false ? "red" : "green"
                          }
                          onClick={() =>
                            handleArrivalsStatus(
                              product._id,
                              product.newArrival
                            )
                          }
                        >
                          {product.newArrival === false ? "False" : "True"}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="p-6 pt-0 flex justify-center">
                <ProductDetailsModal product={product._id} />
              </div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;
