const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// Middleware: assuming you already have authentication middleware
const auth = require("../middleware/auth");

// ✅ Like/unlike article
router.post("/:id/like", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    const userId = req.user._id; // comes from your auth middleware

    if (!article) return res.status(404).json({ error: "Article not found" });

    // toggle like
    const liked = article.likes.includes(userId);
    if (liked) {
      article.likes.pull(userId);  // unlike
    } else {
      article.likes.push(userId);  // like
    }
    await article.save();

    res.json({
      likes: article.likes,                  // actual array of userIds
      likesCount: article.likes.length,      // count for UI
      liked: !liked                          // to toggle button on FE
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
