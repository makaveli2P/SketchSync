import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiRectangle } from "react-icons/bi";
import { BsCircle } from "react-icons/bs";
import { CgShapeZigzag } from "react-icons/cg";
import { useClickAway } from "react-use";
import { useOptions } from "@/common/recoil/options";
import { ColorPickerAnimation } from "../../animations/ColorPicker.animations";

const ShapeSelector = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useOptions();

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  const handleShapeChange = (shape: Shape) => {
    setOptions((prev) => ({
      ...prev,
      shape,
    }));

    setOpened(false);
  };

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        className="btn-icon text-2xl"
        onClick={() => setOpened((prev) => !prev)}
        disabled = {options.mode  === "select"}
      >
        {options.shape === "circle" && <BsCircle />}
        {options.shape === "rect" && <BiRectangle />}
        {options.shape === "line" && <CgShapeZigzag />}
      </button>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute left-14 flex gap-1 rounded-lg border bg-zinc-900 p-2"
            variants={ColorPickerAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <button
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange("rect")}
            >
              <BiRectangle />
            </button>

            <button
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange("circle")}
            >
              <BsCircle />
            </button>
            <button
              className="btn-icon text-2xl"
              onClick={() => handleShapeChange("line")}
            >
              <CgShapeZigzag />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShapeSelector;
