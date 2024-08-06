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
  Text,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm, Resolver } from "react-hook-form";

import useColorStore from "../../store/product/color/color";

type childPropsTypes = {
  productId: string;
  sizeId: string;
  isEdit: boolean;
  editData: FormValues;
};

type FormValues = {
  name: string;
  stock: number;
  price: number;
  discount: number;
  product: string;
  size: string;
  status: boolean;
  _id: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, any> = {};

  if (!values.name) {
    errors.name = {
      type: "required",
      message: "Color name is required.",
    };
  }

  if (!values.stock) {
    errors.name = {
      type: "required",
      message: "Stock is required.",
    };
  }

  if (!values.price) {
    errors.name = {
      type: "required",
      message: "Price is required.",
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

const AddColorModal = ({
  productId,
  sizeId,
  isEdit,
  editData,
}: childPropsTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: editData?.name,
      stock: editData?.stock,
      price: editData?.price,
      discount: editData?.discount,
    },
  });

  const { postColorData, updateColorData } = useColorStore();

  const handleAddColor = async (data: FormValues) => {
    data.product = productId;
    data.size = sizeId;
    await postColorData(data).then(() => {
      onClose(), reset();
    });
  };

  const handleEditColor = async (data: FormValues) => {
    const _id = editData._id;
    await updateColorData(data, _id).then(() => onClose());
  };

  return (
    <>
      <Button
        onClick={onOpen}
        color="#ffffff"
        style={{ backgroundColor: "#0EB6BE" }}
        size="sm"
      >
        {!isEdit === true ? "Add" : "Update"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product Color</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Color Name</FormLabel>
              <Input placeholder="Color name" {...register("name")} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Stock </FormLabel>
              <Input placeholder="Last name" {...register("stock")} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price </FormLabel>
              <Input placeholder="Last name" {...register("price")} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Disocunt % </FormLabel>
              <Input placeholder="Last name" {...register("discount")} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} colorScheme="red">
              Close
            </Button>
            {!isEdit === true ? (
              <Button
                colorScheme="green"
                mr={3}
                onClick={handleSubmit(handleAddColor)}
              >
                Add
              </Button>
            ) : (
              <Button
                colorScheme="green"
                mr={3}
                onClick={handleSubmit(handleEditColor)}
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

export default AddColorModal;
