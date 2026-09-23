import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);

if (!MONGO_CONNECTION_STRING) {
  console.error("MONGO_CONNECTION_STRING is not defined in packages/express-backend/.env");
} else {
  mongoose
    .connect(`${MONGO_CONNECTION_STRING}users`)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((error) => console.log("Connection Error:", error));
}

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
        return;
      }

      res.send(user);
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).send("Error finding user.");
    });
});

app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => {
      console.error("Error adding user:", error);
      res.status(500).send("Error adding user.");
    });
});

app.delete("/users/:id", (req, res) => {
  userService
    .removeUser(req.params.id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
        return;
      }

      res.status(204).send();
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      res.status(500).send("Error deleting user.");
    });
});

app.get("/users", (req, res) => {
  userService
    .getUsers(req.query.name, req.query.job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => {
      console.error("Error getting users:", error);
      res.status(500).send("Error getting users.");
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
