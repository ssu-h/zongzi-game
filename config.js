let score = 0, currentStage = 1, s2Idx = 0, s3Idx = 0, s1Timer = 40;
let boatX = 130, items = [], canvas, ctx, gameLoop;

const stage2Questions = [
    { name: "【老協珍】鮑魚干貝粽", ans: 999, opts: [699, 999, 1299], img: "https://d3san4pg9xqi43.cloudfront.net/images/f6fcffa6-764c-4daf-8558-d2bf0a37319c.jpg" },
    { name: "【星巴克】粽夏時光禮盒", ans: 600, opts: [400, 600, 800], img: "https://www.starbucks.com.tw/common/objects/images/cake/2026040216390598_62.jpg" },
    { name: "【新東陽】多穀養生素粽", ans: 450, opts: [350, 450, 550], img: "https://img.91app.com/webapi/imagesV3/Original/SalePage/11709655/0/639168580315900000?v=1" },
    { name: "【鼎泰豐】湖州鮮肉粽禮盒", ans: 550, opts: [450, 550, 650], img: "https://i4.momoshop.com.tw/1779428031/goodsimg/0015/290/277/spec/15290277_01_001_R.webp" },
    { name: "【黑橋牌】府城廟口粽禮盒", ans: 830, opts: [730, 830, 930], img: "https://cdn-general.cybassets.com/media/W1siZiIsIjMyNTgwL3Byb2R1Y3RzLzU0ODUxNjUyLzE3NzY5MjMxMzBfZWNlZTJmZTE1YzRhYzI0MDJhOTMuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=c91ea374e76e6cc1" }
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

function startGame() {
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('game-stage1').classList.remove('hide');
    canvas = document.getElementById('gameCanvas');
    canvas.width = 320; canvas.height = 320;
    ctx = canvas.getContext('2d');
    canvas.addEventListener('touchmove', (e) => { boatX = e.touches[0].clientX - 50; e.preventDefault(); }, {passive: false});
    canvas.addEventListener('mousemove', (e) => { boatX = e.clientX - 100; });
    gameLoop = setInterval(update, 50);
}

function update() {
    if(s1Timer <= 0) { clearInterval(gameLoop); showLeaderboardPage("第一關結束"); return; }
    if(Math.random() < 0.1) items.push({x: Math.random() * 280, y: 0});
    ctx.clearRect(0, 0, 320, 320);
    items.forEach((item, i) => {
        item.y += 6;
        ctx.fillStyle = '#27ae60'; ctx.fillRect(item.x, item.y, 20, 20);
        if(item.y > 270 && item.x > boatX - 20 && item.x < boatX + 70) { score += 10; items.splice(i, 1); document.getElementById('score1').innerText = "得分: " + score; }
    });
    ctx.fillStyle = '#58D68D'; ctx.fillRect(boatX, 290, 70, 20);
    s1Timer -= 0.05; document.getElementById('timer1').innerText = "⏱️ " + Math.floor(s1Timer) + " 秒";
}

function showLeaderboardPage(msg) {
    document.getElementById('game-stage1').classList.add('hide');
    document.getElementById('game-stage2').classList.add('hide');
    document.getElementById('game-stage3').classList.add('hide');
    document.getElementById('leaderboard-screen').classList.remove('hide');
    document.getElementById('leaderboard-title').innerText = msg;
    document.getElementById('current-user-total').innerText = score;
}

function goToNextStage() {
    document.getElementById('leaderboard-screen').classList.add('hide');
    if(currentStage === 1) { currentStage = 2; document.getElementById('game-stage2').classList.remove('hide'); renderS2(); }
    else { currentStage = 3; document.getElementById('game-stage3').classList.remove('hide'); renderS3(); }
}

function renderS2() {
    const q = stage2Questions[s2Idx];
    document.getElementById('stage2-title').innerText = `第 ${s2Idx + 1} / 5 題`;
    document.getElementById('stage2-name').innerText = q.name;
    document.getElementById('stage2-img').src = q.img;
    document.getElementById('stage2-options').innerHTML = q.opts.map(o => `<button class="choice-btn" onclick="checkS2(${o === q.ans})">${o}</button>`).join('');
}

function checkS2(isCorrect) { if(isCorrect) score += 100; s2Idx++; if(s2Idx < stage2Questions.length) renderS2(); else showLeaderboardPage("估價王結束"); }

function renderS3() {
    const q = stage3Questions[s3Idx];
    document.getElementById('stage3-title').innerText = `第 ${s3Idx + 1} / 10 題`;
    document.getElementById('stage3-question').innerText = q.q;
    document.getElementById('stage3-options').innerHTML = q.options.map((o, i) => `<button class="choice-btn" onclick="checkS3(${i === q.ans})">${o}</button>`).join('');
}

function checkS3(isCorrect) { if(isCorrect) score += 100; s3Idx++; if(s3Idx < stage3Questions.length) renderS3(); else { document.getElementById('game-stage3').classList.add('hide'); document.getElementById('result-screen').classList.remove('hide'); document.getElementById('res-final-total').innerText = score; } }
