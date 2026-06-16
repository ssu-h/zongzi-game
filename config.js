// ==========================================
// 💡 題目資料庫與虛擬高手設定
// ==========================================

let competitors = [
  { name: "👑 董事長 (粽子饕客)", s1: 180, s2Score: 160, s3: 8, total: 0 },
  { name: "🦁 總經理 (精算大師)", s1: 120, s2Score: 200, s3: 9, total: 0 },
  { name: "💃 福委會秘書 (小辣椒)", s1: 220, s2Score: 120, s3: 7, total: 0 },
  { name: "🦖 隔壁部門主管", s1: 90,  s2Score: 80,  s3: 6, total: 0 },
  { name: "🧑‍鍵盤資工工程師", s1: 310, s2Score: 40,  s3: 5, total: 0 }
];

// 關卡二：全新真實圖片與修正價格題庫
const stage2Questions = [
  { id: 1, name: "【義美】經典台灣北部粽 (5入)", options: ["NT$ 395", "NT$ 495", "NT$ 595"], ans: 0, img: "https://i4.momoshop.com.tw/1779428031/goodsimg/0015/290/277/spec/15290277_01_001_R.webp" },
  { id: 2, name: "【星巴克】粽夏時光禮盒 (8入)", options: ["NT$ 520", "NT$ 720", "NT$ 920"], ans: 1, img: "https://www.starbucks.com.tw/common/objects/images/cake/2026040216390598_62.jpg" },
  { id: 3, name: "【黑橋牌】府城廟口粽禮盒 (8入)", options: ["NT$ 780", "NT$ 980", "NT$ 1180"], ans: 1, img: "https://cdn-general.cybassets.com/media/W1siZiIsIjMyNTgwL3Byb2R1Y3RzLzU0ODUxNjUyLzE3NzY5MjMxMzBfZWNlZTJmZTE1YzRhYzI0MDJhOTMuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=c91ea374e76e6cc1" },
  { id: 4, name: "【新東陽】多穀養生素粽 (全素 5入)", options: ["NT$ 350", "NT$ 450", "NT$ 550"], ans: 1, img: "https://img.91app.com/webapi/imagesV3/Original/SalePage/11709655/0/639168580315900000?v=1" },
  { id: 5, name: "【老協珍】鮑魚干貝粽 (2入)", options: ["NT$ 799", "NT$ 999", "NT$ 1199"], ans: 1, img: "https://d3san4pg9xqi43.cloudfront.net/images/f6fcffa6-764c-4daf-8558-d2bf0a37319c.jpg" }
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

function calculateCompetitorsScore() {
  competitors.forEach(c => {
    let s1Converted = c.s1; 
    let s2Converted = c.s2Score; 
    let s3Converted = c.s3 * 30; 
    
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
      if (item.type === 'zongzi') {
        s1Score += 10;
      } else if (item.type === 'sauce') {
        s1Score = Math.max(0, s1Score - 10); 
      } else if (item.type === 'stone') {
        s1Score = Math.max(0, s1Score - 20); 
      }
      
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
// 第二關：粽子估價王
// ------------------------------------------
function initStage2() {
  const q = stage2Questions[s2CurrentIdx];
  document.getElementById('stage2-title').innerText = `第 ${s2CurrentIdx + 1} / 5 題`;
  document.getElementById('stage2-name').innerText = q.name;
  document.getElementById('stage2-img').src = q.img;
  
  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `<button class="choice-btn" id="s2-opt-${idx}" onclick="checkStage2Answer(${idx})">${idx + 1}. ${opt}</button>`;
  });
  document.getElementById('stage2-options').innerHTML = optionsHtml;
  isAllowClick = true;
}

function checkStage2Answer(chosenIdx) {
  if (!isAllowClick) return;
  isAllowClick = false; 
  
  const q = stage2Questions[s2CurrentIdx];
  const buttons = document.querySelectorAll('#stage2-options .choice-btn');
  
  buttons.forEach((btn, idx) => {
    if (idx === q.ans) {
      btn.classList.add('correct'); 
    } else if (idx === chosenIdx) {
      btn.classList.add('wrong');   
    }
  });

  if(chosenIdx === q.ans) {
    s2Score += 40; 
  }
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
let s3Timer = 60; 
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
    optionsHtml += `<button class="choice-btn" id="s3-opt-${idx}" onclick="checkStage3Answer(${idx})">${idx + 1}. ${opt}</button>`;
  });
  document.getElementById('stage3-options').innerHTML = optionsHtml;
  isAllowClick = true;
}

function checkStage3Answer(chosenIdx) {
  if (!isAllowClick) return;
  isAllowClick = false;
  
  const q = stage3Questions[s3CurrentIdx];
  const buttons = document.querySelectorAll('#stage3-options .choice-btn');
  
  buttons.forEach((btn, idx) => {
    if (idx === q.ans) {
      btn.classList.add('correct');
    } else if (idx === chosenIdx) {
      btn.classList.add('wrong');
    }
  });

  if(chosenIdx === q.ans) s3CorrectCount++;
  s3CurrentIdx++;
  
  setTimeout(() => {
    renderStage3Question();
  }, 1500);
}

// ------------------------------------------
// 終極結算
// ------------------------------------------
function endStage3() {
  clearInterval(s3Interval);
  let s3Score = s3CorrectCount * 30; 
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
}
