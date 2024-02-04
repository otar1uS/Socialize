import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  savedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  likedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  chats: {
    type: [ChatSchema],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
