const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Video = require("../models/Video");
const Article = require("../models/Article");
const Message = require("../models/Message");
const Room = require("../models/Room");

/* ================= ADMIN AUTH ================= */
const adminAuth = (req, res, next) => {
  if (req.headers["x-admin-password"] !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

/* ================= DASHBOARD ================= */
router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    /* ---------- TOTAL KPIs ---------- */
    const [
      totalUsers,
      totalVideos,
      totalArticles,
      totalRooms,
      totalMessages
    ] = await Promise.all([
      User.countDocuments(),
      Video.countDocuments(),
      Article.countDocuments(),
      Room.countDocuments(),
      Message.countDocuments()
    ]);

    const totalDownloadsAgg = await Video.aggregate([
      { $group: { _id: null, total: { $sum: "$downloadCount" } } }
    ]);

    /* ---------- VIDEO DOWNLOADS ---------- */
    const videoDownloads = await Video.aggregate([
      { $project: { title: 1, downloadCount: 1 } },
      { $sort: { downloadCount: -1 } }
    ]);

    /* ---------- ARTICLE LIKES ---------- */
    const articleLikes = await Article.aggregate([
      { $project: { title: 1, likes: { $size: "$likes" } } },
      { $sort: { likes: -1 } }
    ]);

    /* ---------- ARTICLE COMMENTS ---------- */
    const articleComments = await Article.aggregate([
      { $project: { title: 1, comments: { $size: "$comments" } } },
      { $sort: { comments: -1 } }
    ]);

    /* ---------- MESSAGES PER ROOM ---------- */
    const roomMessageAgg = await Message.aggregate([
      {
        $addFields: {
          roomObjectId: {
            $convert: {
              input: "$roomId",
              to: "objectId",
              onError: null,
              onNull: null
            }
          }
        }
      },
      { $match: { roomObjectId: { $ne: null } } },
      {
        $group: {
          _id: "$roomObjectId",
          messages: { $sum: 1 }
        }
      }
    ]);

    const rooms = await Room.find({}, { title: 1 });
    const roomMap = {};
    rooms.forEach(r => {
      roomMap[r._id.toString()] = r.title;
    });

    const roomAnalytics = roomMessageAgg.map(r => ({
      room: roomMap[r._id.toString()] || "Unknown",
      messages: r.messages
    }));

    res.json({
      totals: {
        totalUsers,
        totalVideos,
        totalArticles,
        totalRooms,
        totalMessages,
        totalDownloads: totalDownloadsAgg[0]?.total || 0
      },
      videoDownloads,
      articleLikes,
      articleComments,
      roomAnalytics
    });

  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ message: "Analytics error" });
  }
});

/* ================= CSV EXPORT ================= */
router.get("/export", adminAuth, async (req, res) => {
  try {
    const videos = await Video.find({}, { title: 1, downloadCount: 1 });
    const articles = await Article.find({}, { title: 1, likes: 1, comments: 1 });

    const messages = await Message.aggregate([
      {
        $addFields: {
          roomObjectId: {
            $convert: {
              input: "$roomId",
              to: "objectId",
              onError: null,
              onNull: null
            }
          }
        }
      },
      { $match: { roomObjectId: { $ne: null } } },
      {
        $group: {
          _id: "$roomObjectId",
          messages: { $sum: 1 }
        }
      }
    ]);

    const rooms = await Room.find({}, { title: 1 });
    const roomMap = {};
    rooms.forEach(r => (roomMap[r._id.toString()] = r.title));

    let csv = "";

    csv += "VIDEO DOWNLOADS\nVideo Title,Downloads\n";
    videos.forEach(v => {
      csv += `"${v.title}",${v.downloadCount}\n`;
    });

    csv += "\nARTICLE LIKES\nArticle Title,Likes\n";
    articles.forEach(a => {
      csv += `"${a.title}",${a.likes.length}\n`;
    });

    csv += "\nARTICLE COMMENTS\nArticle Title,Comments\n";
    articles.forEach(a => {
      csv += `"${a.title}",${a.comments.length}\n`;
    });

    csv += "\nMESSAGES PER ROOM\nRoom Name,Messages\n";
    messages.forEach(m => {
      csv += `"${roomMap[m._id.toString()] || "Unknown"}",${m.messages}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("admin_analytics.csv");
    res.send(csv);

  } catch (err) {
    console.error("CSV Export Error:", err);
    res.status(500).json({ message: "CSV export failed" });
  }
});

module.exports = router;
