import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const DialogModal = ({ button, title, description, content }) => {
  const [open, setopen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={() => setopen(!open)}>
      <Dialog.Trigger asChild>{button}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-[300px]" />
        <div className="absolute inset-0 h-full bg-black_rgba dark:bg-black_rgba_dark z-[99]" />
        <Dialog.Content className="top-[50%] fixed left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000] bg-white rounded-md shadow dark:bg-gray-700 py-3 px-5 w-[500px]">
          <div className="w-full duration-500 animate-in fade-in">
            <Dialog.Title className="w-full text-lg font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-sm font-medium text-gray-400 m dark:text-gray-300">
              {description}
            </Dialog.Description>

            {content}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogModal;
