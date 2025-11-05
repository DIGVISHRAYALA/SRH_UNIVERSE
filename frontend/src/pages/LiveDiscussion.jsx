






// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import "./LiveDiscussion.scss";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

// function LiveDiscussion() {
//   const [rooms, setRooms] = useState([]);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [socket, setSocket] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showSearch, setShowSearch] = useState(false);

//   const token = localStorage.getItem("token");
//   const username = localStorage.getItem("username");

//   // 🔹 Toast function
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 800);
//   };

//   // 🔹 Send Message
//   const sendMessage = () => {
//     if (!text.trim() || !token || !socket || !currentRoom) return;
//     socket.emit("chatMessage", { roomId: currentRoom, token, text });
//     setText("");
//     showToast("Message sent successfully");
//   };

//   // 🔹 Fetch rooms
//   const fetchRooms = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/rooms`);
//       setRooms(res.data);
//     } catch (err) {
//       console.error("Error fetching rooms:", err);
//     }
//   };

//   // 🔹 Initialize socket
//   useEffect(() => {
//     fetchRooms();
//     if (!token) return;

//     const newSocket = io(API_BASE, { auth: { token } });
//     setSocket(newSocket);

//     newSocket.on("roomsUpdated", (data) => setRooms(data));
//     newSocket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
//     newSocket.on("roomMessages", (msgs) => setMessages(msgs));

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [token]);

//   // 🔹 Join room
//   const joinRoom = (roomId) => {
//     if (!token || !socket) return showToast("Login required");
//     setCurrentRoom(roomId);
//     setMessages([]);
//     socket.emit("joinRoom", { roomId, token });
//   };

//   // 🔹 Highlight search match
//   const highlightMatch = (text) => {
//     if (!searchTerm) return text;
//     const regex = new RegExp(`(${searchTerm})`, "gi");
//     return text.split(regex).map((part, i) =>
//       part.toLowerCase() === searchTerm.toLowerCase() ? (
//         <span key={i} className="highlight">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <div className="live-discussion-page">
//       <div className="live-discussion">
//         <h2>GAME TALK</h2>

//         {!currentRoom ? (
//           <div className="room-list">
//             <div className="room-list-header">
//               <h3>Available Match Rooms</h3>

//               <div className="search-container">
//                 {window.innerWidth > 600 && (
//                   <span
//                     className="search-icon"
//                     onClick={() => setShowSearch(!showSearch)}
//                   >
//                     🔍︎
//                   </span>
//                 )}

//                 {(showSearch || window.innerWidth <= 600) && (
//                   <input
//                     type="text"
//                     className="search-bar"
//                     placeholder="Search rooms..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Filtered rooms */}
//             {rooms
//               .filter((r) =>
//                 r.title.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((r) => (
//                 <div key={r._id} className="room-item">
//                   <button onClick={() => joinRoom(r._id)}>
//                     {highlightMatch(r.title)}
//                   </button>
//                 </div>
//               ))}
//           </div>
//         ) : (
//           <div className="chat-room">
//             <h3>
//               Room:{" "}
//               {rooms.find((r) => r._id === currentRoom)?.title || "Unknown"}
//             </h3>

//             {/* 🔹 Chat Box */}
//             <div className="chat-box">
//               {messages.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`message ${
//                     m.type === "system"
//                       ? "system-message"
//                       : m.user === username
//                       ? "my-message"
//                       : ""
//                   }`}
//                 >
//                   <div className="text">
//                     {m.type === "system" ? (
//                       <em>{m.text}</em>
//                     ) : (
//                       <>
//                         <strong>{m.user}: </strong>
//                         {m.text}
//                       </>
//                     )}
//                   </div>
//                   {m.type !== "system" && (
//                     <span className="time">
//                       {new Date(m.time).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* 🔹 Chat Input */}
//             <div className="chat-input">
//               <div className="input-wrapper">
//                 <input
//                   type="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                   placeholder="Type a message..."
//                 />
//                 <i
//                   className="fas fa-paper-plane send-icon"
//                   onClick={sendMessage}
//                 ></i>
//               </div>

//               <div className="buttons">
//                 <button className="send-btn" onClick={sendMessage}>
//                   Send
//                 </button>
//                 <button
//                   className="leave-btn"
//                   onClick={() => {
//                     setCurrentRoom(null);
//                     showToast("Leaved room");
//                   }}
//                 >
//                   Leave Room
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* 🔹 Toast */}
//         {toast && <div className="toast-message">{toast}</div>}
//       </div>
//     </div>
//   );
// }

// export default LiveDiscussion;













































import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./LiveDiscussion.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

function LiveDiscussion() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // 🔹 Toast function
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 800);
  };

  // 🔹 Send Message
  const sendMessage = () => {
    if (!text.trim() || !token || !socket || !currentRoom) return;
    socket.emit("chatMessage", { roomId: currentRoom, token, text });
    setText("");
    showToast("Message sent successfully");
  };

  // 🔹 Fetch rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/rooms`);
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  // 🔹 Initialize socket
  useEffect(() => {
    fetchRooms();
    if (!token) return;

    const newSocket = io(API_BASE, { auth: { token } });
    setSocket(newSocket);

    newSocket.on("roomsUpdated", (data) => setRooms(data));
    newSocket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    newSocket.on("roomMessages", (msgs) => setMessages(msgs));

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  // 🔹 Join room
  const joinRoom = (roomId) => {
    if (!token || !socket) return showToast("Login required");
    setCurrentRoom(roomId);
    setMessages([]);
    socket.emit("joinRoom", { roomId, token });
  };

  // 🔹 Highlight search match
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="live-discussion-page">
      <div className="live-discussion">
        <h2>GAME TALK</h2>

        {!currentRoom ? (
          <div className="room-list">
            <div className="room-list-header">
              <h3>Available Match Rooms</h3>

              <div className="search-container">
                {window.innerWidth > 600 && (
                  <span
                    className="search-icon"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    🔍︎
                  </span>
                )}

                {(showSearch || window.innerWidth <= 600) && (
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Filtered rooms */}
            {/* {rooms
              .filter((r) =>
                r.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((r) => (
                <div key={r._id} className="room-item">
                  <button onClick={() => joinRoom(r._id)}>
                    {highlightMatch(r.title)}
                  </button>
                </div>
              ))} */}
              <div className="room-grid">
  {rooms
    .filter((r) => {
      const search = searchTerm.toLowerCase();
      return (
        r.team1?.toLowerCase().includes(search) ||
        r.team2?.toLowerCase().includes(search)
      );
    })
    .map((r) => (
      <div
        key={r._id}
        className="room-box"
        onClick={() => joinRoom(r._id)}
      >
        <div className="team-name top">
          {highlightMatch(r.team1 || "Team 1")}
        </div>
        <div className="vs">VS</div>
        <div className="team-name bottom">
          {highlightMatch(r.team2 || "Team 2")}
        </div>
      </div>
    ))}
</div>

              


          </div>
        ) : (
          <div className="chat-room">
            <h3>
              Room:{" "}
              {rooms.find((r) => r._id === currentRoom)?.title || "Unknown"}
            </h3>

            {/* 🔹 Chat Box */}
            <div className="chat-box">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`message ${
                    m.type === "system"
                      ? "system-message"
                      : m.user === username
                      ? "my-message"
                      : ""
                  }`}
                >
                  <div className="text">
                    {m.type === "system" ? (
                      <em>{m.text}</em>
                    ) : (
                      <>
                        <strong>{m.user}: </strong>
                        {m.text}
                      </>
                    )}
                  </div>
                  {m.type !== "system" && (
                    <span className="time">
                      {new Date(m.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* 🔹 Chat Input */}
            <div className="chat-input">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                />
                <i
                  className="fas fa-paper-plane send-icon"
                  onClick={sendMessage}
                ></i>
              </div>

              <div className="buttons">
                <button className="send-btn" onClick={sendMessage}>
                  Send
                </button>
                <button
                  className="leave-btn"
                  onClick={() => {
                    setCurrentRoom(null);
                    showToast("Leaved room");
                  }}
                >
                  Leave Room
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔹 Toast */}
        {toast && <div className="toast-message">{toast}</div>}
      </div>
    </div>
  );
}

export default LiveDiscussion;

