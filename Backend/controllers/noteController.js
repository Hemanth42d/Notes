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

  if (!isPinned) {
    return res.status(400).json({ error: false, message: "No Update done" });
  }

  try {
    const newNote = await note.findOne({ _id: noteId, userId: req.user._id });

    if (!newNote)
      return res.status(404).json({ error: true, message: "No Note found.." });

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

module.exports.getUser = async (req, res) => {
  const user = req.user;

  const isUser = await user.findOne({ _id: req.user._id });

  if (!user)
    return res.status(400).json({
      error: true,
      message: "Not user Found",
    });

  return res.status(200).json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
    },
    message: "",
  });
};
