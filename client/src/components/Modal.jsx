import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";

function Modal({ isOpen, onChange, title, description, children }) {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/80 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content className="fixed border drop-shadow-md border-neutral-700 top-1/2 left-1/2 max-h-full h-[97%] md:h-auto md:max-h-[80vh] w-[95%] md:w-[90vw] md:max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-800 px-4 py-6 focus:outline-none">
          <Dialog.Title className="text-xl mb-3">{title}</Dialog.Title>
          <Dialog.Description className="text-sm mb-4">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 size-7 bg-neutral-400 hover:bg-white rounded-full flex items-center justify-center">
              <IoClose size={18} className="text-neutral-900" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
