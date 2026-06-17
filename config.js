const stage2Questions = [
  { name: "【鼎泰豐】湖州鮮肉粽禮盒 (5入)", options: ["NT$ 350", "NT$ 550", "NT$ 750"], ans: 1, img: "dintaifung.jpeg" },
  { name: "【黑橋牌】府城廟口粽禮盒 (8入)", options: ["NT$ 630", "NT$ 830", "NT$ 1030"], ans: 1, img: "heiqiao.jpg" },
  { name: "【老協珍】鮑魚干貝粽 (2入)", options: ["NT$ 799", "NT$ 999", "NT$ 1199"], ans: 1, img: "laoxiezhen.jpg" },
  { name: "【星巴克】粽夏時光禮盒 (8入)", options: ["NT$ 400", "NT$ 600", "NT$ 800"], ans: 1, img: "starbucks.jpg" },
  { name: "【新東陽】多穀養生素粽 (全素 5入)", options: ["NT$ 350", "NT$ 450", "NT$ 550"], ans: 1, img: "xindongyang.jpeg" }
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

let pName = "", s1Score = 0, s2Score = 0, s3CorrectCount = 0, userTotalScore = 0, currentStageNum = 1;
let s2CurrentIdx = 0, s3CurrentIdx = 0, isAllowClick = true, s1Timer = 40, s3Timer = 50; 

function startGame() {
  pName = document.getElementById('player-name').value.trim();
  if(!pName) return alert('請輸入姓名！');
  showScreen('game-stage1'); initStage1();
}

// ... 其餘核心邏輯保持不變 ...
// (因字數限制，請確保之前提供的遊戲核心邏輯 function 保持在下方)
