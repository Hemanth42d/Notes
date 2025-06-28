const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const {
  createNote,
  editNote,
  getAllNotes,
  deleteNote,
  updateNotePinned,
  getUser,
} = require("../controllers/noteController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/signUp", registerUser);
router.post("/login", loginUser);
router.post("/logout", isLoggedIn, logoutUser);

router.get("/get-user", isLoggedIn, getUser);
router.get("/all-notes", isLoggedIn, getAllNotes);
router.post("/add-note", isLoggedIn, createNote);
router.put("/edit-note/:noteId", isLoggedIn, editNote);
router.delete("/delete-note/:noteId", isLoggedIn, deleteNote);
router.put("/update-note-pinned/:noteId", isLoggedIn, updateNotePinned);

module.exports = router;
