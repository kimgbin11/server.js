const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/check", (req, res) => {
  let text = req.body.text;

  // 🔥 안전한 규칙 (문장 안 자름)
  text = text

    // 기본
    .replace(/안되/g, "안 돼")
    .replace(/않되/g, "안 돼")
    .replace(/됬/g, "됐")
    .replace(/몇일/g, "며칠")
    .replace(/되요/g, "돼요")

    // 띄어쓰기
    .replace(/할수/g, "할 수")
    .replace(/될수/g, "될 수")
    .replace(/있을수/g, "있을 수")
    .replace(/없을수/g, "없을 수")

    // 표현
    .replace(/할께/g, "할게")
    .replace(/할께요/g, "할게요")
    .replace(/할려고/g, "하려고")

    // 구어체
    .replace(/그니깐/g, "그러니까")
    .replace(/그러니깐/g, "그러니까")

    // 🔥 핵심: 문장 연결 자연스럽게 (앞부분만 수정)
    .replace(/좋다 그래서/g, "좋아서")
    .replace(/했다 그래서/g, "해서")
    .replace(/먹었다 그래서/g, "먹어서")

    // 🔥 안전한 띄어쓰기 패턴
    .replace(/(\S)같다/g, "$1 같다")
    .replace(/(\S)싶다/g, "$1 싶다")
    .replace(/(\S)보다/g, "$1보다");

  res.json({ corrected: text });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("무료 교정 서버 실행됨 🚀", PORT);
});
