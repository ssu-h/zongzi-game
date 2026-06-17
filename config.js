const Game = {
    score: 0, name: "", time: 0,
    products: [
        { name: "老協珍 鮑魚干貝粽", price: 999, img: "laoxiezhen.jpg" },
        { name: "星巴克 粽夏時光禮盒", price: 600, img: "starbucks.jpg" },
        { name: "新東陽 多穀養生素粽", price: 450, img: "xindongyang.jpeg" },
        { name: "鼎泰豐 湖州鮮肉粽", price: 550, img: "dintaifung.jpeg" },
        { name: "黑橋牌 府城廟口粽", price: 830, img: "heiqiao.jpg" }
    ],
    questions: [
        { q: "端午節的起源與誰有關？", o: ["屈原", "李白", "杜甫"], a: 0 },
        { q: "端午避邪植物？", o: ["艾草", "玫瑰", "茉莉"], a: 0 },
        { q: "端午習俗？", o: ["立蛋", "放風箏", "吃湯圓"], a: 0 },
        { q: "端午日期？", o: ["五月五", "六月六", "四月四"], a: 0 },
        { q: "划龍舟目的？", o: ["紀念屈原", "比賽游泳", "慶祝生日"], a: 0 },
        { q: "雄黃酒作用？", o: ["避邪", "增高", "美白"], a: 0 },
        { q: "粽子外層？", o: ["竹葉", "報紙", "鋁箔"], a: 0 },
        { q: "端午別稱？", o: ["五日節", "中秋節", "過年"], a: 0 },
        { q: "立蛋時間？", o: ["正午", "午夜", "日落"], a: 0 },
        { q: "龍舟比賽幾人划？", o: ["多人", "一人", "無限制"], a: 0 }
    ],

    init() {
        this.name = document.getElementById('username').value;
        if (!this.name) return alert("請輸入姓名");
        document.getElementById('screen-home').classList.add('hidden');
        document.getElementById('screen-game').classList.remove('hidden');
        document.getElementById('p-name').innerText = this.name;
        this.startLevel1();
    },

    // 關卡一：龍舟
    startLevel1() {
        let area = document.getElementById('game-area');
        area.innerHTML = '<div id="boat" class="boat" style="left:50%">龍舟</div>';
        this.time = 40;
        let boat = document.getElementById('boat');
        window.onkeydown = (e) => {
            let l = parseInt(boat.style.left);
            if (e.key === 'ArrowLeft' && l > 0) boat.style.left = (l - 5) + "%";
            if (e.key === 'ArrowRight' && l < 90) boat.style.left = (l + 5) + "%";
        };
        let timer = setInterval(() => {
            document.getElementById('p-time').innerText = this.time;
            if (this.time-- <= 0) { clearInterval(timer); this.startLevel2(0); }
        }, 1000);
    },

    // 關卡二：估價
    startLevel2(idx) {
        if (idx >= this.products.length) return this.startLevel3(0);
        let p = this.products[idx];
        document.getElementById('game-area').innerHTML = `<h3>第二關：估價王</h3><img src="${p.img}" width="150"><p>${p.name}</p>
            <button class="option-btn" onclick="Game.checkPrice(${p.price}, ${p.price}, ${idx})">$${p.price}</button>
            <button class="option-btn" onclick="Game.checkPrice(0, ${p.price}, ${idx})">$${p.price - 100}</button>`;
    },
    checkPrice(val, correct, idx) {
        if (val === correct) this.score += 20;
        alert(val === correct ? "答對了！" : "錯了！正確是 $" + correct);
        this.startLevel2(idx + 1);
    },

    // 關卡三：答題
    startLevel3(idx) {
        if (idx >= 10) return alert("挑戰結束！總分：" + this.score);
        let q = this.questions[idx];
        let html = `<h3>第三關：趣味答題</h3><p>${q.q}</p>`;
        q.o.forEach((opt, i) => html += `<button class="option-btn" onclick="Game.checkQ(${i}, ${q.a}, ${idx})">${opt}</button>`);
        document.getElementById('game-area').innerHTML = html;
    },
    checkQ(val, ans, idx) {
        if (val === ans) this.score += 10;
        alert(val === ans ? "正確！" : "錯誤！");
        this.startLevel3(idx + 1);
    }
};
