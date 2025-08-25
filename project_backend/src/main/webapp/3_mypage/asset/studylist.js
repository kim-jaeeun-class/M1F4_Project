// 페이지 로드 시 초기화
window.addEventListener('load', init);

function init() {

    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {

        alert("로그인이 필요합니다.");
        window.location.href = "/1_main/html/3_login.html"; // 로그인 페이지 경로
        return; 
    }

    console.log("로그인 상태 확인 완료:", currentUser);

    // 로그인 되어 있으면 main 보여주기
    const main = document.querySelector('.main');

    if (main) {
        main.classList.remove('hidden');
        console.log("main 영역 보이도록 처리 완료");
    } else {
        console.log("main 요소를 찾을 수 없음");
    }
    bindTab();
    bindStudyTab();  
    setupPagination("ing"); // 처음엔 '진행 중' 탭 페이지네이션 초기화
}

function bindTab() {
    document.querySelector('.tab_1').addEventListener('click', function () {
        window.location.href = '/3_mypage/html/studylist.html';
    });
    document.querySelector('.tab_2').addEventListener('click', function () {
        window.location.href = '/3_mypage/html/mypage_main.html';
    });
}

// 지난 , 진행 중 수강내역 버튼 클릭 js
function bindStudyTab() { // 다른 js파일의 bind와 충돌되어 수정합니다.
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
    const perPage = 4; // 한 페이지당 카드 개수
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

            if (index >= start && index < end) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }

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

            if (i === currentPage) {
                li.classList.add('active');  // 현재 페이지 버튼이면 강조
            }

            li.addEventListener('click', function () {
                currentPage = i;              // 클릭한 페이지로 변경
                showPage(currentPage);        // 해당 카드 보여주기
                renderPagination();           // 버튼 다시 그림 (강조 갱신)
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
