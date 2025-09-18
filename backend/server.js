

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("./models/User");
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const os = require("os");
// const Video = require("./models/Video");
// const Article = require("./models/Article");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URL =
//   process.env.MONGO_URL || "mongodb://127.0.0.1:27017/srh_universe";

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Connect to MongoDB
// mongoose
//   .connect(MONGO_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection failed", err));

// /* ---------------------------- Multer storages ---------------------------- */
// const videoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "uploads");
//     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const uploadVideo = multer({ storage: videoStorage });

// const articleImageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const imagePath = path.join(__dirname, "uploads", "articles");
//     if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });
//     cb(null, "uploads/articles/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const uploadArticleImage = multer({ storage: articleImageStorage });

// /* ------------------------------- VIDEO API ------------------------------- */
// app.post("/upload", uploadVideo.single("video"), async (req, res) => {
//   try {
//     const { title } = req.body;
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const newVideo = new Video({
//       title,
//       filename: req.file.filename,
//       path: `/uploads/${req.file.filename}`,
//     });
//     const savedVideo = await newVideo.save();

//     res.status(200).json({ message: "Uploaded successfully!", video: savedVideo });
//   } catch (err) {
//     console.error("Error saving video:", err);
//     res.status(500).json({ message: "Failed to save video" });
//   }
// });

// app.get("/videos", async (req, res) => {
//   try {
//     const allVideos = await Video.find().sort({ uploadedAt: -1 });
//     res.json(allVideos);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch videos" });
//   }
// });

// app.get("/videos/:id/download", async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).send("Video not found");

//     video.downloadCount = (video.downloadCount || 0) + 1;
//     await video.save();

//     res.download(path.join(__dirname, video.path));
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// });

// app.delete("/videos/:id", async (req, res) => {
//   const adminPassword = req.headers["x-admin-password"];
//   if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
//     return res.status(401).json({ message: "Unauthorized access" });
//   }
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     const filePath = path.join(__dirname, video.path);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//     await Video.findByIdAndDelete(req.params.id);
//     res.json({ message: "Video deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete video" });
//   }
// });

// app.put("/videos/:id", async (req, res) => {
//   try {
//     const { title } = req.body;
//     const video = await Video.findByIdAndUpdate(
//       req.params.id,
//       { title, lastEditedAt: new Date() },
//       { new: true }
//     );
//     res.json(video);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update video" });
//   }
// });

// /* ------------------------------ AUTH ROUTES ------------------------------ */
// const generateToken = (user) =>
//   jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// app.post("/api/auth/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser)
//       return res.status(400).json({ message: "Username or email already exists" });

//     const user = new User({ username, email, password });
//     await user.save();

//     const token = generateToken(user);
//     res.status(201).json({
//       token,
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Registration failed" });
//   }
// });

// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { usernameOrEmail, password } = req.body;
//     const user = await User.findOne({
//       $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
//     });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const validPass = await bcrypt.compare(password, user.password);
//     if (!validPass) return res.status(400).json({ message: "Invalid password" });

//     const token = generateToken(user);
//     res.json({
//       token,
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed" });
//   }
// });

// /* ---------------------------- AUTH MIDDLEWARE ---------------------------- */
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id: "..." }
//     next();
//   } catch {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };

// // app.get("/api/auth/me", authMiddleware, async (req, res) => {
// //   const user = await User.findById(req.user.id).select("-password");
// //   res.json(user);
// // });


// app.get("/api/auth/me", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Count liked articles
//     const likedArticlesCount = await Article.countDocuments({
//       likes: req.user.id,
//     });

//     // Count commented articles
//     const commentedArticlesCount = await Article.countDocuments({
//       "comments.user": req.user.id,
//     });

//     res.json({
//       ...user.toObject(),
//       likedArticlesCount,
//       commentedArticlesCount,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching user profile" });
//   }
// });



// app.put("/api/auth/change-password", authMiddleware, async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     const user = await User.findById(req.user.id);

//     const isMatch = await user.matchPassword(oldPassword);
//     if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

//     user.password = newPassword; // schema hook will hash
//     await user.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating password" });
//   }
// });

// /* ----------------------------- ARTICLE ROUTES ---------------------------- */
// // app.post("/api/articles", uploadArticleImage.single("image"), async (req, res) => {
// //   try {
// //     const { title, content } = req.body;
// //     const imagePath = req.file ? `/uploads/articles/${req.file.filename}` : null;

// //     const article = new Article({ title, content, image: imagePath });
// //     await article.save();

// //     res.status(201).json(article);
// //   } catch (err) {
// //     res.status(500).json({ error: "Failed to upload article" });
// //   }
// // });



// app.post("/api/articles", uploadArticleImage.single("image"), async (req, res) => {
//   try {
//     const { title, content, titleTelugu, contentTelugu } = req.body;
//     const imagePath = req.file ? `/uploads/articles/${req.file.filename}` : null;

//     const article = new Article({
//       title,
//       content,
//       titleTelugu,
//       contentTelugu,
//       image: imagePath
//     });

//     await article.save();
//     res.status(201).json(article);
//   } catch (err) {
//     console.error("Error uploading article:", err);
//     res.status(500).json({ message: "Failed to upload article" });
//   }
// });


// // app.get("/api/articles", async (req, res) => {
// //   try {
// //     const articles = await Article.find().sort({ createdAt: -1 });
// //     res.json(articles);
// //   } catch {
// //     res.status(500).json({ error: "Failed to fetch articles" });
// //   }
// // });



// // app.get("/api/articles", authMiddleware, async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const articles = await Article.find().sort({ createdAt: -1 });

// //     const formatted = articles.map(a => ({
// //       ...a.toObject(),
// //       likesCount: a.likes.length,
// //       liked: a.likes.some(id => id.toString() === userId)
// //     }));

// //     res.json(formatted);
// //   } catch (err) {
// //     res.status(500).json({ error: "Failed to fetch articles" });
// //   }
// // });


// // 🔹 Open route for everyone (basic article data)
// app.get("/api/articles", async (req, res) => {
//   try {
//     const articles = await Article.find().sort({ createdAt: -1 });
//     res.json(articles);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch articles" });
//   }
// });

// // 🔹 Authenticated route for like-status
// app.get("/api/articles/auth", authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const articles = await Article.find().sort({ createdAt: -1 });

//     const formatted = articles.map(a => ({
//       ...a.toObject(),
//       likesCount: a.likes.length,
//       liked: a.likes.some(id => id.toString() === userId)
//     }));

//     res.json(formatted);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch articles" });
//   }
// });





// app.delete("/api/articles/:id", async (req, res) => {
//   try {
//     await Article.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch {
//     res.status(500).json({ error: "Failed to delete article" });
//   }
// });

// app.put("/api/articles/:id", async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const article = await Article.findByIdAndUpdate(
//       req.params.id,
//       { title, content },
//       { new: true }
//     );
//     res.json(article);
//   } catch {
//     res.status(500).json({ error: "Failed to edit article" });
//   }
// });

// /* ------------------------- LIKES & COMMENTS ------------------------- */
// app.post("/api/articles/:id/like", authMiddleware, async (req, res) => {
//   try {
//     const article = await Article.findById(req.params.id);
//     if (!article) return res.status(404).json({ message: "Article not found" });

//     if (!Array.isArray(article.likes)) article.likes = [];

//     const userId = new mongoose.Types.ObjectId(req.user.id);
//     const index = article.likes.findIndex((id) => id.equals(userId));

//     const user = await User.findById(req.user.id);

//     if (index === -1) {
//       article.likes.push(userId);
//       user.likedPosts.push(article._id);
//     } else {
//       article.likes.splice(index, 1);
//       user.likedPosts = user.likedPosts.filter(
//         (postId) => !postId.equals(article._id)
//       );
//     }

//     await article.save();
//     await user.save();

//     res.json({
//       likes: article.likes,
//       likesCount: article.likes.length,
//       liked: index === -1,
//     });
//   } catch (err) {
//     console.error("Error in like route:", err);
//     res.status(500).json({ message: "Error liking article" });
//   }
// });

// app.post("/api/articles/:id/comment", authMiddleware, async (req, res) => {
//   try {
//     const { text } = req.body;
//     const article = await Article.findById(req.params.id);
//     if (!article) return res.status(404).json({ message: "Article not found" });

//     const user = await User.findById(req.user.id);

//     article.comments.push({
//       user: user._id,
//       username: user.username || "Unknown",
//       text,
//     });

//     user.commentedPosts.push(article._id);

//     await article.save();
//     await user.save();

//     res.json({ message: "Comment added", comments: article.comments });
//   } catch (err) {
//     console.error("Error in comment route:", err);
//     res.status(500).json({ message: "Error commenting" });
//   }
// });

// app.delete(
//   "/api/articles/:articleId/comments/:commentId",
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const { articleId, commentId } = req.params;
//       const userId = req.user.id;

//       const article = await Article.findById(articleId);
//       if (!article) return res.status(404).json({ message: "Article not found" });

//       const comment = article.comments.id(commentId);
//       if (!comment) return res.status(404).json({ message: "Comment not found" });

//       if (comment.user.toString() !== userId) {
//         return res.status(403).json({ message: "Not authorized to delete this comment" });
//       }

//       comment.deleteOne();
//       await article.save();

//       res.json({ comments: article.comments });
//     } catch (err) {
//       res.status(500).json({ message: "Error deleting comment" });
//     }
//   }
// );

// app.get("/api/users/:id/activity", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//       .populate("likedPosts", "title content")
//       .populate("commentedPosts", "title content");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({
//       likedPosts: user.likedPosts,
//       commentedPosts: user.commentedPosts,
//     });
//   } catch {
//     res.status(500).json({ message: "Error fetching activity" });
//   }
// });



// /* ------------------------------- START APP ------------------------------- */
// app.listen(PORT, "0.0.0.0", () => {
//   const nets = os.networkInterfaces();
//   const addresses = [];
//   Object.keys(nets).forEach((ifname) =>
//     nets[ifname].forEach(
//       (net) => net.family === "IPv4" && !net.internal && addresses.push(`${ifname}: ${net.address}`)
//     )
//   );
//   console.log(`Server running on http://localhost:${PORT}`);
//   if (addresses.length) console.log("LAN addresses:", addresses.join(", "));
// });







const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const os = require("os");
const Video = require("./models/Video");
const Article = require("./models/Article");
const Message = require("./models/Message");
const Room = require("./models/Room");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/srh_universe";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed", err));

/* ---------------------------- Multer storages ---------------------------- */
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadVideo = multer({ storage: videoStorage });

const articleImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagePath = path.join(__dirname, "uploads", "articles");
    if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });
    cb(null, "uploads/articles/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadArticleImage = multer({ storage: articleImageStorage });

/* ------------------------------- VIDEO API ------------------------------- */
app.post("/upload", uploadVideo.single("video"), async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const newVideo = new Video({
      title,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });
    const savedVideo = await newVideo.save();

    res.status(200).json({ message: "Uploaded successfully!", video: savedVideo });
  } catch (err) {
    console.error("Error saving video:", err);
    res.status(500).json({ message: "Failed to save video" });
  }
});

app.get("/videos", async (req, res) => {
  try {
    const allVideos = await Video.find().sort({ uploadedAt: -1 });
    res.json(allVideos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

app.get("/videos/:id/download", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");

    video.downloadCount = (video.downloadCount || 0) + 1;
    await video.save();

    res.download(path.join(__dirname, video.path));
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.delete("/videos/:id", async (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const filePath = path.join(__dirname, video.path);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete video" });
  }
});

app.put("/videos/:id", async (req, res) => {
  try {
    const { title } = req.body;
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { title, lastEditedAt: new Date() },
      { new: true }
    );
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to update video" });
  }
});

/* ------------------------------ AUTH ROUTES ------------------------------ */
const generateToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(400).json({ message: "Username or email already exists" });

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user);
    res.json({
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

/* ---------------------------- AUTH MIDDLEWARE ---------------------------- */
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: "..." }
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Count liked articles
    const likedArticlesCount = await Article.countDocuments({
      likes: req.user.id,
    });

    // Count commented articles
    const commentedArticlesCount = await Article.countDocuments({
      "comments.user": req.user.id,
    });

    res.json({
      ...user.toObject(),
      likedArticlesCount,
      commentedArticlesCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

app.put("/api/auth/change-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    user.password = newPassword; // schema hook will hash
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
});

/* ----------------------------- ARTICLE ROUTES ---------------------------- */
app.post("/api/articles", uploadArticleImage.single("image"), async (req, res) => {
  try {
    const { title, content, titleTelugu, contentTelugu } = req.body;
    const imagePath = req.file ? `/uploads/articles/${req.file.filename}` : null;

    const article = new Article({
      title,
      content,
      titleTelugu,
      contentTelugu,
      image: imagePath
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    console.error("Error uploading article:", err);
    res.status(500).json({ message: "Failed to upload article" });
  }
});

app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.get("/api/articles/auth", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const articles = await Article.find().sort({ createdAt: -1 });

    const formatted = articles.map(a => ({
      ...a.toObject(),
      likesCount: a.likes.length,
      liked: a.likes.some(id => id.toString() === userId)
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.delete("/api/articles/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete article" });
  }
});

app.put("/api/articles/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(article);
  } catch {
    res.status(500).json({ error: "Failed to edit article" });
  }
});

/* ------------------------- LIKES & COMMENTS ------------------------- */
app.post("/api/articles/:id/like", authMiddleware, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    if (!Array.isArray(article.likes)) article.likes = [];

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const index = article.likes.findIndex((id) => id.equals(userId));

    const user = await User.findById(req.user.id);

    if (index === -1) {
      article.likes.push(userId);
      user.likedPosts.push(article._id);
    } else {
      article.likes.splice(index, 1);
      user.likedPosts = user.likedPosts.filter(
        (postId) => !postId.equals(article._id)
      );
    }

    await article.save();
    await user.save();

    res.json({
      likes: article.likes,
      likesCount: article.likes.length,
      liked: index === -1,
    });
  } catch (err) {
    console.error("Error in like route:", err);
    res.status(500).json({ message: "Error liking article" });
  }
});

app.post("/api/articles/:id/comment", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const user = await User.findById(req.user.id);

    article.comments.push({
      user: user._id,
      username: user.username || "Unknown",
      text,
    });

    user.commentedPosts.push(article._id);

    await article.save();
    await user.save();

    res.json({ message: "Comment added", comments: article.comments });
  } catch (err) {
    console.error("Error in comment route:", err);
    res.status(500).json({ message: "Error commenting" });
  }
});

app.delete(
  "/api/articles/:articleId/comments/:commentId",
  authMiddleware,
  async (req, res) => {
    try {
      const { articleId, commentId } = req.params;
      const userId = req.user.id;

      const article = await Article.findById(articleId);
      if (!article) return res.status(404).json({ message: "Article not found" });

      const comment = article.comments.id(commentId);
      if (!comment) return res.status(404).json({ message: "Comment not found" });

      if (comment.user.toString() !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this comment" });
      }

      comment.deleteOne();
      await article.save();

      res.json({ comments: article.comments });
    } catch (err) {
      res.status(500).json({ message: "Error deleting comment" });
    }
  }
);

app.get("/api/users/:id/activity", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("likedPosts", "title content")
      .populate("commentedPosts", "title content");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      likedPosts: user.likedPosts,
      commentedPosts: user.commentedPosts,
    });
  } catch {
    res.status(500).json({ message: "Error fetching activity" });
  }
});




/* --------------------------- SOCKET.IO CHAT --------------------------- */
const http = require("http");
const { Server } = require("socket.io");

// // Wrap Express in HTTP server
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*", // allow frontend
//     methods: ["GET", "POST"]
//   }
// });

// // ------------------ In-memory room storage ------------------
// let rooms = []; // [{ id, title, createdAt }]

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // ---------------- Join room + load last 50 messages ----------------
//   socket.on("joinRoom", async ({ roomId, username }) => {
//     socket.join(roomId);

//     // Fetch last 50 messages from MongoDB
//     const messages = await Message.find({ roomId })
//       .sort({ time: -1 })
//       .limit(50);

//     // Send messages in chronological order
//     socket.emit("roomMessages", messages.reverse());

//     // Notify others in the room
//     socket.to(roomId).emit("message", {
//       user: "System",
//       text: `${username} joined the room`,
//       time: new Date()
//     });
//   });

//   // ---------------- Send + save chat message ----------------
//   socket.on("chatMessage", async ({ roomId, username, text }) => {
//     if (!text || !roomId) return;

//     const msg = new Message({ roomId, user: username, text });
//     await msg.save();

//     io.to(roomId).emit("message", msg);
//   });

//   // ---------------- Create new room ----------------
//   socket.on("createRoom", ({ title }) => {
//     if (!title) return;

//     const newRoom = { id: Date.now().toString(), title, createdAt: new Date() };
//     rooms.push(newRoom);

//     // Notify all clients about the new room
//     io.emit("roomsUpdated", rooms);
//   });

//   // ---------------- Disconnect ----------------
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // ---------------- API to fetch rooms ----------------
// app.get("/api/rooms", (req, res) => {
//   res.json(rooms);
// });

// // ------------------------------- START APP -------------------------------
// server.listen(PORT, "0.0.0.0", () => {
//   const nets = os.networkInterfaces();
//   const addresses = [];
//   Object.keys(nets).forEach((ifname) =>
//     nets[ifname].forEach(
//       (net) =>
//         net.family === "IPv4" && !net.internal && addresses.push(`${ifname}: ${net.address}`)
//     )
//   );
//   console.log(`Server running on http://localhost:${PORT}`);
//   if (addresses.length) console.log("LAN addresses:", addresses.join(", "));
// });




const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET","POST"] }
});

//let rooms = []; // In-memory room storage [{id, title, createdAt}]

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  // socket.on("joinRoom", async ({ roomId, token }) => {
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     const user = await User.findById(decoded.id);
  //     if (!user) return;

  //     socket.join(roomId);

  //     const messages = await Message.find({ roomId }).sort({ time: -1 }).limit(50);
  //     socket.emit("roomMessages", messages.reverse());

  //     socket.to(roomId).emit("message", {
  //       user: "System",
  //       text: `${user.username} joined the room`,
  //       time: new Date()
  //     });
  //   } catch (err) {
  //     console.error("Invalid token on joinRoom:", err);
  //   }
  // });


  socket.on("joinRoom", async ({ roomId, token }) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return;

    socket.join(roomId);

    const messages = await Message.find({ roomId })
      .sort({ time: -1 })
      .limit(50);

    socket.emit("roomMessages", messages.reverse());

    socket.to(roomId).emit("message", {
      user: "System",
      text: `${user.username} joined the room`,
      time: new Date()
    });
  } catch (err) {
    console.error("Invalid token on joinRoom:", err);
  }
});


  // Send message
  // socket.on("chatMessage", async ({ roomId, token, text }) => {
  //   if (!roomId || !text || !token) return;

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     const user = await User.findById(decoded.id);
  //     if (!user) return;

  //     const msg = new Message({ roomId, user: user.username, text });
  //     await msg.save();

  //     io.to(roomId).emit("message", msg);
  //   } catch (err) {
  //     console.error("Invalid token on chatMessage:", err);
  //   }
  // });


  socket.on("chatMessage", async ({ roomId, token, text }) => {
  if (!roomId || !text || !token) return;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return;

    const msg = new Message({
      roomId,
      user: user.username, // <- always use username from DB
      text,
      time: new Date()     // Add timestamp if missing
    });
    await msg.save();

    io.to(roomId).emit("message", msg);
  } catch (err) {
    console.error("Invalid token on chatMessage:", err);
  }
});


  // Create room
  // socket.on("createRoom", ({ title }) => {
  //   if (!title) return;

  //   const newRoom = { id: Date.now().toString(), title, createdAt: new Date() };
  //   rooms.push(newRoom);
  //   io.emit("roomsUpdated", rooms);
  // });

  // Create room
socket.on("createRoom", async ({ title }) => {
  if (!title) return;

  try {
    const newRoom = new Room({ title });
    await newRoom.save();

    // Fetch all rooms and broadcast
    const allRooms = await Room.find().sort({ createdAt: -1 });
    io.emit("roomsUpdated", allRooms);
  } catch (err) {
    console.error("Error creating room:", err);
  }
});


  // Disconnect
  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});



// Delete room
// app.delete("/api/rooms/:id", async (req, res) => {
//   const roomId = req.params.id;

//   // Remove room from in-memory array
//   const index = rooms.findIndex(r => r.id === roomId);
//   if (index === -1) return res.status(404).json({ message: "Room not found" });

//   rooms.splice(index, 1);

//   // Notify all clients that rooms have updated
//   io.emit("roomsUpdated", rooms);

//   // Optionally, remove all messages for that room from DB
//   await Message.deleteMany({ roomId });

//   res.json({ message: "Room deleted successfully" });
// });



app.delete("/api/rooms/:id", async (req, res) => {
  const roomId = req.params.id;

  // Remove from DB
  const deletedRoom = await Room.findByIdAndDelete(roomId);
  if (!deletedRoom) return res.status(404).json({ message: "Room not found" });

  // Delete all messages for this room
  await Message.deleteMany({ roomId });

  // Broadcast updated room list
  const allRooms = await Room.find().sort({ createdAt: -1 });
  io.emit("roomsUpdated", allRooms);

  res.json({ message: "Room deleted successfully" });
});




// API to fetch rooms
//app.get("/api/rooms", (req, res) => res.json(rooms));


app.get("/api/rooms", async (req, res) => {
  const allRooms = await Room.find().sort({ createdAt: -1 });
  res.json(allRooms);
});

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
  const nets = os.networkInterfaces();
  const addresses = [];
  Object.keys(nets).forEach(ifname =>
    nets[ifname].forEach(net =>
      net.family === "IPv4" && !net.internal && addresses.push(`${ifname}: ${net.address}`)
    )
  );
  if (addresses.length) console.log("LAN addresses:", addresses.join(", "));
});