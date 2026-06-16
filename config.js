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

// 💡 題目資料庫：你可以自由修改、增加或減少題目
const questions = [
  { 
    id: 1, 
    name: "【義美】經典台灣北部粽 (5入)", 
    price: 395, 
    img: "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=600" 
  },
  { 
    id: 2, 
    name: "【星巴克】夏日星冰粽禮盒", 
    price: 680, 
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" 
  },
  { 
    id: 3, 
    name: "【台北新板希爾頓酒店】頂級鮑魚干貝裹蒸粽", 
    price: 1280, 
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600" 
  }
];
