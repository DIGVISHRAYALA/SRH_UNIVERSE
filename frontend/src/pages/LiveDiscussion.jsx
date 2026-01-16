
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
//   const [isLoadingRooms, setIsLoadingRooms] = useState(true);

//   // --- DETERMINISTIC MOBILE CHECK (used for rendering)
//   const [isMobile, setIsMobile] = useState(() =>
//     typeof window !== "undefined" ? window.innerWidth <= 600 : false
//   );

//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth <= 600);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

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
//   // const fetchRooms = async () => {
//   //   try {
//   //     const res = await axios.get(`${API_BASE}/api/rooms`);
//   //     setRooms(res.data);
//   //   } catch (err) {
//   //     console.error("Error fetching rooms:", err);
//   //   }
//   // };

//   // 🔹 Fetch rooms
// const fetchRooms = async () => {
//   try {
//     setIsLoadingRooms(true);
//     const res = await axios.get(`${API_BASE}/api/rooms`);
//     setRooms(res.data);
//   } catch (err) {
//     console.error("Error fetching rooms:", err);
//     setRooms([]);
//   } finally {
//     setIsLoadingRooms(false);
//   }
// };


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
//               <h3>AVAILABLE MATCH ROOMS</h3>

//               <div className="search-container">
//                 {/* use isMobile instead of window.innerWidth */}
//                 {!isMobile && (
//                   <span
//                     className="search-icon"
//                     onClick={() => setShowSearch(!showSearch)}
//                   >
//                     🔍︎
//                   </span>
//                 )}

//                 {(showSearch || isMobile) && (
//                   <input
//                     type="text"
//                     className="search-bar"
//                     placeholder="search rooms"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* <div className="room-grid">
//               {rooms
//                 .filter((r) => {
//                   const search = searchTerm.toLowerCase();
//                   return (
//                     r.team1?.toLowerCase().includes(search) ||
//                     r.team2?.toLowerCase().includes(search)
//                   );
//                 })
//                 .map((r) => (
//                   <div
//                     key={r._id}
//                     className="room-box"
//                     onClick={() => joinRoom(r._id)}
//                   >
//                     <div className="team-name top">
//                       {highlightMatch(r.team1 || "Team 1")}
//                     </div>
//                     <div className="vs">VS</div>
//                     <div className="team-name bottom">
//                       {highlightMatch(r.team2 || "Team 2")}
//                     </div>
//                   </div>
//                 ))}
//             </div> */}
// <div className="room-grid">
//   {/* SHOW SKELETONS WHILE LOADING: one row only */}
//   {isLoadingRooms ? (
//     <>
//       {/* Desktop: 4 skeletons; Mobile CSS will collapse to 2 per row and only one row */}
//       {[0,1,2,3].map(i => (
//         <div key={`skel-${i}`} className="room-box skeleton">
//           <div className="team-name top skeleton-text" />
//           <div className="vs skeleton-vs" />
//           <div className="team-name bottom skeleton-text" />
//         </div>
//       ))}
//     </>
//   ) : (
//     rooms
//       .filter((r) => {
//         const search = searchTerm.toLowerCase();
//         return (
//           r.team1?.toLowerCase().includes(search) ||
//           r.team2?.toLowerCase().includes(search)
//         );
//       })
//       .map((r) => (
//         <div
//           key={r._id}
//           className="room-box"
//           onClick={() => joinRoom(r._id)}
//         >
//           <div className="team-name top">
//             {highlightMatch(r.team1 || "Team 1")}
//           </div>
//           <div className="vs">VS</div>
//           <div className="team-name bottom">
//             {highlightMatch(r.team2 || "Team 2")}
//           </div>
//         </div>
//       ))
//   )}
// </div>

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
  const [showMention, setShowMention] = useState(false);
  const [socket, setSocket] = useState(null);
  const [toast, setToast] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [agreeRules, setAgreeRules] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);

  // --- DETERMINISTIC MOBILE CHECK (used for rendering)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 600 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
  // const fetchRooms = async () => {
  //   try {
  //     const res = await axios.get(`${API_BASE}/api/rooms`);
  //     setRooms(res.data);
  //   } catch (err) {
  //     console.error("Error fetching rooms:", err);
  //   }
  // };

  // 🔹 Fetch rooms
const fetchRooms = async () => {
  try {
    setIsLoadingRooms(true);
    const res = await axios.get(`${API_BASE}/api/rooms`);
    setRooms(res.data);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    setRooms([]);
  } finally {
    setIsLoadingRooms(false);
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
        {showDisclaimer && (
  <div className="disclaimer-overlay">
    <div className="disclaimer-box">
      {/* <span
        className="disclaimer-close"
        onClick={() => setShowDisclaimer(false)}
      >
        ✕
      </span>

      <h3>Community Guidelines</h3>

      <ul>
        <li>Maintain decorum and respect all users.</li>
        <li>No abusive language, bad words, or personal attacks.</li>
        <li>Discuss only IPL, SRH, players, and match-related topics.</li>
        <li>No spam, promotions, or repeated messages.</li>
        <li>Use <strong>@srh_universe.ai</strong> for AI match assistance.</li>
        <li>Respect players, teams, and different opinions.</li>
        <li><strong>Login or Register</strong> is required to participate.</li>
      </ul>

      <p className="disclaimer-note">
        By continuing, you agree to follow these rules.
      </p> */}

      <span
  className="disclaimer-close"
  onClick={() => setShowDisclaimer(false)}
>
  ✕
</span>

<h3>COMMUNITY GUIDELINES</h3>

<ol>
  <li>You must create an account to participate in live discussions.</li>
  <li>You can use <strong>@srh_universe.ai</strong>, an AI assistant, to ask questions about past SRH data, match statistics, and cricket-related doubts by typing <strong>@srh_universe.ai</strong> at the beginning of your message in the chat box.</li>
  <li>Maintain decorum and be respectful to all users, teams, players, and officials.</li>
  <li>Do not use abusive, offensive, hateful, or vulgar language of any kind. Violations may result in account restriction.</li>
  <li>Spamming, promotions, repeated messages, or sharing misleading information is not allowed.</li>
  <li>Keep all discussions limited to IPL matches, SRH, players, and match-related topics only.</li>
  <li>If you have any doubts, suggestions, or experience a temporary issue with the Live Discussion page, please visit the <strong>About Us</strong> page and send us a message. Our team will get back to you shortly.</li>
</ol>

<div className="disclaimer-footer">
  <label className="agree-checkbox">
    <input
      type="checkbox"
      checked={agreeRules}
      onChange={(e) => setAgreeRules(e.target.checked)}
    />
    I agree to the rules and guidelines
  </label>

  {agreeRules && (
    <button
      className="continue-btn"
      onClick={() => setShowDisclaimer(false)}
    >
      Continue
    </button>
  )}
</div>

    </div>
  </div>
)}

        <h2>GAME TALK</h2>

        {!currentRoom ? (
          <div className="room-list">
            <div className="room-list-header">
              <h3>AVAILABLE MATCH ROOMS</h3>

              <div className="search-container">
                {/* use isMobile instead of window.innerWidth */}
                {!isMobile && (
                  <span
                    className="search-icon"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    🔍︎
                  </span>
                )}

                {(showSearch || isMobile) && (
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="search rooms"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* <div className="room-grid">
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
            </div> */}
<div className="room-grid">
  {/* SHOW SKELETONS WHILE LOADING: one row only */}
  {isLoadingRooms ? (
    <>
      {/* Desktop: 4 skeletons; Mobile CSS will collapse to 2 per row and only one row */}
      {[0,1,2,3].map(i => (
        <div key={`skel-${i}`} className="room-box skeleton">
          <div className="team-name top skeleton-text" />
          <div className="vs skeleton-vs" />
          <div className="team-name bottom skeleton-text" />
        </div>
      ))}
    </>
  ) : (
    rooms
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
      ))
  )}
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
{showMention && (
  <div
    className="mention-suggestion"
    onClick={() => {
      setText((prev) => prev + "srh_universe.ai ");
      setShowMention(false);
    }}
  >
    @srh_universe.ai
  </div>
)}

                {/* <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                /> */}
                <input
  type="text"
  value={text}
  onChange={(e) => {
    const value = e.target.value;
    setText(value);

    if (value.endsWith("@")) {
      setShowMention(true);
    } else {
      setShowMention(false);
    }
  }}
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



