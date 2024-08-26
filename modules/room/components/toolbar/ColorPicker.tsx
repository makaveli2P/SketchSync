import { useOptions } from "@/common/recoil/options";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { ColorPickerAnimation } from "../../animations/ColorPicker.animations";
import { RgbaColorPicker } from "react-colorful";
import { BsPaletteFill } from "react-icons/bs";

const ColorPicker = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  return (
    <div className="relative flex items-center" ref={ref}>
      <button className="" onClick={() => setOpened(!opened)}>
        <BsPaletteFill />
      </button>
        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute left-14 mt-24"
              variants={ColorPickerAnimation}
              initial="from"
              animate="to"
              exit="from"
            >
              <h2 className="font-semibold text-black">Line Color</h2>
              <RgbaColorPicker
                color={options.lineColor}
                onChange={(e) => setOptions({ ...options, lineColor: e })}
                className="mb-5"
              />
              <h2 className="font-semibold text-black">Fill Color</h2>
              <RgbaColorPicker
                color={options.fillColor}
                onChange={(e) => setOptions({ ...options, fillColor: e })}
              />
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
