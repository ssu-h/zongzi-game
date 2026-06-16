// ==========================================
// 💡 雲端後台設定與題目資料庫（端午專屬完美版）
// ==========================================

const BACKEND_URL = "";

// 關卡二：粽子估價王（使用您已成功上傳的英文圖片檔名，100% 讀取成功）
const stage2Questions = [
  { id: 1, name: "【老協珍】鮑魚干貝粽 (2入)", options: ["NT$ 799", "NT$ 999", "NT$ 1199"], ans: 1, img: "./laoxiezhen.jpg" },
  { id: 2, name: "【星巴克】粽夏時光禮盒 (8入)", options: ["NT$ 520", "NT$ 600", "NT$ 720"], ans: 1, img: "./starbucks.jpg" },
  { id: 3, name: "【新東陽】多穀養生素粽 (全素 5入)", options: ["NT$ 350", "NT$ 450", "NT$ 550"], ans: 1, img: "./xindongyang.jpeg" },
  { id: 4, name: "【鼎泰豐】湖州鮮肉粽禮盒(5入)", options: ["NT$ 450", "NT$ 550", "NT$ 650"], ans: 1, img: "./dintaifung.jpeg" },
  { id: 5, name: "【黑橋牌】府城廟口粽禮盒 (8入)", options: ["NT$ 730", "NT$ 830", "NT$ 930"], ans: 1, img: "./heiqiao.jpg" }
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
  { q: "下列哪一個不是端午節的別稱？", options: ["端洋節", "重五節", "中元節"], ans: 2 }
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
  const screens = ['start-screen', 'game-stage1', 'leaderboard-screen', 'game-stage2', 'game-stage3', 'result-screen'];
  
  screens.forEach(s => {
    const el = document.getElementById(s);
    if (el) {
      el.classList.add('hide');
      el.style.display = 'none'; 
    }
  });
  
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hide');
    // 強制重寫外層版型，確保關卡二與關卡三在任何手機上都能垂直置中對齊
    if (id === 'game-stage2' || id === 'game-stage3' || id === 'leaderboard-screen' || id === 'result-screen') {
      target.style.display = 'flex';
      target.style.flexDirection = 'column';
      target.style.alignItems = 'center';
      target.style.justifyContent = 'center';
      target.style.padding = '20px';
      target.style.boxSizing = 'border-box';
    } else {
      target.style.display = (id === 'game-stage1') ? 'block' : 'flex';
    }
  }
}

function startGame() {
  const input = document.getElementById('player-name').value.trim();
  if(!input) {
    alert('請輸入您的姓名才能開始比賽！');
    return;
  }
  pName = input;
  showScreen('game-stage1');
  initStage1();
}

// ------------------------------------------
// 關卡一：龍舟接粽子（40 秒）
// ------------------------------------------
let canvas, ctx;
let boat = { x: 130, y: 270, w: 70, h: 25 };
let items = []; 
let s1Timer = 40; 
let s1Interval, spawnInterval, gameLoopId;

function initStage1() {
  canvas = document.getElementById('gameCanvas');
  if(!canvas) return;
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
    const tEl = document.getElementById('timer1');
    if(tEl) tEl.innerText = `⏱️ 剩餘時間: ${s1Timer} 秒`;
    if(s1Timer <= 0) endStage1();
  }, 1000);

  spawnInterval = setInterval(() => {
    let rand = Math.random();
    let itemType = 'zongzi';
    if (rand > 0.75 && rand <= 0.90) itemType = 'sauce'; 
    else if (rand > 0.90) itemType = 'stone';          

    items.push({ 
      x: Math.random() * (canvas.width - 24) + 12, 
      y: 0, 
      speed: 4.5 + Math.random() * 3.5,
      type: itemType
    });
  }, 600);

  gameLoop();
}

function gameLoop() {
  if(!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#b3e5fc';
  ctx.lineWidth = 2;
  for(let i=40; i<canvas.height; i+=50) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
  }

  ctx.fillStyle = '#d35400';
  ctx.fillRect(boat.x, boat.y, boat.w, boat.h);
  ctx.fillStyle = '#f1c40f';
  ctx.fillRect(boat.x + 15, boat.y - 4, boat.w - 30, 4);

  for(let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    item.y += item.speed;

    if (item.type === 'zongzi') {
      ctx.fillStyle = '#27ae60';
      ctx.beginPath();
      ctx.moveTo(item.x, item.y - 12);
      ctx.lineTo(item.x - 12, item.y + 12);
      ctx.lineTo(item.x + 12, item.y + 12);
      ctx.closePath();
      ctx.fill();
    } else if (item.type === 'sauce') {
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(item.x, item.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f1c40f';
      ctx.fillRect(item.x - 3, item.y - 13, 6, 4);
    } else if (item.type === 'stone') {
      ctx.fillStyle = '#7f8c8d';
      ctx.fillRect(item.x - 11, item.y - 11, 22, 22);
    }

    if(item.y + 12 >= boat.y && item.y - 12 <= boat.y + boat.h && item.x >= boat.x && item.x <= boat.x + boat.w) {
      if (item.type === 'zongzi') s1Score += 10;
      else if (item.type === 'sauce') s1Score = Math.max(0, s1Score - 10); 
      else if (item.type === 'stone') s1Score = Math.max(0, s1Score - 20); 
      
      const scEl = document.getElementById('score1');
      if(scEl) scEl.innerText = `得分: ${s1Score}`;
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

function showLeaderboardPage(titleText) {
  document.getElementById('leaderboard-title').innerText = titleText;
  document.getElementById('current-user-total').innerText = userTotalScore;
  
  let html = `<div class="rank-item" style="background: rgba(231, 76, 60, 0.15); font-weight: bold; border-radius:6px; padding: 12px; margin: 10px 0; width: 100%; max-width: 320px; display: flex; justify-content: space-between; box-sizing: border-box;">
                <span>⭐ ${pName} (您)</span>
                <span>${userTotalScore} 分</span>
              </div>`;
  document.getElementById('stage-rank-list').innerHTML = html;
  
  const nextBtn = document.getElementById('next-stage-btn');
  if(currentStageNum === 1) nextBtn.innerText = "進入第二關：粽子估價王 💰";
  if(currentStageNum === 2) nextBtn.innerText = "進入第三關：端午趣味答題 🧠";
  showScreen('leaderboard-screen');
}

function goToNextStage() {
  isAllowClick = true;
  if(currentStageNum === 1) { showScreen('game-stage2'); initStage2(); } 
  else if(currentStageNum === 2) { showScreen('game-stage3'); initStage3(); }
}

// ------------------------------------------
// 第二關：粽子估價王（強制 RWD 版型約束）
// ------------------------------------------
function initStage2() {
  const q = stage2Questions[s2CurrentIdx];
  document.getElementById('stage2-title').innerText = `第 ${s2CurrentIdx + 1} / 5 題`;
  document.getElementById('stage2-name').innerText = q.name;
  
  const imgTag = document.getElementById('stage2-img');
  if(imgTag) {
    imgTag.src = q.img; 
    // 強制約束圖片外觀尺寸與居中，防止版型因載入問題而錯位
    imgTag.style.display = 'block'; 
    imgTag.style.width = '100%';
    imgTag.style.maxWidth = '260px';
    imgTag.style.height = '180px';
    imgTag.style.objectFit = 'cover';
    imgTag.style.margin = '15px auto';
    imgTag.style.borderRadius = '8px';
    imgTag.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  }
  
  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `<button class="choice-btn" id="s2-opt-${idx}" onclick="checkStage2Answer(${idx})" style="width:100%; max-width:300px; padding:12px; margin:8px auto; display:block; border-radius:8px; border:1px solid #ddd; background:#fff; font-size:16px; font-weight:bold; box-shadow: 0 2px 4px rgba(0,0,0,0.05); cursor:pointer; transition: all 0.2s;">${idx + 1}. ${opt}</button>`;
  });
  
  const optionsContainer = document.getElementById('stage2-options');
  if(optionsContainer) {
    optionsContainer.innerHTML = optionsHtml;
    optionsContainer.style.width = '100%';
    optionsContainer.style.textAlign = 'center';
  }
  isAllowClick = true;
}

function checkStage2Answer(chosenIdx) {
  if (!isAllowClick) return;
  isAllowClick = false; 
  
  const q = stage2Questions[s2CurrentIdx];
  const buttons = document.querySelectorAll('#stage2-options .choice-btn');
  
  buttons.forEach((btn, idx) => {
    if (idx === q.ans) {
      btn.style.background = '#2ecc71'; 
      btn.style.color = '#fff';
      btn.style.borderColors = '#2ecc71';
    } else if (idx === chosenIdx) {
      btn.style.background = '#e74c3c'; 
      btn.style.color = '#fff';
      btn.style.borderColors = '#e74c3c';
    }   
  });

  if(chosenIdx === q.ans) s2Score += 40; 
  s2CurrentIdx++;
  
  setTimeout(() => {
    if(s2CurrentIdx < stage2Questions.length) {
      initStage2();
    } else {
      userTotalScore += s2Score;
      currentStageNum = 2;
      showLeaderboardPage("💰 第二關：粽子估價王 結束");
    }
  }, 1500);
}

// ------------------------------------------
// 第三關：端午趣味答題
// ------------------------------------------
let s3Timer = 50; 
let s3Interval;

function initStage3() {
  s3Interval = setInterval(() => {
    s3Timer--;
    const t3El = document.getElementById('timer3');
    if(t3El) t3El.innerText = `⏱️ 剩餘時間: ${s3Timer} 秒`;
    if(s3Timer <= 0) endStage3();
  }, 100
