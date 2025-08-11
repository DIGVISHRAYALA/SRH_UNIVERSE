// // server.js
// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const mongoose = require('mongoose');
// const Video = require('./models/Video');

// const app = express();
// const PORT = 5000;

// // === Middlewares ===
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // === Connect to MongoDB ===
// mongoose.connect('mongodb://127.0.0.1:27017/srh_universe', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch((err) => console.error("❌ MongoDB connection failed", err));

// // === Multer storage setup ===
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.join(__dirname, 'uploads');
//     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage: storage });

// // === POST /upload - Upload a video ===
// app.post('/upload', upload.single('video'), (req, res) => {
//   const { title } = req.body;
//   const file = req.file;

//   if (!file) return res.status(400).json({ message: 'No file uploaded' });

//   const newVideo = new Video({
//     title,
//     filename: file.filename,
//     path: `/uploads/${file.filename}`,
//   });

//   newVideo.save()
//     .then((savedVideo) => {
//       console.log("✅ Video metadata saved to MongoDB:", savedVideo);
//       res.status(200).json({ message: 'Uploaded successfully!', video: savedVideo });
//     })
//     .catch((err) => {
//       console.error('❌ Error saving to DB:', err);
//       res.status(500).json({ message: 'Failed to save video' });
//     });
// });

// // === GET /videos - Get all uploaded videos ===
// app.get('/videos', async (req, res) => {
//   try {
//     const allVideos = await Video.find().sort({ uploadedAt: -1 }); // Latest first
//     res.status(200).json(allVideos);
//   } catch (err) {
//     console.error('❌ Error fetching videos:', err);
//     res.status(500).json({ message: 'Failed to fetch videos' });
//   }
// });

// // === Start Server ===
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

// server.js
// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Video = require('./models/Video');
// const Article = require('./models/Article');

// // Load .env
// dotenv.config();

// const app = express();
// const PORT = 5000;

// // === Middleware ===
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // === MongoDB Connection ===
// mongoose.connect('mongodb://127.0.0.1:27017/srh_universe', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.error("MongoDB connection failed", err));

// // === Multer Setup ===
// const storage = multer.diskStorage({
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
// const upload = multer({ storage });

// // === POST /upload ===
// app.post('/upload', upload.single('video'), (req, res) => {
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

// // === GET /videos ===
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

//     // Increment download count
//     video.downloadCount += 1;
//     await video.save();

//     res.download(path.join(__dirname, video.path));
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// // === DELETE /videos/:id (Admin Only) ===
// app.delete('/videos/:id', async (req, res) => {
//   const adminPassword = req.headers['x-admin-password']; // Custom header

//   if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
//     return res.status(401).json({ message: 'Unauthorized access' });
//   }

//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: 'Video not found' });

//     // Delete file from disk
//     const filePath = path.join(__dirname, video.path);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//     // Delete from DB
//     await Video.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Video deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting video:', err);
//     res.status(500).json({ message: 'Failed to delete video' });
//   }
// });

// // Create Article
// app.post('/api/articles', async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const article = new Article({ title, content });
//     await article.save();
//     res.status(201).json(article);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to upload article' });
//   }
// });

// // Get Articles (latest first)
// app.get('/api/articles', async (req, res) => {
//   try {
//     const articles = await Article.find().sort({ createdAt: -1 });
//     res.json(articles);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch articles' });
//   }
// });

// // Delete Article
// app.delete('/api/articles/:id', async (req, res) => {
//   try {
//     await Article.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete article' });
//   }
// });

// // PUT: Edit article
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
//     res.status(500).json({ error: 'Failed to edit article' });
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
//     res.status(500).json({ message: 'Failed to update video' });
//   }
// });


// // === Start Server ===
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });







// // server.js
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

// // Load .env
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/srh_universe';

// // === Middleware ===
// // For dev: allow all origins. In production restrict origins.
// app.use(cors());
// app.use(express.json());
// // serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // === MongoDB Connection ===
// mongoose.connect(MONGO_URL, {
//   // since newer drivers ignore the options you had, we can pass none or leave as is
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.error("MongoDB connection failed", err));

// // === Multer Setup ===
// const storage = multer.diskStorage({
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
// const upload = multer({ storage });

// // === POST /upload ===
// app.post('/upload', upload.single('video'), (req, res) => {
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

// // === GET /videos ===
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

//     // Increment download count
//     video.downloadCount = (video.downloadCount || 0) + 1;
//     await video.save();

//     res.download(path.join(__dirname, video.path));
//   } catch (err) {
//     console.error('Download error:', err);
//     res.status(500).send('Server error');
//   }
// });

// // === DELETE /videos/:id (Admin Only) ===
// app.delete('/videos/:id', async (req, res) => {
//   const adminPassword = req.headers['x-admin-password']; // Custom header

//   if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
//     return res.status(401).json({ message: 'Unauthorized access' });
//   }

//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: 'Video not found' });

//     // Delete file from disk
//     const filePath = path.join(__dirname, video.path);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//     // Delete from DB
//     await Video.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Video deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting video:', err);
//     res.status(500).json({ message: 'Failed to delete video' });
//   }
// });

// // Create Article
// app.post('/api/articles', async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const article = new Article({ title, content });
//     await article.save();
//     res.status(201).json(article);
//   } catch (err) {
//     console.error('Error creating article:', err);
//     res.status(500).json({ error: 'Failed to upload article' });
//   }
// });

// // Get Articles (latest first)
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

// // PUT: Edit article
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

// // === Start Server ===
// app.listen(PORT, '0.0.0.0', () => {
//   // print helpful info so you can connect from mobile
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







const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const os = require('os');
const Video = require('./models/Video');
const Article = require('./models/Article');

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/srh_universe';

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed", err));

// === Multer storage for videos ===
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const uploadVideo = multer({ storage: videoStorage });

// === Multer storage for article images ===
const articleImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagePath = path.join(__dirname, 'uploads', 'articles');
    if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });
    cb(null, 'uploads/articles/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const uploadArticleImage = multer({ storage: articleImageStorage });

// === VIDEO ROUTES ===
app.post('/upload', uploadVideo.single('video'), (req, res) => {
  const { title } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  const newVideo = new Video({
    title,
    filename: file.filename,
    path: `/uploads/${file.filename}`,
  });

  newVideo.save()
    .then(savedVideo => {
      console.log("Video metadata saved to MongoDB:", savedVideo);
      res.status(200).json({ message: 'Uploaded successfully!', video: savedVideo });
    })
    .catch(err => {
      console.error('Error saving to DB:', err);
      res.status(500).json({ message: 'Failed to save video' });
    });
});

app.get('/videos', async (req, res) => {
  try {
    const allVideos = await Video.find().sort({ uploadedAt: -1 });
    res.status(200).json(allVideos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});

app.get('/videos/:id/download', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send('Video not found');

    video.downloadCount = (video.downloadCount || 0) + 1;
    await video.save();

    res.download(path.join(__dirname, video.path));
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).send('Server error');
  }
});

app.delete('/videos/:id', async (req, res) => {
  const adminPassword = req.headers['x-admin-password'];
  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const filePath = path.join(__dirname, video.path);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).json({ message: 'Failed to delete video' });
  }
});

app.put('/videos/:id', async (req, res) => {
  try {
    const { title } = req.body;
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { title, lastEditedAt: new Date() },
      { new: true }
    );
    res.json(video);
  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).json({ message: 'Failed to update video' });
  }
});

// === ARTICLE ROUTES ===

// Create Article (with optional image)
app.post('/api/articles', uploadArticleImage.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file ? `/uploads/articles/${req.file.filename}` : null;

    const article = new Article({ title, content, image: imagePath });
    await article.save();

    res.status(201).json(article);
  } catch (err) {
    console.error('Error creating article:', err);
    res.status(500).json({ error: 'Failed to upload article' });
  }
});

// Get Articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error('Error fetching articles:', err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Delete Article
app.delete('/api/articles/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// Edit Article
app.put('/api/articles/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(article);
  } catch (err) {
    console.error('Error editing article:', err);
    res.status(500).json({ error: 'Failed to edit article' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  const nets = os.networkInterfaces();
  let pretty = [];
  Object.keys(nets).forEach(ifname => {
    nets[ifname].forEach(net => {
      if (net.family === 'IPv4' && !net.internal) {
        pretty.push(`${ifname}: ${net.address}`);
      }
    });
  });
  console.log(`Server listening on port ${PORT}`);
  if (pretty.length) console.log('Network addresses:', pretty.join(', '));
  console.log('Use http://<your-ip>:' + PORT + ' from other devices on the same LAN');
});
