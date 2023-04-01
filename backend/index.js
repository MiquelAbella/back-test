const express = require("express");
const { addTodo, getTodos, deleteTodo, updatetodo } = require("./controllers/todos");
const { dbConnection } = require("./database/config");
const cors = require("cors");

const app = express();

app.use(cors());

require("dotenv").config();

dbConnection();

app.use(express.json());

app.post("/addtodo", addTodo);
app.get("/gettodos", getTodos);
app.delete("/deletetodo/:id", deleteTodo);
app.put("/updatetodo", updatetodo);

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`);
});
