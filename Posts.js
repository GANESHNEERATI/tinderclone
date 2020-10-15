import express from "express";
import Cards from "./dbCards.js";
import auth from "./Middleware/Requiredlogin.js";

const router = express.Router();

router.post("/tinder/cards", auth, (req, res) => {
  const { name, pic } = req.body;
  console.log(name, pic);
  if (!name || !pic) {
    return res.status(400).send("name and pic is required");
  }

  console.log(req.user);
  req.user.password = undefined;
  const post = new Cards({
    name,
    imgUrl: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((error) => {
      res.send("error  while creating post");
    });
});

router.get("/tinder/cards", auth, (req, res) => {
  Cards.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      res.status(500).send("error while fetching posts");
    });
});

//creating a route for posts post by particular user

router.get("/tinder/mycards", auth, (req, res) => {
  Cards.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myposts) => {
      res.json({ myposts });
    })
    .catch((err) => {
      res.status(500).send("error while fetching posts");
    });
});

export default router;
