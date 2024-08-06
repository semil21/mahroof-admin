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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm, Resolver } from "react-hook-form";

import useItemStore from "../../store/product/size/size";

type FormValues = {
  _id: string;
  size: string;
  length: string;
  width: string;
  product: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, any> = {};

  if (!values.size) {
    errors.size = {
      type: "required",
      message: "Product size is required.",
    };
  }

  if (!values.length) {
    errors.length = {
      type: "required",
      message: "Product length is required.",
    };
  }

  if (!values.width) {
    errors.width = {
      type: "required",
      message: "Product width is required.",
    };
  }

  return {
    values: errors.length || errors.width || errors.size ? {} : values,
    errors,
  };
};

const AddProductSizeModal = ({ productId, isEdit, editData }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      size: editData?.size,
      length: editData?.length,
      width: editData?.width,
      product: editData?.product,
    },
  });

  const { postSizeData, updateProductSize } = useItemStore();

  const handleAddSize = async (data: FormValues) => {
    data.product = productId;
    await postSizeData(data).then(() => {
      reset(), onClose();
    });
  };

  const handleUpdateSize = async (data: FormValues) => {
    const id = editData._id;
    await updateProductSize(id, data).then(() => onClose());
  };

  return (
    <>
      <Button
        onClick={onOpen}
        // colorScheme="#0B1FEC"
        color="#ffffff"
        style={{ backgroundColor: "#0D1885" }}
        size="sm"
        className="w-[65px]"
      >
        {isEdit === true ? "Update" : "Add"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">
            {!isEdit === true ? "Add New Product Size" : "Update Product Size"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product Size</FormLabel>
              <Input
                placeholder="Enter product size - s,l,xl,2xl etc"
                {...register("size")}
              />
              {errors?.size && (
                <p className="text-red-500 text-[15px] mx-4 my-1">
                  {errors.size.message}
                </p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Length</FormLabel>
              <Input
                placeholder="Enter Length of Product"
                type="number"
                {...register("length")}
              />
              {errors?.length && (
                <p className="text-red-500 text-[15px] mx-4 my-1">
                  {errors.length.message}
                </p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Width</FormLabel>
              <Input
                placeholder="Enter Width of Product"
                type="number"
                {...register("width")}
              />
              {errors?.width && (
                <p className="text-red-500 text-[15px] mx-4 my-1">
                  {errors.width.message}
                </p>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="red" mr={4}>
              Cancel
            </Button>
            {!isEdit === true ? (
              <Button
                colorScheme="green"
                mr={3}
                onClick={handleSubmit(handleAddSize)}
              >
                Save
              </Button>
            ) : (
              <Button
                colorScheme="green"
                mr={3}
                onClick={handleSubmit(handleUpdateSize)}
              >
                Update
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProductSizeModal;
