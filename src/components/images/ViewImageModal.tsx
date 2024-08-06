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
  Image,
} from "@chakra-ui/react";

import useImageStore from "@/store/product/image/image";

type propsType = {
  id: string;
};

const ViewImageModal = ({ id }: propsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { imagesData, getImagesData, updateImageStatus } = useImageStore();

  const handleOpen = async () => {
    onOpen();
    await getImagesData(id);
  };

  const handleImageStatus = async (_id: string, status: boolean) => {
    await updateImageStatus(_id, status);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color="#ffffff"
        style={{ backgroundColor: "#0D1885" }}
        size="sm"
        className="w-[65px]"
        ml={3}
      >
        View
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center font-bold text-[18px]">
            Images
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-wrap -mx-2  justify-around mx-2  	">
              {imagesData?.length != 0 ? (
                imagesData?.map((image) => (
                  <div
                    className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl w-96 "
                    key={image._id}
                  >
                    <div className="p-6 	">
                      <table className="min-w-full leading-relaxed text-inherit">
                        <tbody>
                          <tr className="border-t border-gray-200 flex justify-center items-center">
                            <Image
                              src={image.image}
                              alt="product image"
                              height="300px"
                              width="300px"
                            />
                          </tr>
                          <tr className="border-t border-gray-200 flex justify-center items-center mt-3">
                            <Button
                              colorScheme={
                                image.status === true ? "green" : "yellow"
                              }
                              onClick={() =>
                                handleImageStatus(image._id, image.status)
                              }
                            >
                              {image.status === true ? "Active" : "Inactive"}
                            </Button>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-semibold text-[16px]">No image found</div>
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewImageModal;
