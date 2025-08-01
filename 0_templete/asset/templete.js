// 

function bind() {
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const categoryMenu = document.getElementById('category-menu');

  // 요소가 존재할 때만 이벤트 바인딩
  if (hamburgerBtn && categoryMenu) {
    hamburgerBtn.addEventListener('click', () => {
      categoryMenu.classList.toggle('show');
    });
  }

  // 모바일에서 페이지 진입 시 키보드 포커스 해제 처리
  window.addEventListener('pageshow', () => {
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  });
}
