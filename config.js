// Firebase 配置 (請替換成您自己的 Firebase 專案金鑰)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 💡 題目資料庫：可在這裡自由增減題目、修改名稱、正解與圖片網址
const questions = [
  { id: 1, name: "阿嬤手工招牌南部粽", price: 75, img: "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=600" },
  { id: 2, name: "極上黑金松露皇王粽", price: 380, img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" },
  { id: 3, name: "頂級奢華鮑魚干貝皇朝粽", price: 1280, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600" }
];
