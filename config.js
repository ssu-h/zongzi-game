// ==========================================
// 💡 題目資料庫
// ==========================================

// 關卡二：使用你 GitHub 的圖片檔名
const stage2Questions = [
  { id: 1, name: "鼎泰豐肉粽", options: ["NT$ 120", "NT$ 180", "NT$ 250"], ans: 0, img: "dintaifung.jpeg" },
  { id: 2, name: "黑橋牌肉粽", options: ["NT$ 95", "NT$ 150", "NT$ 220"], ans: 0, img: "heiqiao.jpg" },
  { id: 3, name: "老協珍端午粽", options: ["NT$ 150", "NT$ 280", "NT$ 400"], ans: 0, img: "laoxiezhen.jpg" },
  { id: 4, name: "星巴克星冰粽", options: ["NT$ 85", "NT$ 160", "NT$ 250"], ans: 0, img: "starbucks.jpg" },
  { id: 5, name: "新東陽多穀養生素粽", options: ["NT$ 90", "NT$ 180", "NT$ 300"], ans: 0, img: "xindongyang.jpeg" }
];

// 關卡三：趣味問答題庫
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

// ==========================================
// 🎮 遊戲核心邏輯
// ==========================================
let pName = "";
let s1Score = 0; 
let s2Score = 0; 
let s3CorrectCount = 0;
let userTotalScore = 0; 
let currentStageNum = 1;

let s2CurrentIdx = 0;
let s3CurrentIdx = 0;
let isAllowClick = true; 

function showScreen(id) {
  ['start-screen', 'game-stage1', 'leaderboard-screen', 'game-stage2', 'game-stage3', 'result-screen'].forEach(s => {
    document.getElementById(s).classList.add('hide');
  });
  document.getElementById(id).classList.remove('hide');
}

function startGame() {
  const input = document.getElementById('player-name').value.trim();
  if(!input) return alert('請輸入您的姓名才能開始比賽！');
  pName = input;
  showScreen('game-stage1');
  initStage1();
}

// ------------------------------------------
// 關卡一：龍舟接粽子
// ------------------------------------------
let canvas, ctx;
let boat = { x: 130, y: 270, w: 70, h: 25 };
let items = []; 
let s1Timer = 50;
let s1Interval, spawnInterval, gameLoopId;

function initStage1() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  
  function handleMove(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let targetX = (clientX - rect.left) * (canvas.width / rect.width) - (boat.w / 2);
    if (targetX < 0) targetX = 0;
    if (targetX > canvas.width - boat.w) targetX = canvas.width - boat.w;
    boat.x = targetX;
  }
  canvas.addEventListener('mousemove', handleMove, { passive: false });
  canvas.addEventListener('touchmove', handleMove, { passive: false });
  canvas.addEventListener('touchstart', handleMove, { passive: false });

  s1Interval = setInterval(() => {
    s1Timer--;
    document.getElementById('timer1').innerText = `⏱️ 剩餘時間: ${s1Timer} 秒`;
    if(s1Timer <= 0) endStage1();
  }, 1000);

  spawnInterval = setInterval(() => {
    let rand = Math.random();
    let itemType = rand > 0.9 ? 'stone' : (rand > 0.75 ? 'sauce' : 'zongzi');
    items.push({ x: Math.random() * (canvas.width - 24) + 12, y: 0, speed: 4.5 + Math.random() * 3.5, type: itemType });
  }, 600);
  gameLoop();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#d35400'; ctx.fillRect(boat.x, boat.y, boat.w, boat.h);
  for(let i = items.length - 1; i >= 0; i--) {
    let item = items[i]; item.y += item.speed;
    ctx.fillStyle = item.type === 'zongzi' ? '#27ae60' : (item.type === 'sauce' ? '#e74c3c' : '#7f8c8d');
    ctx.fillRect(item.x - 10, item.y - 10, 20, 20);
    if(item.y + 10 >= boat.y && item.y - 10 <= boat.y + boat.h && item.x >= boat.x && item.x <= boat.x + boat.w) {
      if (item.type === 'zongzi') s1Score += 10;
      else if (item.type === 'sauce') s1Score = Math.max(0, s1Score - 10);
      else s1Score = Math.max(0, s1Score - 20);
      document.getElementById('score1').innerText = `得分: ${s1Score}`;
      items.splice(i, 1);
      continue;
    }
    if(item.y > canvas.height) items.splice(i, 1);
  }
  if(s1Timer > 0) gameLoopId = requestAnimationFrame(gameLoop);
}

function endStage1() {
  clearInterval(s1Interval); clearInterval(spawnInterval); cancelAnimationFrame(gameLoopId);
  userTotalScore = s1Score; currentStageNum = 1;
  showLeaderboardPage("🛶 第一關：龍舟接粽 結束");
}

function showLeaderboardPage(titleText) {
  document.getElementById('leaderboard-title').innerText = titleText;
  document.getElementById('current-user-total').innerText = userTotalScore;
  let html = `<div class='rank-item' style='font-weight: bold;'><span>🥇 ${pName}</span><span>${userTotalScore} 分</span></div>`;
  document.getElementById('stage-rank-list').innerHTML = html;
  const nextBtn = document.getElementById('next-stage-btn');
  nextBtn.innerText = currentStageNum === 1 ? "進入第二關：粽子估價王 💰" : "進入第三關：端午趣味答題 🧠";
  showScreen('leaderboard-screen');
}

function goToNextStage() {
  isAllowClick = true;
  if(currentStageNum === 1) { showScreen('game-stage2'); initStage2(); } 
  else if(currentStageNum === 2) { showScreen('game-stage3'); initStage3(); }
}

function initStage2() {
  const q = stage2Questions[s2CurrentIdx];
  document.getElementById('stage2-title').innerText = `第 ${s2CurrentIdx + 1} / 5 題`;
  document.getElementById('stage2-name').innerText = q.name;
  document.getElementById('stage2-img').src = q.img;
  let optionsHtml = "";
  q.options.forEach((opt, idx) => optionsHtml += `<button class="choice-btn" onclick="checkStage2Answer(${idx})">${idx + 1}. ${opt}</button>`);
  document.getElementById('stage2-options').innerHTML = optionsHtml;
}

function checkStage2Answer(chosenIdx) {
  if (!isAllowClick) return;
  isAllowClick = false;
  if(chosenIdx === stage2Questions[s2CurrentIdx].ans) s2Score += 40;
  s2CurrentIdx++;
  setTimeout(() => {
    if(s2CurrentIdx < stage2Questions.length) initStage2();
    else { userTotalScore += s2Score; currentStageNum = 2; showLeaderboardPage("💰 第二關：粽子估價王 結束"); }
    isAllowClick = true;
  }, 1000);
}

function initStage3() {
  s3Interval = setInterval(() => {
    s3Timer--;
    document.getElementById('timer3').innerText = `⏱️ 剩餘時間: ${s3Timer} 秒`;
    if(s3Timer <= 0) endStage3();
  }, 1000);
  renderStage3Question();
}

let s3Timer = 60, s3Interval;
function renderStage3Question() {
  if(s3CurrentIdx >= stage3Questions.length) { endStage3(); return; }
  const q = stage3Questions[s3CurrentIdx];
  document.getElementById('stage3-title').innerText = `第 ${s3CurrentIdx + 1} / 10 題`;
  document.getElementById('stage3-question').innerText = q.q;
  let optionsHtml = "";
  q.options.forEach((opt, idx) => optionsHtml += `<button class="choice-btn" onclick="checkStage3Answer(${idx})">${idx + 1}. ${opt}</button>`);
  document.getElementById('stage3-options').innerHTML = optionsHtml;
}

function checkStage3Answer(chosenIdx) {
  if (!isAllowClick) return;
  isAllowClick = false;
  if(chosenIdx === stage3Questions[s3CurrentIdx].ans) s3CorrectCount++;
  s3CurrentIdx++;
  setTimeout(() => { renderStage3Question(); isAllowClick = true; }, 1000);
}

function endStage3() {
  clearInterval(s3Interval);
  userTotalScore += (s3CorrectCount * 30);
  showScreen('result-screen');
  document.getElementById('result-welcome').innerText = `🎖️ 挑戰大俠：${pName}`;
  document.getElementById('res-final-total').innerText = userTotalScore + " 分";
  document.getElementById('final-rank-list').innerHTML = `<div class='rank-item'><span>🥇 ${pName}</span><span>${userTotalScore} 分</span></div>`;
}
