import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useMotionValue, motion } from "framer-motion";
import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useViewportSize } from "@/common/hooks/useViewportSize";
import { useBoardPosition } from "../../hooks/useBoardPosition";
import { useRefs } from "../../hooks/useRefs";

const MiniMap = ({
  dragging,
  setMovedMinimap,
}: {
  dragging: boolean;
  setMovedMinimap: Dispatch<SetStateAction<boolean>>;
}) => {
  const { x, y } = useBoardPosition();
  const { minimapRef } = useRefs();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useViewportSize();

  const miniX = useMotionValue(0);
  const miniY = useMotionValue(0);

  useEffect(() => {
    const unsubscribeX = miniX.on("change", (newX) => {
      if (!dragging) x.set(-newX * 7);
    });

    const unsubscribeY = miniY.on("change", (newY) => {
      if (!dragging) y.set(-newY * 7);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [dragging, miniX, miniY, x, y]);

  return (
    <div
      className="absolute right-10 top-10 z-30 overflow-hidden rounded-lg bg-zinc-50"
      style={{
        width: CANVAS_SIZE.width / 7,
        height: CANVAS_SIZE.height / 7,
      }}
      ref={containerRef}
    >
      <canvas
        ref={minimapRef}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        className="h-full w-full"
      />
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onDragStart={() => setMovedMinimap((prev) => !prev)}
        onDragEnd={() => setMovedMinimap((prev) => !prev)}
        className="absolute top-0 left-0 cursor-grab rounded-lg border-2 border-red-500"
        style={{
          width: width / 7,
          height: height / 7,
          x: miniX,
          y: miniY,
        }}
        animate={{ x: -x.get() / 7, y: -y.get() / 7 }}
        transition={{ duration: 0 }}
      />
    </div>
  );
};

export default MiniMap;
