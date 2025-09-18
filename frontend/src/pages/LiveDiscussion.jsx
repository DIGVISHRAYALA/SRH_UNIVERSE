// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import "./LiveDiscussion.scss";

// const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
// const socket = io(API_BASE);

// function LiveDiscussion() {
//   const [rooms, setRooms] = useState([]);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");

//   const username = localStorage.getItem("username") || "Guest";

//   // fetch rooms from backend
//   const fetchRooms = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/rooms`);
//       setRooms(res.data);
//     } catch (err) {
//       console.error("Error fetching rooms:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();

//     // room list updates
//     socket.on("roomsUpdated", (data) => setRooms(data));

//     // new single message from server
//     socket.on("message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     // full message history on joining
//     socket.on("roomMessages", (msgs) => {
//       setMessages(msgs);
//     });

//     return () => {
//       socket.off("roomsUpdated");
//       socket.off("message");
//       socket.off("roomMessages");
//     };
//   }, []);

//   const joinRoom = (roomId) => {
//     setCurrentRoom(roomId);
//     setMessages([]); // clear old messages until history arrives
//     socket.emit("joinRoom", { roomId, username });
//   };

//   const sendMessage = () => {
//     if (!text.trim()) return;
//     socket.emit("chatMessage", { roomId: currentRoom, username, text });
//     setText("");
//   };

//   return (
//     <div className="live-discussion">
//       <h2>Live Discussion</h2>

//       {!currentRoom ? (
//         <div className="room-list">
//           <h3>Available Rooms</h3>
//           {rooms.map((r) => (
//             <div key={r.id} className="room-item">
//               <button onClick={() => joinRoom(r.id)}>{r.title}</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="chat-room">
//           <h3>
//             Room: {rooms.find((r) => r.id === currentRoom)?.title || "Unknown"}
//           </h3>

//           <div className="chat-box">
//             {messages.map((m, i) => (
//               <p key={i}>
//                 <strong>{m.user}: </strong>
//                 {m.text}
//               </p>
//             ))}
//           </div>

//           <div className="chat-input">
//             <input
//               type="text"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Type a message..."
//             />
//             <button onClick={sendMessage}>Send</button>
//             <button onClick={() => setCurrentRoom(null)}>Leave Room</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LiveDiscussion;





// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import "./LiveDiscussion.scss";

// const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
// const socket = io(API_BASE);

// function LiveDiscussion() {
//   const [rooms, setRooms] = useState([]);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");

//   const token = localStorage.getItem("token"); // JWT token stored at login

//   const fetchRooms = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/rooms`);
//       setRooms(res.data);
//     } catch (err) {
//       console.error("Error fetching rooms:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();

//     socket.on("roomsUpdated", data => setRooms(data));
//     socket.on("message", msg => setMessages(prev => [...prev, msg]));
//     socket.on("roomMessages", msgs => setMessages(msgs));

//     return () => {
//       socket.off("roomsUpdated");
//       socket.off("message");
//       socket.off("roomMessages");
//     };
//   }, []);

//   const joinRoom = (roomId) => {
//     if (!token) return alert("Login required");
//     setCurrentRoom(roomId);
//     setMessages([]);
//     socket.emit("joinRoom", { roomId, token });
//   };

//   const sendMessage = () => {
//     if (!text.trim() || !token) return;
//     socket.emit("chatMessage", { roomId: currentRoom, token, text });
//     setText("");
//   };

//   return (
//     <div className="live-discussion-page">
//     <div className="live-discussion">
//       <h2>Live Discussion</h2>

//       {!currentRoom ? (
//         <div className="room-list">
//           <h3>Available Rooms</h3>
//           {rooms.map(r => (
//             <div key={r._id} className="room-item">
//               <button onClick={() => joinRoom(r._id)}>{r.title}</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="chat-room">
//           <h3>
//             Room: {rooms.find(r => r._id === currentRoom)?.title || "Unknown"}
//           </h3>

//           {/* <div className="chat-box">
//             {messages.map((m, i) => (
//               <p key={i}>
//                 <strong>{m.user}: </strong>{m.text}
//               </p>
//             ))}
//           </div> */}

//           <div className="chat-box">
//   {messages.map((m, i) => (
//     // <div key={i} className="message">
//     //   <strong>{m.user}: </strong>{m.text}
//     //   <span className="time">
//     //     {new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//     //   </span>
//     // </div>
//     <div key={i} className={`message ${m.user === localStorage.getItem("username") ? "my-message" : ""}`}>
//   <div className="text">
//     <strong>{m.user}: </strong>{m.text}
//   </div>
//   <span className="time">
//     {new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//   </span>
// </div>

//   ))}
// </div>


//           {/* <div className="chat-input">
//             <input
//               type="text"
//               value={text}
//               onChange={e => setText(e.target.value)}
//               placeholder="Type a message..."
//             />
//             <button onClick={sendMessage}>Send</button>
//             <button onClick={() => setCurrentRoom(null)}>Leave Room</button>
//           </div> */}
//           <div className="chat-input">
//   <input
//     type="text"
//     value={text}
//     onChange={e => setText(e.target.value)}
//     placeholder="Type a message..."
//   />
//   <div className="buttons">
//     <button className="send-btn" onClick={sendMessage}>Send</button>
//     <button className="leave-btn" onClick={() => setCurrentRoom(null)}>Leave Room</button>
//   </div>
// </div>

//         </div>
//       )}
//     </div>
//     </div>
//   );
// }

// export default LiveDiscussion;













// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import "./LiveDiscussion.scss";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

// function LiveDiscussion() {
//   const [rooms, setRooms] = useState([]);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [socket, setSocket] = useState(null);

//   const token = localStorage.getItem("token"); // fresh JWT token
//   const username = localStorage.getItem("username"); // optional for highlighting messages

//   // Fetch rooms from server
//   const fetchRooms = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/rooms`);
//       setRooms(res.data);
//     } catch (err) {
//       console.error("Error fetching rooms:", err);
//     }
//   };

//   // Initialize socket connection whenever token changes
//   useEffect(() => {
//     fetchRooms();

//     if (!token) return;

//     const newSocket = io(API_BASE, { auth: { token } });
//     setSocket(newSocket);

//     newSocket.on("roomsUpdated", data => setRooms(data));
//     newSocket.on("message", msg => setMessages(prev => [...prev, msg]));
//     newSocket.on("roomMessages", msgs => setMessages(msgs));

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [token]);

//   const joinRoom = (roomId) => {
//     if (!token || !socket) return alert("Login required");
//     setCurrentRoom(roomId);
//     setMessages([]);
//     socket.emit("joinRoom", { roomId, token });
//   };

// //   const sendMessage = () => {
// //     if (!text.trim() || !token || !socket || !currentRoom) return;
// //     socket.emit("chatMessage", { roomId: currentRoom, token, text });
// //     setText("");
// //   };
// const sendMessage = () => {
//   if (!text.trim() || !token || !socket || !currentRoom) return;

//   // Only send token and text
//   socket.emit("chatMessage", { roomId: currentRoom, token, text });
//   setText("");
// };


// //   return (
// //     <div className="live-discussion-page">
// //       <div className="live-discussion">
// //         <h2>Live Discussion</h2>

// //         {!currentRoom ? (
// //           <div className="room-list">
// //             <h3>Available Rooms</h3>
// //             {rooms.map(r => (
// //               <div key={r._id} className="room-item">
// //                 <button onClick={() => joinRoom(r._id)}>{r.title}</button>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="chat-room">
// //             <h3>
// //               Room: {rooms.find(r => r._id === currentRoom)?.title || "Unknown"}
// //             </h3>

// //             <div className="chat-box">
// //               {messages.map((m, i) => (
// //                 <div
// //                   key={i}
// //                   className={`message ${m.user === username ? "my-message" : ""}`}
// //                 >
// //                   <div className="text">
// //                     <strong>{m.user}: </strong>{m.text}
// //                   </div>
// //                   <span className="time">
// //                     {new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="chat-input">
// //               <input
// //                 type="text"
// //                 value={text}
// //                 onChange={e => setText(e.target.value)}
// //                 placeholder="Type a message..."
// //               />
// //               <div className="buttons">
// //                 <button className="send-btn" onClick={sendMessage}>Send</button>
// //                 <button className="leave-btn" onClick={() => setCurrentRoom(null)}>Leave Room</button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default LiveDiscussion;



// return (
//   <div className="live-discussion-page">
//     <div className="live-discussion">
//       <h2>Live Discussion</h2>

//       {!currentRoom ? (
//         <div className="room-list">
//           <h3>Available Rooms</h3>
//           {rooms.map(r => (
//             <div key={r._id} className="room-item">
//               <button onClick={() => joinRoom(r._id)}>{r.title}</button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="chat-room">
//           <h3>
//             Room: {rooms.find(r => r._id === currentRoom)?.title || "Unknown"}
//           </h3>

//           <div className="chat-box">
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`message ${
//                   m.type === "system"
//                     ? "system-message"
//                     : m.user === username
//                       ? "my-message"
//                       : ""
//                 }`}
//               >
//                 <div className="text">
//                   {m.type === "system" ? (
//                     <em>{m.text}</em>
//                   ) : (
//                     <>
//                       <strong>{m.user}: </strong>{m.text}
//                     </>
//                   )}
//                 </div>
//                 {m.type !== "system" && (
//                   <span className="time">
//                     {new Date(m.time).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit"
//                     })}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="chat-input">
//             <input
//               type="text"
//               value={text}
//               onChange={e => setText(e.target.value)}
//               placeholder="Type a message..."
//             />
//             <div className="buttons">
//               <button className="send-btn" onClick={sendMessage}>Send</button>
//               <button className="leave-btn" onClick={() => setCurrentRoom(null)}>Leave Room</button>
//             </div>
//           </div>
          

//         </div>
//       )}
//     </div>
//   </div>
// );
// }

// export default LiveDiscussion;







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
//   const token = localStorage.getItem("token"); // fresh JWT token
//   const username = localStorage.getItem("username"); // highlight my messages

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

//   return (
//     <div className="live-discussion-page">
//       <div className="live-discussion">
//         <h2>GAME TALK</h2>

//         {!currentRoom ? (
//           <div className="room-list">
//             <h3>Available Match Rooms</h3>
//             {rooms.map((r) => (
//               <div key={r._id} className="room-item">
//                 <button onClick={() => joinRoom(r._id)}>{r.title}</button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="chat-room">
//             <h3>
//               Room: {rooms.find((r) => r._id === currentRoom)?.title || "Unknown"}
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

//         {/* 🔹 Toast (outside chat-input so it shows even after leaving) */}
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
            {rooms
              .filter((r) =>
                r.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((r) => (
                <div key={r._id} className="room-item">
                  <button onClick={() => joinRoom(r._id)}>
                    {highlightMatch(r.title)}
                  </button>
                </div>
              ))}
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
