// 

function bind() {
  const hamburgerBtn = document.querySelector('#hamburger-menu');
  const categoryMenu = document.querySelector('#category-menu');

  // 요소가 존재할 때만 이벤트 바인딩
  if (hamburgerBtn && categoryMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = categoryMenu.classList.contains('show');
      
      if (isOpen) {
        categoryMenu.classList.remove('show');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
      else {
        categoryMenu.classList.add('show');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // 모바일에서 페이지 진입 시 키보드 포커스 해제 처리
  window.addEventListener('pageshow', () => {
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  });
}
