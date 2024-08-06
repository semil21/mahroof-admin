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
  Input,
} from "@chakra-ui/react";
import useSizeStore from "@/store/product/size/size";
import Swal from "sweetalert2";

import AddProductSizeModal from "./AddProductSizeModal";
import AddColorModal from "../productColor/AddColorModal";
import ColorList from "@/components/productColor/ColorList";

const ViewSizeModal = ({ productId }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sizeData, getProductSizes, deleteProductSize, updateStatus } =
    useSizeStore();

  const handleOpen = async () => {
    await getProductSizes(productId);
    onOpen();
  };

  const handleDeleteSize = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteProductSize(id);
      Swal.fire({
        title: "Deleted!",
        text: "Category Deleted Successfully",
        icon: "success",
        customClass: {
          popup: "custom-swal-popup",
        },
      }).then(() => onOpen());
    } else {
      onOpen();
    }
  };

  const handleSizeStatus = async (_id: string, status: boolean) => {
    await updateStatus(_id, status);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        colorScheme="teal"
        size="sm"
        className="w-[60px]"
        ml={3}
      >
        View
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Product Sizes</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {sizeData.length > 0 ? (
              <div className="flex flex-wrap justify-center mx-2 ">
                {sizeData?.map((value) => (
                  <div
                    className="relative flex flex-col my-2 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
                    key={value._id}
                  >
                    <div className="p-6">
                      <table className="min-w-full leading-relaxed text-inherit">
                        <tbody>
                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Size :</td>
                            <td className="p-2">{value.size}</td>
                          </tr>

                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Length :</td>
                            <td className="p-2">{value.length}</td>
                          </tr>

                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Width :</td>
                            <td className="p-2">{value.width}</td>
                          </tr>

                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Colors :</td>
                            <td className="p-2">
                              <AddColorModal
                                productId={productId}
                                sizeId={value._id}
                                isEdit={false}
                                editData={{} as any}
                              />

                              <ColorList
                                product={productId}
                                size={value._id}
                                _id={""}
                              />
                            </td>
                          </tr>

                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Status :</td>
                            <td className="p-2">
                              <Button
                                colorScheme={value.status ? "green" : "yellow"}
                                size="sm"
                                className="w-[65px]"
                                onClick={() =>
                                  handleSizeStatus(value._id, value.status)
                                }
                              >
                                {value.status ? "Active" : "Inactive"}
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="font-semibold p-2">Actions :</td>
                            <td className="p-2">
                              <AddProductSizeModal
                                productId={value._id}
                                isEdit={true}
                                editData={value}
                              />

                              <Button
                                colorScheme="red"
                                size="sm"
                                ml={3}
                                onClick={() => {
                                  handleDeleteSize(value._id), onClose();
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
            ) : (
              <p className="text-center font-medium text-[18px]">
                No Product Size found
              </p>
            )}
          </ModalBody>
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

export default ViewSizeModal;
