const { Schema, model } = require("mongoose");

const TodoSchema = Schema({
  todo: {
    type: String,
    required: true,
  },
  todoId: {
    type: String,
    required: true,
  },
});

module.exports = model("Todo", TodoSchema);
