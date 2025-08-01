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

        // 로고 클릭 시 로그인 상태에 따라 메인페이지 분기 이동
        const logoLink = document.querySelector(".head .main-logo a");
        
        if (logoLink) {

          logoLink.addEventListener("click", function (e) {
            
            e.preventDefault(); // 기본 a태그 이동 막기

            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            
            if (currentUser && currentUser.id) {
              window.location.href = "/1_main/html/1-1_mainpage_login.html";
            } else {
              window.location.href = "/1_main/html/1_mainpage.html";
            }
          });

        }

      });
    }
  })
  .catch(err => console.error("불러오기 실패:", err));
