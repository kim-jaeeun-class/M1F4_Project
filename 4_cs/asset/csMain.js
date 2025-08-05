window.addEventListener('load', bindGNB);

function bindGNB() {
    /* GNB 파트 */


    /* csCategory 하이라이트 */
    document.addEventListener('DOMContentLoaded', function () {
        const currentPage = location.pathname.split('/').pop();

        document.querySelectorAll('.csCategory-list a').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    });

    /* 게시글 데이터 */
    const posts = [
        { number: 20, title: '[공지사항] 8월 서버 점검 안내', content: '서버 점검은 8월 5일 오전 2시에 진행됩니다.', author: '관리자', time: '2025-07-29' },
        { number: 19, title: '[공지사항] 여름방학 기간 온라인 문의 운영시간 변경', content: '운영시간은 오전 10시 ~ 오후 4시로 단축됩니다.', author: '관리자', time: '2025-07-28' },
        { number: 18, title: '[공지사항] 학습 이력 초기화 관련 안내', content: '초기화 요청 시 복구가 불가능합니다.', author: '관리자', time: '2025-07-27' },
        { number: 17, title: '[공지사항] 자주 묻는 질문(FAQ) 업데이트', content: '자주 묻는 질문에 대한 최신 답변이 추가되었습니다.', author: '관리자', time: '2025-07-26' },
        { number: 16, title: '[공지사항] 모의고사 응시 기능 오류 수정 안내', content: '응시 기록 저장 문제를 수정했습니다.', author: '관리자', time: '2025-07-25' },
        { number: 15, title: '[공지사항] 신규 강의 오픈 안내 (HTML/CSS 기초)', content: '웹 개발 기초 강의가 새로 오픈되었습니다.', author: '관리자', time: '2025-07-24' },
        { number: 14, title: '[공지사항] 모바일 버전 UI 개선 안내', content: '모바일에서 더 편리한 사용을 위한 개선이 이루어졌습니다.', author: '관리자', time: '2025-07-23' },
        { number: 13, title: '[공지사항] 포인트 제도 변경 예정 안내', content: '포인트 적립 및 사용 정책이 일부 변경됩니다.', author: '관리자', time: '2025-07-22' },
        { number: 12, title: '[공지사항] 비정상 로그인 시도 차단 안내', content: '보안을 위해 다단계 인증을 도입했습니다.', author: '관리자', time: '2025-07-21' },
        { number: 11, title: '[공지사항] 회원가입 이메일 인증 기능 강화', content: '이메일 인증 절차가 강화되었습니다.', author: '관리자', time: '2025-07-20' },
        { number: 10, title: '[공지사항] 여름철 강의 수강 시 유의사항', content: '기기 발열 및 네트워크 환경을 확인해주세요.', author: '관리자', time: '2025-07-19' },
        { number: 9, title: '[공지사항] 학습 진도 저장 오류 복구 완료', content: '일부 사용자 진도 오류가 복구되었습니다.', author: '관리자', time: '2025-07-18' },
        { number: 8, title: '[공지사항] 온라인 시험 부정행위 감지 기능 도입', content: 'AI 기반의 감지 기능이 시험에 적용됩니다.', author: '관리자', time: '2025-07-17' },
        { number: 7, title: '[공지사항] 튜터 피드백 시스템 개선 안내', content: '피드백 알림 기능이 강화되었습니다.', author: '관리자', time: '2025-07-16' },
        { number: 6, title: '[공지사항] 주간 학습 리포트 발송 시간 변경', content: '리포트 발송이 매주 월요일 오후 2시로 변경됩니다.', author: '관리자', time: '2025-07-15' },
        { number: 5, title: '[공지사항] 시스템 점검 안내 (7월 20일)', content: '7월 20일(일) 오전 1시부터 점검이 진행됩니다.', author: '관리자', time: '2025-07-14' },
        { number: 4, title: '[공지사항] 강의 자료 다운로드 기능 추가', content: 'PC에서 강의 자료를 다운로드할 수 있습니다.', author: '관리자', time: '2025-07-13' },
        { number: 3, title: '[공지사항] 커뮤니티 게시판 이용규칙 공지', content: '비방, 광고 게시물 작성 시 제재됩니다.', author: '관리자', time: '2025-07-12' },
        { number: 2, title: '[공지사항] 개인정보 보호 정책 개정 안내', content: '정책 개정 내용은 공지사항을 확인해주세요.', author: '관리자', time: '2025-07-11' },
        { number: 1, title: '[공지사항] 7월 출석 이벤트 당첨자 발표', content: '이벤트 당첨자는 마이페이지에서 확인 가능합니다.', author: '관리자', time: '2025-07-10' }
    ];

    let currentPage = 1;
    const postsPerPage = 10;
    const maxVisibleButtons = 5;
    let filteredPosts = [...posts];

    function renderTable(page = 1) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pagePosts = filteredPosts.slice(start, end);

        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '';

        pagePosts.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${post.number}</td>
                <td><a href="csMainView.html">${post.title}</a></td>
                <td>${post.author}</td>
                <td>${post.time}</td>
            `;
            tbody.appendChild(row);
        });

        currentPage = page;
        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
        let endPage = startPage + maxVisibleButtons - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisibleButtons + 1);
        }

        if (startPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.textContent = '◀';
            prevBtn.addEventListener('click', () => {
                currentPage = Math.max(1, currentPage - 1);
                renderTable(currentPage);
            });
            pagination.appendChild(prevBtn);
        }

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => {
                currentPage = i;
                renderTable(i);
            });
            pagination.appendChild(btn);
        }

        if (endPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.textContent = '▶';
            nextBtn.addEventListener('click', () => {
                currentPage = Math.min(totalPages, currentPage + 1);
                renderTable(currentPage);
            });
            pagination.appendChild(nextBtn);
        }
    }

    function handleSearch() {
        const keyword = document.querySelector('.search-input').value.trim().toLowerCase();
        const field = document.querySelector('.search-filter').value; // 'title' 또는 'content'

        if (keyword === '') {
            filteredPosts = [...posts];
        } else {
            filteredPosts = posts.filter(post => {
                const target = (post[field] || '').toLowerCase();
                return target.includes(keyword);
            });
        }

        renderTable(1);
    }

    // ✅ 검색 이벤트 연결
    document.querySelector('.search-btn').addEventListener('click', handleSearch);
    document.querySelector('.search-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') handleSearch();
    });

    // ✅ 초기 테이블 렌더링
    renderTable();

    // ✅ 글쓰기 버튼 클릭 시 localStorage 초기화
    const writeButton = document.querySelector('.upload-btn');
    if (writeButton) {
        writeButton.addEventListener('click', function () {
            localStorage.removeItem('tempPost'); // 기존 글 데이터 제거
            window.location.href = 'csMainWrite.html'; // 작성 페이지 경로
        });
    }
}