window.addEventListener('load', bind);

function bind() {
    /* GNB 파트 */
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const categoryMenu = document.getElementById('category-menu');

    hamburgerBtn.addEventListener('click', () => {
        categoryMenu
            .classList
            .toggle('show');
    });

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document
                .activeElement
                .blur();
        }
    });

    /* csCategory 부분*/
    $(document).ready(function () {
    // 현재 파일 이름 추출
    const currentPage = location.pathname.split('/').pop();

        // 각 카테고리 링크를 순회하면서 href가 현재 페이지와 같으면 .active 클래스 추가
        $('.csCategory-list a').each(function () {
            const linkPage = $(this).attr('href');
            if (linkPage === currentPage) {
                $(this).addClass('active');
            }
        });
    });


    /* 게시글 표시 리스트 + 목록 + 검색 기능 */
    const posts = [
        { number: 1, title: '[공지사항] 8월 서버 점검 안내', author: '관리자', time: '2025-07-29' },
        { number: 2, title: '[공지사항] 여름방학 기간 온라인 문의 운영시간 변경', author: '관리자', time: '2025-07-28' },
        { number: 3, title: '[공지사항] 학습 이력 초기화 관련 안내', author: '관리자', time: '2025-07-27' },
        { number: 4, title: '[공지사항] 자주 묻는 질문(FAQ) 업데이트', author: '관리자', time: '2025-07-26' },
        { number: 5, title: '[공지사항] 모의고사 응시 기능 오류 수정 안내', author: '관리자', time: '2025-07-25' },
        { number: 6, title: '[공지사항] 신규 강의 오픈 안내 (HTML/CSS 기초)', author: '관리자', time: '2025-07-24' },
        { number: 7, title: '[공지사항] 모바일 버전 UI 개선 안내', author: '관리자', time: '2025-07-23' },
        { number: 8, title: '[공지사항] 포인트 제도 변경 예정 안내', author: '관리자', time: '2025-07-22' },
        { number: 9, title: '[공지사항] 비정상 로그인 시도 차단 안내', author: '관리자', time: '2025-07-21' },
        { number: 10, title: '[공지사항] 회원가입 이메일 인증 기능 강화', author: '관리자', time: '2025-07-20' },
        { number: 11, title: '[공지사항] 여름철 강의 수강 시 유의사항', author: '관리자', time: '2025-07-19' },
        { number: 12, title: '[공지사항] 학습 진도 저장 오류 복구 완료', author: '관리자', time: '2025-07-18' },
        { number: 13, title: '[공지사항] 온라인 시험 부정행위 감지 기능 도입', author: '관리자', time: '2025-07-17' },
        { number: 14, title: '[공지사항] 튜터 피드백 시스템 개선 안내', author: '관리자', time: '2025-07-16' },
        { number: 15, title: '[공지사항] 주간 학습 리포트 발송 시간 변경', author: '관리자', time: '2025-07-15' },
        { number: 16, title: '[공지사항] 시스템 점검 안내 (7월 20일)', author: '관리자', time: '2025-07-14' },
        { number: 17, title: '[공지사항] 강의 자료 다운로드 기능 추가', author: '관리자', time: '2025-07-13' },
        { number: 18, title: '[공지사항] 커뮤니티 게시판 이용규칙 공지', author: '관리자', time: '2025-07-12' },
        { number: 19, title: '[공지사항] 개인정보 보호 정책 개정 안내', author: '관리자', time: '2025-07-11' },
        { number: 20, title: '[공지사항] 7월 출석 이벤트 당첨자 발표', author: '관리자', time: '2025-07-10' }
    ];

    const postsPerPage = 10;
    let currentPage = 1;
    let filteredPosts = [...posts]; // 검색된 게시글

    // ✅ 테이블 렌더링 함수
    function renderTable(page = 1) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pagePosts = filteredPosts.slice(start, end);

        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = ''; // 기존 내용 초기화

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

    // ✅ 페이지네이션 렌더링 함수
    function renderPagination() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = (i === currentPage) ? 'active' : '';
            btn.addEventListener('click', () => renderTable(i));
            pagination.appendChild(btn);
        }
    }

    // ✅ 검색 함수
    function handleSearch() {
        const keyword = document.getElementById('searchInput').value.trim().toLowerCase();

        if (keyword === '') {
            filteredPosts = [...posts]; // 전체 목록 복원
        } else {
            filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(keyword)
            );
        }

        renderTable(1); // 검색 시 첫 페이지로 이동
    }

    // ✅ 이벤트 연결
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') handleSearch();
    });

    // ✅ 초기화
    renderTable();

}