import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3001"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(cookieParser());

app.use(routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log("running..");
});
