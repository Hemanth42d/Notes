const userModel = require("../models/user.model");
const note = require("../models/note.model");

module.exports.createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: true, message: "Title and content are required" });
  }

  try {
    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const newnote = new note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await newnote.save();

    return res.json({
      error: false,
      note: newnote,
      message: "Note added successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.editNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;

  if (!title && !content && !tags) {
    return res.status(400).json({ error: false, message: "No Update done" });
  }

  try {
    const newNote = await note.findOne({ _id: noteId, userId: req.user._id });

    if (!newNote)
      return res.status(404).json({ error: true, message: "No Note found.." });

    if (title) newNote.title = title;
    if (content) newNote.content = content;
    if (tags) newNote.tags = tags;
    if (isPinned) newNote.isPinned = isPinned;

    await newNote.save();

    return res.status(200).json({
      error: false,
      newNote,
      message: "Note Updated Succesfully",
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.getAllNotes = async (req, res) => {
  try {
    const notes = await note
      .find({ userId: req.user._id })
      .sort({ isPinned: -1 });

    return res.status(200).json({
      error: false,
      notes,
      message: "All Notes Extracted Successfully",
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.deleteNote = async (req, res) => {
  const noteId = req.params.noteId;

  try {
    const newNote = await note.findOne({ _id: noteId, userId: req.user._id });

    if (!newNote)
      return res.status(404).json({ error: true, message: "No Note found.." });

    await newNote.deleteOne({ _id: noteId, userId: req.user._id });

    return res.status(200).json({
      error: false,
      newNote,
      message: "Note deleted Succesfully",
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.updateNotePinned = async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;

  if (isPinned === undefined) {
    return res.status(400).json({ error: false, message: "No Update done" });
  }

  try {
    const newNote = await note.findOne({ _id: noteId, userId: req.user._id });

    if (!newNote)
      return res.status(404).json({ error: true, message: "No Note found.." });

    newNote.isPinned = isPinned;

    await newNote.save();

    return res.status(200).json({
      error: false,
      newNote,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }

    const isUser = await userModel.findById(user._id);

    if (!isUser) {
      return res.status(400).json({
        error: true,
        message: "No user Found",
      });
    }

    return res.status(200).json({
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
      },
      message: "",
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports.searchNote = async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "search query is required " });
  }
  try {
    const matchingNote = await note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.json({
      error: false,
      notes: matchingNote,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
