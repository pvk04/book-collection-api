import express from "express";
import { json } from "body-parser";
import { config } from "dotenv";
config();

const app = express();
app.use(json());

app.listen(3001, () => {
	console.log(`Server started at port: ${3001}`);
});
