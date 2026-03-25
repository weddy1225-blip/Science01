/**
 * 處理前端傳來的 POST 請求
 * 包含：對話記憶、熱情主持人人格、計分講評、錯誤處理
 */
function doPost(e) {
  try {
    // 1. 從「專案設定」讀取 API Key
    var scriptProperties = PropertiesService.getScriptProperties();
    var apiKey = scriptProperties.getProperty('GEMINI_API_KEY'); 

    if (!apiKey) {
      return createJsonResponse({ "reply": "錯誤：找不到 API 金鑰。請檢查 GAS 專案設定中的指令碼屬性。" });
    }

    // 2. 解析前端傳入的 JSON 資料
    var requestData = JSON.parse(e.postData.contents);
    var history = requestData.history || [];
    
    // 3. 設定 Gemini 1.5 Flash API 網址 (修正 404 問題)
    var apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;
    
    // 4. --- 核心核心：系統提示詞 (System Prompt) ---
    var systemPrompt = "你現在是一個超級熱情的國小四年級自然科「生物猜謎遊戲」主持人。\n\n" +
      "【你的性格與語氣】\n" +
      "1. 極度親切、活潑，使用大量表情符號（如：🎉、✨、🥳、😉）。\n" +
      "2. 說話像大哥哥或大姊姊，充滿感染力，絕對不能讓現場冷掉！\n\n" +
      "【遊戲核心規則】\n" +
      "1. **禁止重複自我介紹**：網頁前端已顯示歡迎詞。請從你的第一句話開始，就直接針對學生的提問回答動物特徵。絕對不要再說『哈囉大家好』或『我是主持人』。\n" +
      "2. **內心選定動物**：隨機挑選國小常見動物（如：蝴蝶、青蛙、蝸牛、麻雀、螞蟻、松鼠等）。\n" +
      "3. **特徵回答**：回答必須根據該動物真實生物特徵。猜中前絕對不能說出名字。\n" +
      "4. **結合計分板與講評**：當學生猜中時（例如說出答案），請執行：\n" +
      "   - 大聲恭喜答對了！\n" +
      "   - **關鍵任務**：觀察對話歷史，提到他們大約花了幾次提問（例如：『哇！你只用了 5 次提問就猜到了，真是超強小偵探！』）。\n" +
      "   - 分析策略：針對他們的提問給予講評（例如：『你先問腳的數量來縮小範圍，這招非常科學喔！』）。\n" +
      "5. **引導與結束**：若學生卡住可給關於外觀、運動或棲地的提示。答對後，務必詢問是否要『再玩一局』，挑戰更少次數。";

    // 5. 組合傳送給 API 的封包
    var payload = {
      "system_instruction": { "parts": [{ "text": systemPrompt }] },
      "contents": history // 傳送完整歷史紀錄，AI 才能判斷進度與次數
    };
    
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload),
      'muteHttpExceptions': true
    };
    
    // 6. 執行請求
    var response = UrlFetchApp.fetch(apiUrl, options);
    var responseCode = response.getResponseCode();
    var responseText = response.getContentText();
    var result = JSON.parse(responseText);
    
    // 7. 處理回應結果 (含 429 頻率限制優化)
    if (responseCode === 200 && result.candidates && result.candidates.length > 0) {
      var aiReply = result.candidates[0].content.parts[0].text;
      return createJsonResponse({ "reply": aiReply });
    } else if (responseCode === 429) {
      // 處理 Resource Exhausted 錯誤
      return createJsonResponse({ "reply": "哎呀！主持人剛剛說話太快，喉嚨有點渴，請等 1 分鐘後再問我問題喔！🍵✨" });
    } else {
      return createJsonResponse({ 
        "reply": "主持人麥克風出問題了！(錯誤碼：" + responseCode + ")。請稍等一下再試試看吧！" 
      });
    }

  } catch (error) {
    return createJsonResponse({ "reply": "系統發生未預期錯誤：" + error.toString() });
  }
}

/**
 * 輔助函式：回傳 JSON 格式並設定 MimeType
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
                       .setMimeType(ContentService.MimeType.JSON);
}
