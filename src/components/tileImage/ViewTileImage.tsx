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
  Stack,
  Image,
} from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";

import usetileIamageStore from "@/store/product/tileImage/tileImage";
import AddTileImage from "./AddTileImage";

type colorType = {
  color: string;
  isEdit: Boolean;
};

const ViewTileImage = ({ color }: colorType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { tileImages, getTileImage } = usetileIamageStore();

  const handleOpen = async () => {
    onOpen();
    await getTileImage(color);
  };

  console.log("tileImages -", tileImages);

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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Tile Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="row" className="flex items-center justify-center">
              {tileImages.length > 0 ? (
                tileImages.map((tileImage, index) => (
                  <div key={index}>
                    <Img
                      height={"400px"}
                      width={"280px"}
                      src={tileImage.image}
                      alt={`Tile Image ${index + 1}`}
                    />
                    <div className="flex justify-center">
                      <ModalFooter>
                        <AddTileImage
                          color={""}
                          isEdit={true}
                          id={tileImage._id}
                        />
                      </ModalFooter>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p className="font-bold text-[18px]xl">No Image found</p>
                </div>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewTileImage;
