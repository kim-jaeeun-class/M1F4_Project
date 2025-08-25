// 

fetch("/0_templete/templete.html")
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

        // 로고 클릭 시 로그인 상태에 따라 메인페이지 분기 이동
        const logoLink = document.querySelector(".head .main-logo a");
        if (logoLink) {
          logoLink.addEventListener("click", function (e) {
            e.preventDefault(); // 기본 이동 막기
            window.location.href = "/1_main/html/1_mainpage.html";
          });
        }

        const logoutBtn = document.querySelector(".logoutBtn");

        // 로그아웃 시 정보 제거
        if (logoutBtn) {
          logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
          });
        }

      });
    }
  })
