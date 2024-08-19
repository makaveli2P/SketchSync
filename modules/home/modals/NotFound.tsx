import { AiOutlineClose } from "react-icons/ai";

import { useModal } from "@/common/recoil/modal";

const NotFoundModal = ({ id }: { id: string }) => {
  const { closeModal } = useModal();

  return (
    <div className="relative flex flex-col items-center rounded-md bg-white p-10">
      <button onClick={closeModal} className="absolute top-5 right-5">
        <AiOutlineClose />
      </button>
      <h2 className="text-lg font-bold">No room with ID ({id}) found!</h2>
      <h3>Check the room ID and try joining the room again.</h3>
    </div>
  );
};

export default NotFoundModal;
