import { createContext, ReactChild, RefObject, useEffect, useRef } from "react";

import { MotionValue, useMotionValue } from "framer-motion";

import { socket } from "@/common/lib/socket";
import { useSetRoom, useSetUsers } from "@/common/recoil/room/room.hooks";
import { COLORS_ARRAY } from "@/common/constants/colors";

export const roomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
  undoRef: RefObject<HTMLButtonElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  bgRef: RefObject<HTMLCanvasElement>;

}>(null!);

const RoomContextProvider = ({ children }: { children: ReactChild }) => {
  const setRoom = useSetRoom();
  const { handleAddUser, handleRemoveUser } = useSetUsers();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const undoRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    socket.on("room", (room, usersMoveToParse, usersToParse) => {
      const usersMoves = new Map<string, Move[]>(JSON.parse(usersMoveToParse));
      const usersParsed = new Map<string, string>(JSON.parse(usersToParse));

      const users = new Map<string, User>();

      usersParsed.forEach((name, id) => {
        if (id === socket.id) return;

        const index = [...usersParsed.keys()].indexOf(id);

        const color = COLORS_ARRAY[index % COLORS_ARRAY.length];

        users.set(id, {
          name,
          color,
        });
      });

      setRoom((prev) => ({
        ...prev,
        users,
        usersMoves,
        movesWithoutUser: room.drawed,
      }));
    });
    socket.on("new_user", (userId, username) => {
      handleAddUser(userId, username);
    });

    socket.on("user_disconnected", (userId) => {
      handleRemoveUser(userId);
    });

    return () => {
      socket.off("room");
      socket.off("new_user");
      socket.off("user_disconnected");
    };
  }, [handleAddUser, handleRemoveUser, setRoom]);

  return (
    <roomContext.Provider value={{ x, y, bgRef, undoRef, canvasRef }}>{children}</roomContext.Provider>
  );
};

export default RoomContextProvider;
