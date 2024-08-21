import { useRoom } from "@/common/recoil/room";
import { useRef } from "react";

import RoomContextProvider from "../context/Room.context";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MouseRenderer from "./board/MouseRenderer";
import ToolBar from "./toolbar/ToolBar";
import NameInput from "./NameInput";
import UserList from "./UserList";
import Chat from "./chat/Chat";

const Room = () => {
  const room = useRoom();

  const undoRef = useRef<HTMLButtonElement>(null);
  if (!room.id) return <NameInput />;
  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">
        <UserList />
        <ToolBar undoRef ={undoRef} />
        <Canvas undoRef ={undoRef} />
        <MousePosition />
        <MouseRenderer />
        <Chat />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
