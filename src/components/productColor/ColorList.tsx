import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

import useColorStore from "@/store/product/color/color";

import AddColorModal from "./AddColorModal";
import ViewTileImage from "../tileImage/ViewTileImage";
import AddTileImage from "../tileImage/AddTileImage";
import AddImageModal from "../images/AddImageModal";
import ViewImageModal from "../images/ViewImageModal";

type childProps = {
  product: string;
  size: string;
  _id: string;
};

const ColorList = ({ product, size }: childProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorsData, getColorsData, deleteColorRecord, updateColorStatus } =
    useColorStore();

  const handleOpen = async () => {
    await getColorsData(product, size);
    onOpen();
  };

  const handleDeleteColor = async (_id: string) => {
    // const result = await Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // });

    // if (result.isConfirmed) {
    //   Swal.fire({
    //     title: "Deleted!",
    //     text: "Category Deleted Successfully",
    //     icon: "success",
    //   });
    // }
    await deleteColorRecord(_id).then(() => onOpen());
  };

  const handleColorStatus = async (_id: string, status: boolean) => {
    await updateColorStatus(_id, status);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color="#ffffff"
        style={{ backgroundColor: "#0EB6BE" }}
        size="sm"
        ml={3}
      >
        View
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Colors List</ModalHeader>
          <ModalCloseButton />
          {colorsData.length != 0 ? (
            <ModalBody>
              <div className="flex flex-wrap -mx-2  justify-around mx-2  	">
                {colorsData?.map((color) => (
                  <div
                    className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 "
                    key={color._id}
                  >
                    <div className="p-6 border-1">
                      <h5 className="block mb-2  text-center font-sans text-xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900 text-[23px]">
                        {color.name}
                      </h5>
                      <table className="min-w-full leading-relaxed text-inherit">
                        <tbody>
                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Stock :</td>
                            <td className="p-2">{color.stock}</td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Price :</td>
                            <td className="p-2">{color.price}</td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Discount :</td>
                            <td className="p-2">{color.discount}</td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Tile Image :</td>
                            <td className="p-2">
                              <AddTileImage
                                color={color._id}
                                isEdit={false}
                                id={""}
                              />
                              <ViewTileImage color={color._id} isEdit={true} />
                            </td>
                          </tr>

                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Images :</td>
                            <td className="p-2">
                              <AddImageModal id={color._id} />
                              <ViewImageModal id={color._id} />
                            </td>
                          </tr>

                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Status :</td>
                            <td className="p-2">
                              <Button
                                colorScheme={color.status ? "green" : "yellow"}
                                size="sm"
                                className="w-[65px]"
                                onClick={() =>
                                  handleColorStatus(color._id, color.status)
                                }
                              >
                                {color.status ? "Active" : "Inactive"}
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Actions :</td>
                            <td className="p-2">
                              <AddColorModal
                                productId={color._id}
                                sizeId={color._id}
                                isEdit={true}
                                editData={color}
                              />
                              <Button
                                colorScheme="red"
                                size="sm"
                                ml={3}
                                onClick={() => {
                                  handleDeleteColor(color._id), onClose();
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </ModalBody>
          ) : (
            <ModalBody className="text-center font-medium text-[16px]">
              <Text>No Colors Found for this Product</Text>
            </ModalBody>
          )}

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ColorList;
