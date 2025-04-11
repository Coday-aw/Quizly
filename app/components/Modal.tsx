interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, closeModal, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
export default Modal;
