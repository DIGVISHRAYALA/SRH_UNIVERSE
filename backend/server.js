

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User');
// function generateToken(user) {
//   return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// }

// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const os = require('os');
// const Video = require('./models/Video');
// const Article = require('./models/Article');
// const router = express.Router();
// // Load .env
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/srh_universe';

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// mongoose.connect(MONGO_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection failed", err));

// // === Multer storage for videos ===
// const videoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, 'uploads');
//     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });
// const uploadVideo = multer({ storage: videoStorage });

// // === Multer storage for article images ===
// const articleImageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const imagePath = path.join(__dirname, 'uploads', 'articles');
//     if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });
//     cb(null, 'uploads/articles/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });
// const uploadArticleImage = multer({ storage: articleImageStorage });

// // === VIDEO ROUTES ===
// app.post('/upload', uploadVideo.single('video'), (req, res) => {
//   const { title } = req.body;
//   const file = req.file;

//   if (!file) return res.status(400).json({ message: 'No file uploaded' });

//   const newVideo = new Video({
//     title,
//     filename: file.filename,
//     path: `/uploads/${file.filename}`,
//   });

//   newVideo.save()
//     .then(savedVideo => {
//       console.log("Video metadata saved to MongoDB:", savedVideo);
//       res.status(200).json({ message: 'Uploaded successfully!', video: savedVideo });
//     })
//     .catch(err => {
//       console.error('Error saving to DB:', err);
//       res.status(500).json({ message: 'Failed to save video' });
//     });
// });

// app.get('/videos', async (req, res) => {
//   try {
//     const allVideos = await Video.find().sort({ uploadedAt: -1 });
//     res.status(200).json(allVideos);
//   } catch (err) {
//     console.error('Error fetching videos:', err);
//     res.status(500).json({ message: 'Failed to fetch videos' });
//   }
// });

// app.get('/videos/:id/download', async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).send('Video not found');

//     video.downloadCount = (video.downloadCount || 0) + 1;
//     await video.save();

//     res.download(path.join(__dirname, video.path));
//   } catch (err) {
//     console.error('Download error:', err);
//     res.status(500).send('Server error');
//   }
// });

// app.delete('/videos/:id', async (req, res) => {
//   const adminPassword = req.headers['x-admin-password'];
//   if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
//     return res.status(401).json({ message: 'Unauthorized access' });
//   }

//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: 'Video not found' });

//     const filePath = path.join(__dirname, video.path);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//     await Video.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Video deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting video:', err);
//     res.status(500).json({ message: 'Failed to delete video' });
//   }
// });

// app.put('/videos/:id', async (req, res) => {
//   try {
//     const { title } = req.body;
//     const video = await Video.findByIdAndUpdate(
//       req.params.id,
//       { title, lastEditedAt: new Date() },
//       { new: true }
//     );
//     res.json(video);
//   } catch (err) {
//     console.error('Error updating video:', err);
//     res.status(500).json({ message: 'Failed to update video' });
//   }
// });

// // === ARTICLE ROUTES ===

// // Create Article (with optional image)
// app.post('/api/articles', uploadArticleImage.single('image'), async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const imagePath = req.file ? `/uploads/articles/${req.file.filename}` : null;

//     const article = new Article({ title, content, image: imagePath });
//     await article.save();

//     res.status(201).json(article);
//   } catch (err) {
//     console.error('Error creating article:', err);
//     res.status(500).json({ error: 'Failed to upload article' });
//   }
// });

// // Get Articles
// app.get('/api/articles', async (req, res) => {
//   try {
//     const articles = await Article.find().sort({ createdAt: -1 });
//     res.json(articles);
//   } catch (err) {
//     console.error('Error fetching articles:', err);
//     res.status(500).json({ error: 'Failed to fetch articles' });
//   }
// });

// // Delete Article
// app.delete('/api/articles/:id', async (req, res) => {
//   try {
//     await Article.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting article:', err);
//     res.status(500).json({ error: 'Failed to delete article' });
//   }
// });

// // Edit Article
// app.put('/api/articles/:id', async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const article = await Article.findByIdAndUpdate(
//       req.params.id,
//       { title, content },
//       { new: true }
//     );
//     res.json(article);
//   } catch (err) {
//     console.error('Error editing article:', err);
//     res.status(500).json({ error: 'Failed to edit article' });
//   }
// });



// // === AUTH ROUTES ===
// // Register
// // Register route
// // Register route
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // check duplicate username/email
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username or email already exists' });
//     }

//     const user = new User({ username, email, password });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.status(201).json({
//       token,
//       username: user.username,
//       id: user._id, 
//       email: user.email,
//     });
//   } catch (err) {
//     console.error('Register error:', err);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// });


// // Login route
// // Login route
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { usernameOrEmail, password } = req.body;

//     // allow login via username OR email
//     const user = await User.findOne({
//       $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
//     });

//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const validPass = await bcrypt.compare(password, user.password);
//     if (!validPass) return res.status(400).json({ message: 'Invalid password' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.json({
//       token,
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: 'Login failed' });
//   }
// });


// // server.js (replace your current /api/auth/login with this)




// // Get current user
// app.get('/api/auth/me', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');

//     res.json(user);
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });



// // Middleware: check JWT
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id: "...", email: "..." }
//     next();
//   } catch {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// // Get current user
// app.get('/api/auth/me', authMiddleware, async (req, res) => {
//   const user = await User.findById(req.user.id).select('-password'); // exclude password
//   res.json(user);
// });




// app.put('/api/auth/change-password', authMiddleware, async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     const user = await User.findById(req.user.id);

//     const isMatch = await user.matchPassword(oldPassword);
//     if (!isMatch) return res.status(400).json({ message: 'Old password incorrect' });

//     user.password = newPassword; // ✅ schema hook will hash it
//     await user.save();

//     res.json({ message: 'Password updated successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating password' });
//   }
// });



// // // === LIKE ARTICLE ===
// // app.post('/api/articles/:id/like', authMiddleware, async (req, res) => {
// //   try {
// //     const article = await Article.findById(req.params.id);
// //     if (!article) return res.status(404).json({ message: 'Article not found' });

// //     const userId = req.user.id;
// //     const index = article.likes.indexOf(userId);

// //     if (index === -1) {
// //       // not liked yet → add like
// //       article.likes.push(userId);
// //     } else {
// //       // already liked → unlike
// //       article.likes.splice(index, 1);
// //     }

// //     await article.save();
// //     res.json({ likesCount: article.likes.length, liked: index === -1 });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Error liking article' });
// //   }
// // });

// // app.post('/api/articles/:id/like', authMiddleware, async (req, res) => {
// //   try {
// //     const article = await Article.findById(req.params.id);
// //     if (!article) return res.status(404).json({ message: 'Article not found' });

// //     const userId = req.user.id;  // from JWT / session
// //     const index = article.likes.findIndex(id => id.equals(userId));

// //     if (index === -1) {
// //       article.likes.push(userId);       // add like
// //     } else {
// //       article.likes.splice(index, 1);   // remove like
// //     }

// //     await article.save();

// //     res.json({
// //       likes: article.likes,                // keep actual array
// //       likesCount: article.likes.length,    // number for UI
// //       liked: index === -1                  // toggle button state
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Error liking article' });
// //   }
// // });

// app.post("/api/articles/:id/like", authMiddleware, async (req, res) => {
//   try {
//     const article = await Article.findById(req.params.id);
//     if (!article) return res.status(404).json({ message: "Article not found" });

//     if (!Array.isArray(article.likes)) {
//       article.likes = [];
//     }

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
//       liked: index === -1
//     });

//   } catch (err) {
//     console.error("Error in like route:", err);
//     res.status(500).json({ message: "Error liking article" });
//   }
// });



// // === COMMENT ARTICLE ===
// // app.post('/api/articles/:id/comment', authMiddleware, async (req, res) => {
// //   try {
// //     const { text } = req.body;
// //     if (!text) return res.status(400).json({ message: 'Comment cannot be empty' });

// //     const article = await Article.findById(req.params.id);
// //     if (!article) return res.status(404).json({ message: 'Article not found' });

// //     article.comments.push({ user: req.user.id, text });
// //     await article.save();

// //     await article.populate('comments.user', 'username');
// //     res.json(article.comments);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Error adding comment' });
// //   }
// // });

// // // === GET COMMENTS ===
// // app.get('/api/articles/:id/comments', async (req, res) => {
// //   try {
// //     const article = await Article.findById(req.params.id)
// //       .populate('comments.user', 'username');
// //     if (!article) return res.status(404).json({ message: 'Article not found' });

// //     res.json(article.comments);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error fetching comments' });
// //   }
// // });


// app.post("/api/articles/:id/comment", authMiddleware, async (req, res) => {
//   try {
//     const { text } = req.body;
//     const article = await Article.findById(req.params.id);
//     if (!article) return res.status(404).json({ message: "Article not found" });

//     const user = await User.findById(req.user.id);

//     article.comments.push({
//       user: user._id,
//       username: user.username || "Unknown",   // 👈 username stored
//       text
//     });

//     user.commentedPosts.push(article._id);

//     await article.save();
//     await user.save();

//     res.json({
//       message: "Comment added",
//       comments: article.comments   // 👈 return updated comments
//     });

//   } catch (err) {
//     console.error("Error in comment route:", err);
//     res.status(500).json({ message: "Error commenting" });
//   }
// });



// // === DELETE COMMENT ===
// app.delete("/api/articles/:articleId/comments/:commentId", authMiddleware, async (req, res) => {
//   try {
//     const { articleId, commentId } = req.params;
//     const userId = req.user.id; // from JWT

//     const article = await Article.findById(articleId);
//     if (!article) return res.status(404).json({ message: "Article not found" });

//     const comment = article.comments.id(commentId);
//     if (!comment) return res.status(404).json({ message: "Comment not found" });

//     // ✅ Only allow comment owner to delete
//     if (comment.user.toString() !== userId) {
//       return res.status(403).json({ message: "Not authorized to delete this comment" });
//     }

//     // ✅ Fix: remove comment properly
//     comment.deleteOne(); // works in Mongoose 6+
//     // OR: article.comments.pull({ _id: commentId });

//     await article.save();

//     res.json({ comments: article.comments });
//   } catch (err) {
//     console.error("Error deleting comment:", err);
//     res.status(500).json({ message: "Error deleting comment" });
//   }
// });





// app.get("/api/users/:id/activity", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//       .populate("likedPosts", "title content")
//       .populate("commentedPosts", "title content");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({
//       likedPosts: user.likedPosts,
//       commentedPosts: user.commentedPosts
//     });
//   } catch (err) {
//     console.error("Error fetching activity:", err);
//     res.status(500).json({ message: "Error fetching activity" });
//   }
// });



// // Start server
// app.listen(PORT, '0.0.0.0', () => {
//   const nets = os.networkInterfaces();
//   let pretty = [];
//   Object.keys(nets).forEach(ifname => {
//     nets[ifname].forEach(net => {
//       if (net.family === 'IPv4' && !net.internal) {
//         pretty.push(`${ifname}: ${net.address}`);
//       }
//     });
//   });
//   console.log(`Server listening on port ${PORT}`);
//   if (pretty.length) console.log('Network addresses:', pretty.join(', '));
//   console.log('Use http://<your-ip>:' + PORT + ' from other devices on the same LAN');
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
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

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

// app.get("/api/auth/me", authMiddleware, async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json(user);
// });


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
// app.post("/api/articles", uploadArticleImage.single("image"), async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const imagePath = req.file ? `/uploads/articles/${req.file.filename}` : null;

//     const article = new Article({ title, content, image: imagePath });
//     await article.save();

//     res.status(201).json(article);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to upload article" });
//   }
// });



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


// app.get("/api/articles", async (req, res) => {
//   try {
//     const articles = await Article.find().sort({ createdAt: -1 });
//     res.json(articles);
//   } catch {
//     res.status(500).json({ error: "Failed to fetch articles" });
//   }
// });



// app.get("/api/articles", authMiddleware, async (req, res) => {
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


// 🔹 Open route for everyone (basic article data)
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// 🔹 Authenticated route for like-status
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


/* ------------------------------- START APP ------------------------------- */
app.listen(PORT, "0.0.0.0", () => {
  const nets = os.networkInterfaces();
  const addresses = [];
  Object.keys(nets).forEach((ifname) =>
    nets[ifname].forEach(
      (net) => net.family === "IPv4" && !net.internal && addresses.push(`${ifname}: ${net.address}`)
    )
  );
  console.log(`Server running on http://localhost:${PORT}`);
  if (addresses.length) console.log("LAN addresses:", addresses.join(", "));
});
