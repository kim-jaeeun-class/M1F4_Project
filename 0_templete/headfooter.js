fetch("/0_templete/templete.html")
  .then(res => res.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const header = doc.querySelector(".head");
    const footer = doc.querySelector(".footer");

    const headTarget = document.querySelector(".head");
    const footerTarget = document.querySelector(".footer");

    // ✅ .head가 존재할 경우에만 삽입
    if (header && headTarget) {
      headTarget.innerHTML = header.innerHTML;

      // header 삽입 후 로고 클릭 리디렉션 로직 포함
      requestAnimationFrame(() => {
        const logoLink = document.querySelector(".head .main-logo a");
        if (logoLink) {
          logoLink.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/1_main/html/1_mainpage.html";
          });
        }
      });
    }

    // ✅ .footer가 존재할 경우에만 삽입
    if (footer && footerTarget) {
      footerTarget.innerHTML = footer.innerHTML;

      // footer 삽입 후 실행 함수들
      requestAnimationFrame(() => {
        if (typeof bind === "function") bind();
        if (typeof initChatbot === "function") initChatbot();

        const logoutBtn = document.querySelector(".logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
          });
        }
      });
    }
  })
  .catch(err => console.error("템플릿 불러오기 실패:", err));
