// function initChatbot() {
//   const chatbotWindow = document.getElementById("chatbotWindow");
//   const toggleBtn = document.getElementById("chatbotToggle");
//   const closeBtn = document.getElementById("chatbotClose");
//   const sendBtn = document.getElementById("sendBtn");
//   const inputBox = document.getElementById("userInput");
//   const chatbotBody = document.getElementById("chatbotBody");

//   const API_KEY = "AIzaSyCf3N7eOMox1_CRZw02w8PitkcfR59J4QQ";
//   const chatHistory = [];
//   let systemPrompt = "";
//   let promptLoaded = false;

//   // 안전하게 요소 존재할 때만 이벤트 바인딩
//   if (toggleBtn && closeBtn && sendBtn && inputBox && chatbotBody && chatbotWindow) {
//     toggleBtn.addEventListener("click", () => {
//       chatbotWindow.style.display = "flex";
//     });

//     closeBtn.addEventListener("click", () => {
//       chatbotWindow.style.display = "none";
//     });

//     sendBtn.addEventListener("click", sendToGemini);
//     inputBox.addEventListener("keypress", e => {
//       if (e.key === "Enter") sendToGemini();
//     });
//   }

//   function appendMessage(sender, message) {
//     const wrapper = document.createElement("div");
//     wrapper.classList.add("chat-message", sender);

//     const bubble = document.createElement("div");
//     bubble.classList.add("chat-bubble");
//     bubble.textContent = message;

//     wrapper.appendChild(bubble);
//     chatbotBody.appendChild(wrapper);
//     chatbotBody.scrollTop = chatbotBody.scrollHeight;
//   }

//   async function loadSystemPrompt() {
//     try {
//       const res = await fetch('../../0_templete/asset/Gemini.txt');
//       if (!res.ok) throw new Error("Gemini.txt 불러오기 실패");
//       systemPrompt = await res.text();
//       promptLoaded = true;
//     } catch (err) {
//       console.error("❌ 프롬프트 로딩 실패:", err);
//       systemPrompt = "";
//     }
//   }

//   async function sendToGemini() {
//     const userInput = inputBox.value.trim();
//     if (!userInput) return;

//     inputBox.value = "";
//     appendMessage("user", userInput);

//     if (!promptLoaded) await loadSystemPrompt();

//     const payload = {
//       contents: [
//         { role: "user", parts: [{ text: systemPrompt }] },
//         ...chatHistory,
//         { role: "user", parts: [{ text: userInput }] }
//       ]
//     };

//     try {
//       const res = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );

//       const data = await res.json();
//       const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ 응답이 없습니다.";
//       appendMessage("bot", botReply);

//       chatHistory.push(
//         { role: "user", parts: [{ text: userInput }] },
//         { role: "model", parts: [{ text: botReply }] }
//       );
//     } catch (err) {
//       console.error("Gemini API 오류:", err);
//       appendMessage("bot", "⚠️ 오류가 발생했습니다.");
//     }
//   }
// }



function initChatbot() {
  const chatbotWindow = document.getElementById("chatbotWindow");
  const toggleBtn = document.getElementById("chatbotToggle");
  const closeBtn = document.getElementById("chatbotClose");
  const sendBtn = document.getElementById("sendBtn");
  const inputBox = document.getElementById("userInput");
  const chatbotBody = document.getElementById("chatbotBody");

  const API_KEY = "AIzaSyCf3N7eOMox1_CRZw02w8PitkcfR59J4QQ"; // 여기에 실제 API 키 입력
  const chatHistory = [];
  let systemPrompt = "";
  let promptLoaded = false;

  if (toggleBtn && closeBtn && sendBtn && inputBox && chatbotBody && chatbotWindow) {
    toggleBtn.addEventListener("click", () => {
      chatbotWindow.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      chatbotWindow.style.display = "none";
    });

    sendBtn.addEventListener("click", sendToGemini);
    inputBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendToGemini();
    });
  }

  function appendMessage(sender, message) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("chat-message", sender);

    const bubble = document.createElement("div");
    bubble.classList.add("chat-bubble");
    bubble.textContent = message;

    wrapper.appendChild(bubble);
    chatbotBody.appendChild(wrapper);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  async function loadSystemPrompt() {
    try {
      const res = await fetch("../../0_templete/asset/Gemini.txt"); // ✅ 경로 주의
      if (!res.ok) throw new Error("Gemini.txt 불러오기 실패");
      systemPrompt = await res.text();
      promptLoaded = true;
    } catch (err) {
      console.error("❌ 프롬프트 로딩 실패:", err);
      systemPrompt = "";
    }
  }

  async function sendToGemini() {
    const userInput = inputBox.value.trim();
    if (!userInput) return;

    inputBox.value = "";
    appendMessage("user", userInput);

    if (!promptLoaded) await loadSystemPrompt();

    const payload = {
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...chatHistory,
        { role: "user", parts: [{ text: userInput }] }
      ]
    };

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ 응답이 없습니다.";
      appendMessage("bot", botReply);

      chatHistory.push(
        { role: "user", parts: [{ text: userInput }] },
        { role: "model", parts: [{ text: botReply }] }
      );
    } catch (err) {
      console.error("Gemini API 오류:", err);
      appendMessage("bot", "⚠️ 오류가 발생했습니다.");
    }
  }
}
