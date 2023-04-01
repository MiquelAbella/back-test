const { v4: uuidv4 } = require("uuid");
const Todo = require("../models/Todo");

const addTodo = async (req, res) => {
  const { todo } = req.body;
  const todoId = uuidv4();

  try {
    const todoToAdd = new Todo({
      todo,
      todoId,
    });

    await todoToAdd.save();

    return res.status(200).json({
      ok: true,
      todo: todoToAdd,
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({ ok: true, todos });
  } catch (error) {
    return res.status(503).json({ ok: false, msg: "Something happened" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const found = await Todo.deleteOne({ todoId: id });

    return res.status(200).json({
      ok: true,
      msg: "Deleted ok",
    });
  } catch (error) {
    res.status(503).json({ ok: false, msg: "Something happened" });
  }
};

const updatetodo = async (req, res) => {
  const { todoId, todo } = req.body;

  try {
    await Todo.findOneAndUpdate({
      todoId: todoId,
      todo: todo,
    });
    return res.status(200).json({
      ok: true,
      msg: "Updated ok",
    });
  } catch (error) {
    res.status(503).json({ ok: false, msg: "Something happened" });
  }
};

module.exports = { addTodo, getTodos, deleteTodo, updatetodo };
