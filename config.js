// ==========================================
// 💡 題目資料庫與虛擬高手設定
// ==========================================

// 這裡設定你的對手名單與預設分數
let competitors = [
  { name: "👑 董事長 (粽子饕客)", s1: 180, s2Score: 160, s3: 8, total: 0 },
  { name: "🦁 總經理 (精算大師)", s1: 120, s2Score: 200, s3: 9, total: 0 },
  { name: "💃 福委會秘書 (小辣椒)", s1: 220, s2Score: 120, s3: 7, total: 0 },
  { name: "🦖 隔壁部門主管", s1: 90,  s2Score: 80,  s3: 6, total: 0 },
  { name: "🧑‍💻 爆肝資工工程師", s1: 310, s2Score: 40,  s3: 5, total: 0 }
];

// 關卡二：猜價格題庫 (每題新增三個選項，ans 填入正確答案的索引值 0, 1 或 2)
const stage2Questions = [
  { id: 1, name: "【義美】經典台灣北部粽 (5入)", options: ["NT$ 295", "NT$ 395", "NT$ 495"], ans: 1, img: "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=600" },
  { id: 2, name: "【星巴克】夏日星冰粽禮盒", options: ["NT$ 480", "NT$ 680", "NT$ 880"], ans: 1, img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" },
  { id: 3, name: "【黑橋牌】府城廟口粽 (5入)", options: ["NT$ 425", "NT$ 525", "NT$ 625"], ans: 0, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600" },
  { id: 4, name: "【新東陽】台式傳統南部粽 (5入)", options: ["NT$ 310", "NT$ 410", "NT$ 510"], ans: 1, img: "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=600" },
  { id: 5, name: "【台北新板希爾頓酒店】頂級鮑魚干貝裹蒸粽", options: ["NT$ 980", "NT$ 1280", "NT$ 1580"], ans: 1, img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" }
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

function calculateCompetitorsScore() {
  competitors.forEach(c => {
    let s1Converted = c.s1; 
    let s2Converted = c.s2Score; // 每題40分，滿分200
    let s3Converted = c.s3 * 30; // 每題30分，滿分300
    
    if(currentStageNum === 1) c.total = s1Converted;
    if(currentStageNum === 2) c.total = s1Converted + s2Converted;
    if(currentStageNum === 3) c.total = s1Converted + s2Converted + s3Converted;
  });
}

function showScreen(id) {
  ['start-screen', 'game-stage1', 'leaderboard-screen', 'game-stage2', 'game-stage3', 'result-screen'].forEach(s => {
    document.getElementById(s).classList.add('hide');
  });
  document.getElementById(id).classList.remove('hide');
}

function startGame() {
  const input = document.getElementById('player-name').value.trim();
  if(!input) return alert('請輸入您的姓名才能開始比賽！');
  pName = "⭐ " + input + " (您)";
  
  showScreen('game-stage1');
  initStage1();
}

// ------------------------------------------
// 關卡一：龍舟接粽子 (點擊與觸控直接跟隨移動)
// ------------------------------------------
let canvas, ctx;
let boat = { x: 130, y: 270, w: 70, h: 25 };
let items = [];
let s1Timer = 50;
let s1Interval, spawnInterval, gameLoopId;

function initStage1() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  
  // 監聽手指觸控與滑鼠事件：點到哪，船的中心點就移到哪！
  function handleMove(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let targetX = (clientX - rect.left) * (canvas.width / rect.width) - (boat.w / 2);
    // 限制在畫布範圍內
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
    items.push({ x: Math.random() * (canvas.width - 20), y: 0, speed: 4 + Math.random() * 4 });
  }, 700);

  gameLoop();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 畫水紋背景線
  ctx.strokeStyle = '#b3e5fc';
  ctx.lineWidth = 2;
  for(let i=40; i<canvas.height; i+=50) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
  }

  // 畫龍舟
  ctx.fillStyle = '#d35400';
  ctx.fillRect(boat.x, boat.y, boat.w, boat.h);
  ctx.fillStyle = '#f1c40f';
  ctx.fillRect(boat.x + 15, boat.y - 4, boat.w - 30, 4);

  // 畫粽子
  ctx.fillStyle = '#27ae60';
  for(let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    item.y += item.speed;
    ctx.beginPath();
    ctx.moveTo(item.x, item.y - 12);
    ctx.lineTo(item.x - 12, item.y + 12);
    ctx.lineTo(item.x + 12, item.y + 12);
    ctx.closePath();
    ctx.fill();

    // 碰觸碰撞
    if(item.y + 12 >= boat.y && item.y - 12 <= boat.y + boat.h && item.x >= boat.x && item.x <= boat.x + boat.w) {
      s1Score += 10;
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
  userTotalScore = s1Score; 
  currentStageNum = 1;
  showLeaderboardPage("🛶 第一關：龍舟接粽 結束");
}

// ------------------------------------------
// 展示過場排行榜邏輯
// ------------------------------------------
function showLeaderboardPage(titleText) {
  document.getElementById('leaderboard-title').innerText = titleText;
  document.getElementById('current-user-total').innerText = userTotalScore;
  
  calculateCompetitorsScore();
  let fullList = [...competitors, { name: pName, total: userTotalScore }];
  fullList.sort((a, b) => b.total - a.total);
  
  let html = "";
  for(let i = 0; i < Math.min(5, fullList.length); i++) {
    let item = fullList[i];
    let isUser = item.name === pName ? "style='background: rgba(231, 76, 60, 0.15); font-weight: bold; border-radius:6px;'" : "";
    let medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i+1}.`;
    html += `<div class="rank-item" ${isUser}><span>${medal} ${item.name}</span><span>${item.total} 分</span></div>`;
  }
  document.getElementById('stage-rank-list').innerHTML = html;
  
  const nextBtn = document.getElementById('next-stage-btn');
  if(currentStageNum === 1) nextBtn.innerText = "進入第二關：猜粽子價格 💰";
  if(currentStageNum === 2) nextBtn.innerText = "進入第三關：端午趣味答題 🧠";
  showScreen('leaderboard-screen');
}

function goToNextStage() {
  if(currentStageNum === 1) { showScreen('game-stage2'); initStage2(); } 
  else if(currentStageNum === 2) { showScreen('game-stage3'); initStage3(); }
}

// ------------------------------------------
// 關卡二：猜粽子價格 (全新改良三選一按鈕)
// ------------------------------------------
function initStage2() {
  const q = stage2Questions[s2CurrentIdx];
  document.getElementById('stage2-title').innerText = `第 ${s2CurrentIdx + 1} / 5 題`;
  document.getElementById('stage2-name').innerText = q.name;
  document.getElementById('stage2-img').src = q.img;
  
  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `<button class="choice-btn" onclick="checkStage2Answer(${idx})">${idx + 1}. ${opt}</button>`;
  });
  document.getElementById('stage2-options').innerHTML = optionsHtml;
}

function checkStage2Answer(chosenIdx) {
  const q = stage2Questions[s2CurrentIdx];
  if(chosenIdx === q.ans) {
    s2Score += 40; // 答對一題得40分，5題滿分200分
  }
  s2CurrentIdx++;
  
  if(s2CurrentIdx < stage2Questions.length) {
    initStage2();
  } else {
    userTotalScore += s2Score;
    currentStageNum = 2;
    showLeaderboardPage("💰 第二關：猜粽子價格 結束");
  }
}

// ------------------------------------------
// 關卡三：端午趣味答題 (延長至 60 秒倒數)
// ------------------------------------------
let s3Timer = 60; // 修改為 60 秒
let s3Interval;

function initStage3() {
  s3Interval = setInterval(() => {
    s3Timer--;
    document.getElementById('timer3').innerText = `⏱️ 剩餘時間: ${s3Timer} 秒`;
    if(s3Timer <= 0) endStage3();
  }, 1000);
  renderStage3Question();
}

function renderStage3Question() {
  if(s3CurrentIdx >= stage3Questions.length) {
    endStage3();
    return;
  }
  const q = stage3Questions[s3CurrentIdx];
  document.getElementById('stage3-title').innerText = `第 ${s3CurrentIdx + 1} / 10 題`;
  document.getElementById('stage3-question').innerText = q.q;
  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `<button class="choice-btn" onclick="checkStage3Answer(${idx})">${idx + 1}. ${opt}</button>`;
  });
  document.getElementById('stage3-options').innerHTML = optionsHtml;
}

function checkStage3Answer(chosenIdx) {
  if(chosenIdx === stage3Questions[s3CurrentIdx].ans) s3CorrectCount++;
  s3CurrentIdx++;
  renderStage3Question();
}

function endStage3() {
  clearInterval(s3Interval);
  s3Score = s3CorrectCount * 30; // 每題 30 分，滿分 300
  userTotalScore += s3Score;
  currentStageNum = 3;
  
  showScreen('result-screen');
  document.getElementById('result-welcome').innerText = `🎖️ 挑戰大俠：${pName.replace(" (您)", "")}`;
  document.getElementById('res-final-total').innerText = userTotalScore + " 分";
  
  calculateCompetitorsScore();
  let finalList = [...competitors, { name: pName, total: userTotalScore }];
  finalList.sort((a, b) => b.total - a.total);
  
  let html = "";
  for(let i = 0; i < Math.min(5, finalList.length); i++) {
    let item = finalList[i];
    let isUser = item.name === pName ? "style='background: rgba(231, 76, 60, 0.15); font-weight: bold; border-radius:6px;'" : "";
    let medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i+1}.`;
    html += `<div class="rank-item" ${isUser}><span>${medal} ${item.name}</span><span>${item.total} 分</span></div>`;
  }
  document.getElementById('final-rank-list').innerHTML = html;
}
