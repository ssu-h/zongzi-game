// ==========================================
// 💡 關卡題目資料庫
// ==========================================
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

// ==========================================
// 🎮 遊戲狀態變數
// ==========================================
let pName = "", s1Score = 0, s2Score = 0, s3CorrectCount = 0, userTotalScore = 0, currentStageNum = 1;
let s2CurrentIdx = 0, s3CurrentIdx = 0, s1Timer = 40, s3Timer = 50;
let canvas, ctx, boat = { x: 130, y: 270, w: 70, h: 25 }, items = [], s1Interval, spawnInterval, s3Interval, gameLoopId;

// ==========================================
// 核心邏輯函數
// ==========================================
function showScreen(id) {
  ['start-screen', 'game-stage1', 'leaderboard-screen', 'game-stage2', 'game-stage3', 'result-screen'].forEach(s => {
    document.getElementById(s).classList.add('hide');
  });
  document.getElementById(id).classList.remove('hide');
}

function startGame() {
  pName = document.getElementById('player-name').value.trim();
  if(!pName) return alert('請輸入您的姓名！');
  showScreen('game-stage1');
  initStage1();
}

function initStage1() {
  canvas = document.getElementById('gameCanvas'); ctx = canvas.getContext('2d');
  const move = (e) => { 
    e.preventDefault(); 
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    boat.x = Math.max(0, Math.min(canvas.width - boat.w, (clientX - rect.left) * (canvas.width / rect.width) - boat.w / 2));
  };
  canvas.addEventListener('mousemove', move); canvas.addEventListener('touchmove', move, {passive: false});
  
  s1Interval = setInterval(() => {
    s1Timer--;
    document.getElementById('timer1').innerText = `⏱️ 剩餘時間: ${s1Timer} 秒`;
    if(s1Timer <= 0) { clearInterval(s1Interval); clearInterval(spawnInterval); cancelAnimationFrame(gameLoopId); userTotalScore = Math.max(0, s1Score); showLeaderboardPage("第一關結束"); }
  }, 1000);
  spawnInterval = setInterval(() => items.push({x: Math.random()*280, y: 0, speed: 6, type: Math.random()>0.8?'stone':'zongzi'}), 700);
  gameLoop();
}

function gameLoop() {
  ctx.clearRect(0,0,320,320);
  ctx.fillStyle = '#d35400'; ctx.fillRect(boat.x, boat.y, boat.w, boat.h);
  items.forEach((item, i) => {
    item.y += item.speed;
    ctx.fillStyle = item.type === 'zongzi' ? '#27ae60' : '#7f8c8d';
    ctx.fillRect(item.x, item.y, 20, 20);
    if(item.y > 270 && item.y < 300 && item.x > boat.x - 20 && item.x < boat.x + boat.w) {
      s1Score += (item.type === 'zongzi' ? 10 : -20);
      document.getElementById('score1').innerText = `得分: ${Math.max(0, s1Score)}`;
      items.splice(i, 1);
    }
  });
  if(s1Timer > 0) gameLoopId = requestAnimationFrame(gameLoop);
}

function showLeaderboardPage(title) {
  document.getElementById('leaderboard-title').innerText = title;
  document.getElementById('current-user-total').innerText = userTotalScore;
  showScreen('leaderboard-screen');
}

function goToNextStage() {
  if(currentStageNum === 1) { currentStageNum = 2; showScreen('game-stage2'); initStage2(); }
  else { currentStageNum = 3; showScreen('game-stage3'); initStage3(); }
}

function initStage2() {
  const q = stage2Questions[s2CurrentIdx];
  document.getElementById('stage2-title').innerText = `第 ${s2CurrentIdx + 1} / 5 題`;
  document.getElementById('stage2-name').innerText = q.name;
  document.getElementById('stage2-img').src = q.img;
  document.getElementById('stage2-options').innerHTML = q.options.map((o, i) => `<button class="choice-btn" onclick="check2(${i})">${i+1}. ${o}</button>`).join('');
}

function check2(i) {
  if(i === stage2Questions[s2CurrentIdx].ans) s2Score += 40;
  s2CurrentIdx++;
  if(s2CurrentIdx < 5) initStage2();
  else { userTotalScore += s2Score; showLeaderboardPage("第二關結束"); }
}

function initStage3() {
  s3Interval = setInterval(() => {
    s3Timer--;
    document.getElementById('timer3').innerText = `⏱️ 剩餘時間: ${s3Timer} 秒`;
    if(s3Timer <= 0) endStage3();
  }, 1000);
  render3();
}

function render3() {
  if(s3CurrentIdx >= 10) return endStage3();
  const q = stage3Questions[s3CurrentIdx];
  document.getElementById('stage3-title').innerText = `第 ${s3CurrentIdx + 1} / 10 題`;
  document.getElementById('stage3-question').innerText = q.q;
  document.getElementById('stage3-options').innerHTML = q.options.map((o, i) => `<button class="choice-btn" onclick="check3(${i})">${i+1}. ${o}</button>`).join('');
}

function check3(i) {
  if(i === stage3Questions[s3CurrentIdx].ans
