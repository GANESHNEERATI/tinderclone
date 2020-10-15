import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  imgUrl: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,

    ref: "userModel",
  },
});

export default mongoose.model("Cards", cardSchema);
