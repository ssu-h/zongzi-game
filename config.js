// ==========================================
// 💡 題目資料庫：可在此自由更改題目、售價、選項與正解
// ==========================================

// 關卡二：猜粽子價格 (共5題)
const stage2Questions = [
  { id: 1, name: "【義美】經典台灣北部粽 (5入)", price: 395, img: "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=600" },
  { id: 2, name: "【星巴克】夏日星冰粽禮盒", price: 680, img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" },
  { id: 3, name: "【黑橋牌】府城廟口粽 (5入)", price: 425, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600" },
  { id: 4, name: "【新東陽】台式傳統南部粽 (5入)", price: 410, img: "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=600" },
  { id: 5, name: "【台北新板希爾頓酒店】頂級鮑魚干貝裹蒸粽", price: 1280, img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" }
];

// 關卡三：端午趣味答題 (共10題)
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
// 🎮 遊戲核心引擎控制區 (不可隨意修改)
// ==========================================
let pName = "";
let s1Score = 0;
let s2TotalError = 0;
let s3CorrectCount = 0;

let s2CurrentIdx = 0;
let s3CurrentIdx = 0;

function showScreen(id) {
  ['start-screen', 'game-stage1', 'game-stage2', 'game-stage3', 'result-screen'].forEach(s => {
    document.getElementById(s).classList.add('hide');
  });
  document.getElementById(id).classList.remove('hide');
}

function startGame() {
  const input = document.getElementById('player-name').value.trim();
  if(!input) return alert('請輸入您的姓名才能開始比賽！');
  pName = input;
  
  // 進入第一關：龍舟
  showScreen('game-stage1');
  initStage1();
}

// ------------------------------------------
// 關卡一邏輯：龍舟接粽子 (50秒)
// ------------------------------------------
let canvas, ctx;
let boat = { x: 130, y: 260, w: 60, h: 25, speed: 20 };
let items = [];
let s1Timer = 50;
let s1Interval, spawnInterval, gameLoopId;

function initStage1() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  
  s1Interval = setInterval(() => {
    s1Timer--;
    document.getElementById('timer1').innerText = `⏱️ 剩餘時間: ${s1Timer} 秒`;
    if(s1Timer <= 0) {
      endStage1();
    }
  }, 1000);

  spawnInterval = setInterval(() => {
    items.push({ x: Math.random() * (canvas.width - 20), y: 0, r: 10, speed: 3 + Math.random() * 3 });
  }, 800);

  gameLoop();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 畫龍舟 (簡易矩形船)
  ctx.fillStyle = '#d35400';
  ctx.fillRect(boat.x, boat.y, boat.w, boat.h);
  ctx.fillStyle = '#f1c40f';
  ctx.fillRect(boat.x + 15, boat.y - 5, 30, 5); // 船身裝飾
  
  // 畫粽子並更新位置
  ctx.fillStyle = '#27ae60';
  for(let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    item.y += item.speed;
    
    // 畫三角形粽子
    ctx.beginPath();
    ctx.moveTo(item.x, item.y - 10);
    ctx.lineTo(item.x - 10, item.y + 10);
    ctx.lineTo(item.x + 10, item.y + 10);
    ctx.closePath();
    ctx.fill();

    // 碰撞檢測 (接住粽子)
    if(item.y + 10 >= boat.y && item.y - 10 <= boat.y + boat.h && item.x >= boat.x && item.x <= boat.x + boat.w) {
      s1Score += 10;
      document.getElementById('score1').innerText = `得分: ${s1Score}`;
      items.splice(i, 1);
      continue;
    }
    
    if(item.y > canvas.height) {
      items.splice(i, 1);
    }
  }
  
  if(s1Timer > 0) {
    gameLoopId = requestAnimationFrame(gameLoop);
  }
}

function moveLeft() { if(boat.x > 0) boat.x -= boat.speed; }
function moveRight() { if(boat.x < canvas.width - boat.w) boat.x += boat.speed; }

function endStage1() {
  clearInterval(s1Interval);
  clearInterval(spawnInterval);
  cancelAnimationFrame(gameLoopId);
  
  alert('🛶 第一關時間到！緊接著進入第二關：猜粽子價格！');
  showScreen('game-stage2');
  initStage2();
}

// ------------------------------------------
// 關卡二邏輯：猜粽子價格 (5題)
// ------------------------------------------
function initStage2() {
  const q = stage2Questions[s2CurrentIdx];
  document.getElementById('stage2-title').innerText = `第 ${s2CurrentIdx + 1} / 5 題`;
  document.getElementById('stage2-name').innerText = q.name;
  document.getElementById('stage2-img').src = q.img;
  document.getElementById('stage2-input').value = "";
}

function nextStage2Question() {
  const val = parseInt(document.getElementById('stage2-input').value);
  if(isNaN(val) || val < 0) return alert('請輸入估算的新台幣金額！');

  const q = stage2Questions[s2CurrentIdx];
  let error = Math.abs(val - q.price);
  s2TotalError += error;

  s2CurrentIdx++;
  if(s2CurrentIdx < stage2Questions.length) {
    initStage2();
  } else {
    alert('💰 價格猜測結束！最後一關衝刺：端午趣味答題（限時50秒）！');
    showScreen('game-stage3');
    initStage3();
  }
}

// ------------------------------------------
// 關卡三邏輯：端午趣味答題 (10題共50秒)
// ------------------------------------------
let s3Timer = 50;
let s3Interval;

function initStage3() {
  s3Interval = setInterval(() => {
    s3Timer--;
    document.getElementById('timer3').innerText = `⏱️ 剩餘時間: ${s3Timer} 秒`;
    if(s3Timer <= 0) {
      endGame();
    }
  }, 1000);
  
  renderStage3Question();
}

function renderStage3Question() {
  if(s3CurrentIdx >= stage3Questions.length) {
    endGame();
    return;
  }
  
  const q = stage3Questions[s3CurrentIdx];
  document.getElementById('stage3-title').innerText = `第 ${s3CurrentIdx + 1} / 10 題`;
  document.getElementById('stage3-question').innerText = q.q;
  
  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `<button style="background:#fff; color:var(--primary); border:2px solid var(--primary); text-align:left; padding:12px;" onclick="checkStage3Answer(${idx})">${idx + 1}. ${opt}</button>`;
  });
  document.getElementById('stage3-options').innerHTML = optionsHtml;
}

function checkStage3Answer(chosenIdx) {
  const q = stage3Questions[s3CurrentIdx];
  if(chosenIdx === q.ans) {
    s3CorrectCount++;
  }
  
  s3CurrentIdx++;
  renderStage3Question();
}

// ------------------------------------------
// 總結算畫面
// ------------------------------------------
function endGame() {
  clearInterval(s3Interval);
  showScreen('result-screen');
  
  document.getElementById('result-welcome').innerText = `🎖️ 參賽大俠：${pName}`;
  document.getElementById('res-score1').innerText = s1Score;
  document.getElementById('res-score2').innerText = s2TotalError;
  document.getElementById('res-score3').innerText = s3CorrectCount;
}
