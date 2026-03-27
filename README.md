# 🐾 生物猜謎：我是誰？

這是一個專為國小三年級、四年級學生設計的 **AI 互動學習工具**。學生透過與 AI 主持人的提問對話，觀察生物特徵（如外觀、運動方式、棲息地）來猜出神祕生物，培養邏輯推理與生物知識。

## 🚀 立即開始遊戲
點擊下方連結即可開始挑戰：
👉 **[點擊這裡開始遊戲]((https://weddy1225-blip.github.io/Science01/))**

---

## 🌟 功能特色
* **AI 角色扮演**：Gemini 1.5 Flash 擔任專業主持人，生動回應學生提問。
* **即時計分系統**：自動計算每一局猜出答案所需的提問次數。
* **最佳紀錄榜**：永久保存該瀏覽器中最少提問次數的紀錄，激勵學生挑戰。
* **防呆邏輯**：AI 具備對話記憶，不會前後矛盾，且在答對後會給予具體講評。
* **響應式介面**：支援手機、平板與電腦操作。

## 🛠️ 技術架構
* **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
* **Backend**: Google Apps Script (GAS)
* **AI Model**: Google Gemini 1.5 Flash API
* **Database**: LocalStorage (用於儲存最佳紀錄)

## 📖 如何部署 (給老師的說明)

如果你想自己部署一個版本，請參考以下步驟：

### 1. 取得 Google Gemini API Key
前往 [Google AI Studio](https://aistudio.google.com/) 申請免費的 API Key。

### 2. 設置 Google Apps Script (GAS)
1. 建立一個新的 GAS 專案。
2. 在「專案設定」的「指令碼屬性」中新增 `GEMINI_API_KEY`。
3. 貼上專案提供的 `code.gs` 程式碼並部署為「網頁應用程式」。
4. 權限設定為「所有人 (Anyone)」。

### 3. 上傳至 GitHub Pages
1. 將 `index.html` 上傳至 GitHub 倉庫。
2. 修改 `index.html` 中的 `GAS_URL` 變數為你的部署網址。
3. 在 GitHub 倉庫的 **Settings > Pages** 開啟部署功能。

---

## 📜 遊戲規則
1. AI 會在心中隨機挑選一種國小自然科常見的動物。
2. 學生輸入提問（例如：「你有翅膀嗎？」、「你住在水裡嗎？」）。
3. AI 會根據特徵給予線索，但不會直接說出答案。
4. 猜中後，AI 會分析提問策略並詢問是否進行下一局。

## 🤝 貢獻與反饋
歡迎各位老師針對教學需求提出修改建議，或透過 Pull Request 協助優化 AI 的提問引導邏輯。
