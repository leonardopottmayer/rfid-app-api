import express, { Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import User from "./User";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.post("/rfid", async (req: Request, res: Response) => {
  const { rfid, name, username } = req.body;

  if (!rfid || rfid.length < 10) {
    return res.status(400).json({ message: "Invalid rfid!" });
  } else if (!name || name.length < 5) {
    return res.status(400).json({ message: "Invalid name!" });
  } else if (!username || username.length < 5) {
    return res.status(400).json({ message: "Invalid username!" });
  }

  const userAlreadyExists = await User.findOne({ rfid });
  if (userAlreadyExists)
    return res.status(400).json({ message: "RFID already registered!" });

  try {
    const user = new User({
      name,
      username,
      rfid,
    });

    const createdUser = await user.save();

    return res
      .status(201)
      .json({ message: "Successfully created user!", user: createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

app.get("/rfid/:rfid", async (req: Request, res: Response) => {
  const { rfid } = req.params;

  if (!rfid || rfid.length < 10) {
    return res.status(400).json({ message: "Invalid rfid!" });
  }

  try {
    const user = await User.findOne({ rfid });

    return res
      .status(200)
      .json({ message: "Successfully queried user!", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

export default app;
