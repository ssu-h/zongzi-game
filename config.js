// 圖片檔名對應清單: dintaifung.jpeg, heiqiao.jpg, laoxiezhen.jpg, starbucks.jpg
const stage2Questions = [
  { id: 1, name: "【義美】經典台灣北部粽", options: ["NT$ 395", "NT$ 495", "NT$ 595"], ans: 0, img: "dintaifung.jpeg" },
  { id: 2, name: "【星巴克】粽夏時光禮盒", options: ["NT$ 520", "NT$ 720", "NT$ 920"], ans: 1, img: "starbucks.jpg" },
  { id: 3, name: "【黑橋牌】府城廟口粽禮盒", options: ["NT$ 780", "NT$ 980", "NT$ 1180"], ans: 1, img: "heiqiao.jpg" },
  { id: 4, name: "【新東陽】多穀養生素粽", options: ["NT$ 350", "NT$ 450", "NT$ 550"], ans: 1, img: "dintaifung.jpeg" },
  { id: 5, name: "【老協珍】鮑魚干貝粽", options: ["NT$ 799", "NT$ 999", "NT$ 1199"], ans: 1, img: "laoxiezhen.jpg" }
];

const stage3Questions = [
  { q: "端午節是農曆的哪一天？", options: ["五月初五", "五月十五", "六月初五"], ans: 0 },
  { q: "「屈原」是歷史上哪一個時期的人？", options: ["秦朝", "戰國時期", "漢朝"], ans: 1 },
  { q: "端午節掛艾草主要是為了？", options: ["求發財", "驅邪避毒", "慶祝豐收"], ans: 1 },
  { q: "哪一種粽子製作時會先把米炒熟？", options: ["北部粽", "南部粽", "鹼粽"], ans: 0 },
  { q: "傳統端午節流行玩什麼活動？", options: ["放天燈", "立蛋", "猜燈謎"], ans: 1 },
  { q: "屈原投江的是哪一條江？", options: ["長江", "汨羅江", "黃河"], ans: 1 },
  { q: "劃龍舟最初是為了？", options: ["打撈屈原", "好玩比賽", "載貨運河"], ans: 0 },
  { q: "肉粽常用鹹蛋黃是？", options: ["雞蛋", "鴨蛋", "鵪鶉蛋"], ans: 1 },
  { q: "鹼粽沾什麼是常見吃法？", options: ["醬油膏", "砂糖或蜂蜜", "辣椒醬"], ans: 1 },
  { q: "下列哪一個不是端午節別稱？", options: ["端陽節", "重五節", "中元節"], ans: 2 }
];

let pName = "", userTotalScore = 0, currentStageNum = 1, s1Score = 0, s2Score = 0, s3CorrectCount = 0, s2CurrentIdx = 0, s3CurrentIdx = 0, isAllowClick = true;

// 更新排行榜：僅顯示挑戰者本人
function showLeaderboardPage(titleText) {
  document.getElementById('leaderboard-title').innerText = titleText;
  document.getElementById('current-user-total').innerText = userTotalScore;
  document.getElementById('stage-rank-list').innerHTML = `<div class='rank-item' style='background:#e3f2fd; font-weight:bold;'><span>🥇 ${pName}</span><span>${userTotalScore} 分</span></div>`;
  const nextBtn = document.getElementById('next-stage-btn');
  if(currentStageNum === 1) nextBtn.innerText = "進入第二關：粽子估價王 💰";
  else if(currentStageNum === 2) nextBtn.innerText = "進入第三關：端午趣味答題 🧠";
  showScreen('leaderboard-screen');
}

// (其餘函式維持不變)
// [請將前次提供的完整程式碼邏輯貼入此處即可運作]
