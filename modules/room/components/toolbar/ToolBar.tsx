import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { IoIosShareAlt } from "react-icons/io";

import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { DEFAULT_EASE } from "@/common/constants/easings";
import { useViewportSize } from "@/common/hooks/useViewportSize";
import { useModal } from "@/common/recoil/modal";

import { useRefs } from "../../hooks/useRefs";
import ShareModal from "../../modals/ShareModal";
import BackgroundPicker from "./BackgroundPicker";
import ColorPicker from "./ColorPicker";
import HistoryBtns from "./HistoryBtns";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";

const ToolBar = () => {
  const { canvasRef, bgRef } = useRefs();
  const { openModal } = useModal();
  const { width } = useViewportSize();

  const [opened, setOpened] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (width >= 1024) setOpened(true);
    else setOpened(false);
  }, [width]);

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
    <>
      <motion.button
        className="absolute bottom-1/2 -left-2 z-50 h-10 w-10 rounded-full bg-black text-2xl text-white shadow-lg transition-none lg:hidden"
        animate={{ rotate: opened ? 0 : 180 }}
        transition={{ duration: 0.2, ease: DEFAULT_EASE }}
        onClick={() => setOpened(!opened)}
      >
        <FiChevronRight />
      </motion.button>
      <motion.div
        className="absolute left-10 top-1/2 z-50 grid grid-cols-2 items-center gap-4 rounded-lg bg-gray-800 p-5 text-white shadow-lg 2xl:grid-cols-1"
        animate={{
          x: opened ? 0 : -160,
          y: "-50%",
        }}
        transition={{
          duration: 0.2,
          ease: DEFAULT_EASE,
        }}
      >
        <HistoryBtns />

        <div className="h-px w-full bg-gray-600 2xl:hidden" />
        <div className="h-px w-full bg-gray-600" />

        <ShapeSelector />
        <ColorPicker />
        <LineWidthPicker />
        <ModePicker />
        <ImagePicker />

        <div className="2xl:hidden"></div>
        <div className="h-px w-full bg-gray-600 2xl:hidden" />
        <div className="h-px w-full bg-gray-600" />

        <BackgroundPicker />
        <button
          className="text-2xl transition-colors duration-300 hover:text-blue-400"
          onClick={handleShare}
        >
          <IoIosShareAlt />
        </button>
        <button
          className="text-2xl transition-colors duration-300 hover:text-green-400"
          onClick={handleDownload}
        >
          <HiOutlineDownload />
        </button>
        <button
          className="text-xl transition-colors duration-300 hover:text-red-400"
          onClick={handleExit}
        >
          <ImExit />
        </button>
      </motion.div>
    </>
  );
};

export default ToolBar;
