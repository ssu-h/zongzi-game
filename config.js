// ==========================================
// 💡 題目資料庫 (已更新第二關價格)
// ==========================================

const stage2Questions = [
  { id: 1, name: "【老協珍】鮑魚干貝粽 (2入)", options: ["NT$ 899", "NT$ 999", "NT$ 1099"], ans: 1, img: "https://d3san4pg9xqi43.cloudfront.net/images/f6fcffa6-764c-4daf-8558-d2bf0a37319c.jpg" },
  { id: 2, name: "【星巴克】粽夏時光禮盒 (8入)", options: ["NT$ 500", "NT$ 600", "NT$ 700"], ans: 1, img: "https://www.starbucks.com.tw/common/objects/images/cake/2026040216390598_62.jpg" },
  { id: 3, name: "【新東陽】多穀養生素粽 (全素 5入)", options: ["NT$ 350", "NT$ 450", "NT$ 550"], ans: 1, img: "https://img.91app.com/webapi/imagesV3/Original/SalePage/11709655/0/639168580315900000?v=1" },
  { id: 4, name: "【鼎泰豐】湖州鮮肉粽禮盒 (5入)", options: ["NT$ 450", "NT$ 550", "NT$ 650"], ans: 1, img: "https://www.dintaifung.com.tw/upload/product/20240417101736932.jpg" },
  { id: 5, name: "【黑橋牌】府城廟口粽禮盒 (8入)", options: ["NT$ 730", "NT$ 830", "NT$ 930"], ans: 1, img: "https://cdn-general.cybassets.com/media/W1siZiIsIjMyNTgwL3Byb2R1Y3RzLzU0ODUxNjUyLzE3NzY5MjMxMzBfZWNlZTJmZTE1YzRhYzI0MDJhOTMuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=c91ea374e76e6cc1" }
];

const stage3Questions = [
  { q: "端午節是農曆的哪一天？", options: ["五月初五", "五月十五", "六月初五"], ans: 0 },
  { q: "「屈原」是歷史上哪一個時期的人？", options: ["秦朝", "戰國時期", "漢朝"], ans: 1 },
  { q: "端午節喝雄黃酒、掛艾草主要是為了？", options: ["求發財", "驅邪避毒", "慶祝豐收"], ans: 1 },
  { q: "一般來說，哪一種粽子在製作時會先把米炒熟？", options: ["北部粽", "南部粽", "鹼粽"], ans: 0 },
  { q: "傳統上，端午節當天中午流行玩什麼活動？", options: ["放天燈", "立蛋", "猜燈謎"], ans: 1 },
  { q: "屈原投江的地方是哪一條江？", options: ["長江", "汨羅江", "黃河"], ans: 1 },
  { q: "劃龍舟的傳統最初是為了做什麼？", options: ["打撈屈原的遺體", "好玩比賽", "載貨運河"], ans: 0 },
  { q: "包肉粽常用的「鹹蛋黃」通常是用什麼蛋做的？", options: ["雞蛋", "鴨蛋", "鵪鶉蛋"], ans: 1 },
  { q: "鹼粽沾上什麼東西是台灣傳統常見的吃法？", options: ["醬油膏", "砂糖或蜂蜜", "辣椒醬"], ans: 1 },
  { q: "下列哪一個不是端午節的別稱？", options: ["端陽節", "重五節", "中元節"], ans: 2 }
];

// 核心邏輯保持不變...
let pName = ""; let s1Score = 0; let s2Score = 0; let s3CorrectCount = 0; let userTotalScore = 0; let currentStageNum = 1; let s2CurrentIdx = 0; let s3CurrentIdx = 0; let isAllowClick = true; 

function showScreen(id) { ['start-screen', 'game-stage1', 'leaderboard-screen', 'game-stage2', 'game-stage3', 'result-screen'].forEach(s => { document.getElementById(s).classList.add('hide'); }); document.getElementById(id).classList.remove('hide'); }
function startGame() { const input = document.getElementById('player-name').value.trim(); if(!input) return alert('請輸入您的姓名才能開始比賽！'); pName = input; showScreen('game-stage1'); initStage1(); }

// ... (後續函數邏輯與前次一致，請維持您原本檔案中的函數內容)
