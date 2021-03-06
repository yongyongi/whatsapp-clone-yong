import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState([]);
  useEffect(() => {
    setSeed(Math.random);
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot.docs[0].data);
          setMessage(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, []);
  console.log(">>", message);
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
