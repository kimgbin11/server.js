const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 요청 제한
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60
});
app.use(limiter);

// 🔥 기본 페이지 (추가됨 - 상태 확인용)
app.get("/", (req, res) => {
  res.send("Typing Fixer Server Running");
});

// 🔥 API
app.post("/check", (req, res) => {

  let text = req.body.text;

  console.log("입력:", text);

  // 🔥 기존 + 확장된 교정 규칙 (늘림)
  text = text
    .replace(/안되/g, "안 돼")
    .replace(/않되/g, "안 돼")
    .replace(/됬/g, "됐")
    .replace(/몇일/g, "며칠")
    .replace(/되요/g, "돼요")
    .replace(/왠지/g, "왠지") // 유지
    .replace(/웬지/g, "왠지")
    .replace(/할께/g, "할게")
    .replace(/할께요/g, "할게요")
    .replace(/좋다 그래서/g, "좋아서")
    .replace(/이따가/g, "이따가") // 유지
    .replace(/있다가/g, "이따가")
    .replace(/되서/g, "돼서")
    .replace(/안돼요/g, "안 돼요")
    .replace(/안되요/g, "안 돼요");

  console.log("결과:", text);

  res.json({ corrected: text });
});

// 🔥 서버 실행
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("서버 실행됨:", PORT);
});
