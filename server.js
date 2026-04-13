const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 핵심 API
app.post("/check", (req, res) => {
  let text = req.body.text;

  text = text
    .replace(/안되/g, "안 돼")
    .replace(/않되/g, "안 돼")
    .replace(/됬/g, "됐")
    .replace(/몇일/g, "며칠")
    .replace(/되요/g, "돼요")
    .replace(/좋다 그래서/g, "좋아서");

  res.json({ corrected: text });
});

// 🔥 포트 설정 (Render용)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("서버 실행됨", PORT);
});
