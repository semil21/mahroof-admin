"use client";
import React, { useState } from "react";
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
  Spinner,
  FormControl,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import axios from "axios";
import useImageStore from "@/store/product/image/image";

type inputPropsType = {
  id: string;
};

const AddImageModal = ({ id }: inputPropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { imagesData, postImages } = useImageStore();

  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async () => {
    setIsLoading(true);
    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "images");
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/djndnszlr/image/upload",
          formData
        );
        if (cloudinaryResponse.status === 200) {
          const image = cloudinaryResponse.data.secure_url;

          // if (!isEdit === true) {
          await postImages(image, id).then(() => {
            setIsLoading(false), onClose();
          });
          // } else {
          //   await editTileImage(id, image).then(() => {
          //     setIsLoading(false), onClose();
          //   });
          // }
        }
      }
    } catch (error) {}
  };
  return (
    <>
      <Button
        onClick={onOpen}
        color="#ffffff"
        style={{ backgroundColor: "#0D1885" }}
        size="sm"
        className="w-[65px]"
      >
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <div className="space-y-8 font-[sans-serif] max-w-md mx-auto">
                <input
                  type="file"
                  className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                  {...register("image", { required: true })}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </FormControl>
          </ModalBody>
          {isLoading === true ? (
            <div className="flex justify-center items-center">
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
              <p className="ml-4">Uploading Image</p>
            </div>
          ) : null}

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              ml={3}
              mr={3}
              isDisabled={image == null ? true : false}
              onClick={handleSubmit(handleImageUpload)}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddImageModal;
