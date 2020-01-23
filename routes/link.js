const { Router } = require("express");
const Link = require("../models/Link");
const auth = require("../middleware/authMiddleware");
const config = require("config");
const shortid = require("shortid");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate()

    const existing = await Link.findOne({from})

    if (existing) {
      return res.json({link: existing})
    }

    const to = baseUrl + '/t/' + code 

    const link = new Link({from,
      code, to, owner: req.user.userId
    })

    await link.save()

    res.status(201).json({link})
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
