import express from "express";
import { json } from "body-parser";
import { config } from "dotenv";
config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server started at port: ${PORT}`);
});
