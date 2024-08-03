import express from "express";
import { json } from "body-parser";
import { config } from "dotenv";
config();
import { appRouter } from "./routes";
import { checkEnvVariables } from "./utils/checkEnvVariables";

const app = express();
app.use(json());
app.use(appRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	checkEnvVariables();
	console.log(`Server started at port: ${PORT}`);
});
