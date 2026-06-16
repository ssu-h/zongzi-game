// 關卡二：粽子估價王資料庫
const stage2Questions = [
  { id: 1, name: "【老協珍】鮑魚干貝粽", options: ["799", "999", "1199"], ans: 1, img: "laoxiezhen.jpg" },
  { id: 2, name: "【星巴克】粽夏時光禮盒", options: ["520", "600", "720"], ans: 1, img: "starbucks.jpg" },
  { id: 3, name: "【新東陽】多穀養生素粽", options: ["350", "450", "550"], ans: 1, img: "xindongyang.jpeg" },
  { id: 4, name: "【鼎泰豐】湖州鮮肉粽禮盒", options: ["450", "550", "650"], ans: 1, img: "dintaifung.jpeg" },
  { id: 5, name: "【黑橋牌】府城廟口粽禮盒", options: ["730", "830", "930"], ans: 1, img: "heiqiao.jpg" }
];

// 關卡三：趣味問答題庫
const stage3Questions = [
  { q: "端午節是農曆的哪一天？", options: ["五月初五", "五月十五", "六月初五"], ans: 0 },
  { q: "「屈原」是歷史上哪一個時期的人？", options: ["秦朝", "戰國時期", "漢朝"], ans: 1 },
  { q: "端午節喝雄黃酒、掛艾草主要是為了？", options: ["求發財", "驅邪避毒", "慶祝豐收"], ans: 1 },
  { q: "一般來說，哪一種粽子在製作時會先把米炒熟？", options: ["北部粽", "南部粽", "鹼粽"], ans: 0 },
  { q: "傳統上，端午節當天中午流行玩什麼活動？", options: ["放天燈", "立蛋", "猜燈謎"], ans: 1 }
];

// 遊戲邏輯核心
let pName = "";
let currentStage = 1;

function startGame() {
  const input = document.getElementById('player-name').value.trim();
  if(!input) { alert('請輸入大俠姓名！'); return; }
  pName = input;
  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('game-stage2').classList.remove('hide');
  initStage2();
}

function initStage2() {
  const q = stage2Questions[0]; // 示範：顯示第一題
  document.getElementById('stage2-name').innerText = q.name;
  document.getElementById('stage2-img').src = q.img;
  
  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `<button class="start-btn" style="margin-bottom:10px" onclick="alert('選擇了：'+${idx})">${opt}</button>`;
  });
  document.getElementById('stage2-options').innerHTML = optionsHtml;
}
