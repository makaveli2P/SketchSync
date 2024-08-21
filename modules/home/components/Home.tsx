import { useEffect, useState, FormEvent } from "react";

import { useRouter } from "next/router";

import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modal";
import { useSetRoomId } from "@/common/recoil/room";

import NotFoundModal from "../modals/NotFound";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const setAtomRoomId = useSetRoomId();

  const router = useRouter();

  const { openModal } = useModal();

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(roomIdFromServer);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(roomIdFromServer);
      } else {
        openModal(<NotFoundModal id={roomId} />);
      }
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("join_room", roomId, username);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-24 text-8xl font-extrabold leading-tight">
        SketchSync
      </h1>
      <h3 className="text-2xl">Real Time Whiteboard</h3>

      <div className="mt-10 flex flex-col gap-2">
        <label className="self-start font-bold leading-tight">
          Enter Your Name:
        </label>
        <input
          className="rounded-xl border p-5 py-1"
          id="room-id"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>

      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleJoinRoom}
      >
        <label htmlFor="room-id" className="self-start font-bold leading-tight">
          Enter Room ID:
        </label>
        <input
          className="rounded-xl border p-5 py-1"
          id="room-id"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          className="rounded-xl bg-black p-5 py-1 text-white transition-all hover:scale-105 active:scale-100"
          type="submit"
        >
          Join
        </button>
      </form>
      
      <div className="my-8 flex w-96 items-center gap-2">
        <div className="h-px w-full bg-zinc-200" />
        <p className="text-zinc-400">or</p>
        <div className="h-px w-full bg-zinc-200" />
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <h5 className="self-start font-bold leading-tight">Create New Room</h5>
        <button
          className="rounded-xl bg-black p-5 py-1 text-white transition-all hover:scale-105 active:scale-100"
          onClick={handleCreateRoom}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Home;
