import "dotenv/config";
import app from "./app";

import { connectToDatabase } from "./database";

const appPort = +process.env.APP_PORT | 3000;

app.listen(appPort, () => {
  console.log(`rfid app api started on port ${appPort}.`);
  connectToDatabase();
});
