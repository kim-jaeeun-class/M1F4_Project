// 

fetch("../../0_templete/templete.html")
  .then(res => res.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const header = doc.querySelector(".head");
    const footer = doc.querySelector(".footer");

    if (header) document.querySelector(".head").innerHTML = header.innerHTML;
    if (footer) {
      document.querySelector(".footer").innerHTML = footer.innerHTML;

      // header/footer 삽입 후 DOM에 존재할 때 함수 호출
      requestAnimationFrame(() => {
        if (typeof bind === "function") bind();
        if (typeof initChatbot === "function") initChatbot();
      });
    }
  })
  .catch(err => console.error("불러오기 실패:", err));
