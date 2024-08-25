import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const ImageModal = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <img src={src} alt={alt} className="w-full h-auto" />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
