// 페이지 로드 시 초기화
window.addEventListener('load', init);

function init() {
  bind();  // 탭 전환 바인딩
  setupPagination("ing"); // 처음엔 '진행 중' 탭 페이지네이션 초기화
}

// 지난 , 진행 중 수강내역 버튼 클릭 js
function bind() {
  const tabButtons = document.querySelectorAll('.list_tab div');     // 탭 버튼들
  const contents = document.querySelectorAll('.contents-line');      // 각 콘텐츠 영역

  // 수강내역 버튼 클릭시
  tabButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // 모든 탭에서 active 제거
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active'); // 현재 클릭한 탭에 active 추가

      const tabId = this.dataset.tab; // 진행중 / 지난 탭 id

      // 콘텐츠 섹션 표시 전환
      contents.forEach(content => {
        if (content.id === tabId) {
          content.classList.add('active');
          setupPagination(tabId); // 해당 콘텐츠의 페이지네이션 적용
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
}

// 페이지네이션 js
function setupPagination(contentId) {
  const perPage = 3; // 한 페이지당 카드 개수
  const contents = document.querySelectorAll(`#${contentId} .contents-card`);
  const pagination = document.querySelector('#pagination');
  pagination.innerHTML = ""; // 초기화

  const pageCount = Math.ceil(contents.length / perPage);
  let currentPage = 1;

  // 특정 페이지에 해당하는 카드만 보이기
  function showPage(page) {
    contents.forEach((card, index) => {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      card.style.display = (index >= start && index < end) ? 'block' : 'none';
    });
  }

  // 페이지네이션 버튼 생성
  function renderPagination() {
    pagination.innerHTML = "";

    // <<
    const prev = document.createElement('li');
    prev.innerHTML = `<a href="#">&laquo;</a>`;
    prev.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        renderPagination();
      }
    });
    pagination.appendChild(prev);

    // 1 2 3 ...
    for (let i = 1; i <= pageCount; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#">${i}</a>`;
      if (i === currentPage) li.classList.add('active');
      li.addEventListener('click', () => {
        currentPage = i;
        showPage(currentPage);
        renderPagination();
      });
      pagination.appendChild(li);
    }

    // >>
    const next = document.createElement('li');
    next.innerHTML = `<a href="#">&raquo;</a>`;
    next.addEventListener('click', () => {
      if (currentPage < pageCount) {
        currentPage++;
        showPage(currentPage);
        renderPagination();
      }
    });
    pagination.appendChild(next);
  }

  showPage(currentPage);
  renderPagination();
}
