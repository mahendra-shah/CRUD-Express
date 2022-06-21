const express = require("express"); // npm i express
const app = express();
const knex = require("./config/db");

app.use(express.json());

// home page
app.get("/", (req, res) => {
  res.send('<h1 style="text-align: center;">Welcom my friend Welcom</h1>');
});

// sinup
app.post("/sinup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name && !email && !password) {
      return res.send("fill all the fields");
    }
    const user = await knex("Test").where({ email: req.body.email });
    if (user.length == 0) {
      await knex("Test").insert(req.body);
      return res.send("Data Inserted");
    }
    res.send("User already exists");
  } catch (error) {
    res.send(error.message);
  }
});

//login
app.get("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.send("please enter data");
  }
  const msg = await knex("Test").where({
    email: req.body.email,
    password: req.body.password,
  });
  if (msg.length == 0) {
    return res.send("something went wrong ");
  }
  res.send("logged in successfully");
});

//delete
app.delete("/delete", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.send("please enter data");
  }
  await knex("Test").where({ email, password }).del();
  res.send("deleted successfully");
});

// update
app.patch("/update/:id", async (req, res) => {
  const email = req.body;
  const id = req.params.id;
  if (!email) {
    return res.send("please enter a email");
  }
  await knex("Test").where({ id }).update({ email });
  res.send("Email updated successfully");
});

app.listen(5000, () => {
  console.log("Conncted");
});
