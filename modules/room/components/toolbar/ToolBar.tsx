import { HiOutlineDownload } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import { ImExit } from "react-icons/im";

import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useRouter } from "next/router";
import { useModal } from "@/common/recoil/modal";
import ColorPicker from "./ColorPicker";
import LineWidthPicker from "./LineWidthPicker";

import ShapeSelector from "./ShapeSelector";
import { useRefs } from "../../hooks/useRefs";
import ImagePicker from "./ImagePicker";
import BackgroundPicker from "./BackgroundPicker";
import HistoryBtns from "./HistoryBtns";
import ModePicker from "./ModePicker";
import ShareModal from "../../modals/ShareModal";

const ToolBar = () => {
  const { canvasRef, bgRef } = useRefs();
  const { openModal } = useModal();

  const router = useRouter();

  const handleExit = () => router.push("/");

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE.width;
    canvas.height = CANVAS_SIZE.height;

    const tempCtx = canvas.getContext("2d");

    if (tempCtx && canvasRef.current && bgRef.current) {
      tempCtx.drawImage(bgRef.current, 0, 0);
      tempCtx.drawImage(canvasRef.current, 0, 0);
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "canvas.png";
    link.click();
  };

  const handleShare = () => openModal(<ShareModal />);

  return (
    <div
      className="absolute left-10 top-[50%] z-50 flex flex-col items-center gap-5 rounded-lg p-5 bg-zinc-900 text-white"
      style={{
        transform: "translateY(-50%)",
      }}
    >
      <HistoryBtns />
      <div className="h-px w-full bg-white" />
      <ColorPicker />
      <ShapeSelector />
      <LineWidthPicker />
      <ModePicker />
      <ImagePicker />

      <div className="h-px w-full bg-white" />

      <BackgroundPicker />

      <button className="text-xl" onClick={handleShare}>
        <IoIosShareAlt />
      </button>

      <button className="text-xl" onClick={handleDownload}>
        <HiOutlineDownload />
      </button>

      <button className="text-xl" onClick={handleExit}>
        <ImExit />
      </button>
    </div>
  );
};

export default ToolBar;
