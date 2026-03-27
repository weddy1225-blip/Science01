function doPost(e) {
  try {
    var SCRIPT_PROP = PropertiesService.getScriptProperties();
    var API_KEY = SCRIPT_PROP.getProperty('GEMINI_API_KEY');
    var requestData = JSON.parse(e.postData.contents);
    var chatHistory = requestData.history; 
    
    var apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=' + API_KEY;
    
    var sysRole = "你現在是國小「生物猜謎」遊戲主持人。指令：\n" +
      "1. 玩家提問猜動物，你必須由始至終固定一種四年級常見動物。\n" +
      "2. 針對問題直接回答，不要重複開場白，語氣生動並帶 Emoji。\n" +
      "3. 當玩家猜對時，必須說出「恭喜你答對了！」，給予具體講評，並主動詢問「要不要再挑戰一題呢？」\n" +
      "4. 如果玩家說「好」或「想玩」，請直接回覆：「沒問題！我已經選好下一種動物了，請開始提問！」並在心裡換一個動物。";

    var payload = {
      "system_instruction": { "parts": [{ "text": sysRole }] },
      "contents": chatHistory,
      "generationConfig": { "temperature": 0.2 }
    };
    
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload),
      'muteHttpExceptions': true 
    };
    
    var response = UrlFetchApp.fetch(apiUrl, options);
    var result = JSON.parse(response.getContentText());
    return createJsonResponse(result.candidates[0].content.parts[0].text);
  } catch (error) {
    return createJsonResponse("☢️ 發生錯誤：" + error.toString());
  }
}

function createJsonResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({ "reply": message })).setMimeType(ContentService.MimeType.JSON);
}
