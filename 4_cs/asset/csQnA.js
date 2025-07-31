window.addEventListener('load', bind);

function bind() {
    /* 공통 UI 부분*/
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

    /* 게시글 표시 리스트 + 목록 + 검색 기능 */
    const posts = [
        { number: 13, title: 'HTML 태그 중에 줄바꿈은 어떻게 하나요?', author: '익명', time: '2025-07-29' },
        { number: 12, title: 'CSS에서 margin이랑 padding 차이가 뭔가요?', author: '익명', time: '2025-07-28' },
        { number: 11, title: '로그인을 안 해도 수강 가능한 강의가 있나요?', author: '익명', time: '2025-07-26' },
        { number: 10, title: '마이페이지에서 학습 진도를 수정할 수 있나요?', author: '익명', time: '2025-07-25' },
        { number: 9, title: '모바일에서도 강의 수강이 가능한가요?', author: '익명', time: '2025-07-24' },
        { number: 8, title: '자바스크립트에서 let과 var의 차이를 알고 싶어요', author: '익명', time: '2025-07-23' },
        { number: 7, title: '수료증을 발급받을 수 있나요?', author: '익명', time: '2025-07-22' },
        { number: 6, title: '강의 자료를 다운로드할 수 있나요', author: '익명', time: '2025-07-21' },
        { number: 5, title: '모의고사 점수는 어디에서 확인하나요?', author: '익명', time: '2025-07-20' },
        { number: 4, title: '포인트는 어디에 사용되나요?', author: '익명', time: '2025-07-17' },
        { number: 3, title: '강사에게 질문은 어떻게 하나요?', author: '익명', time: '2025-07-16' },
        { number: 2, title: '비밀번호를 잊어버렸을 때 어떻게 하나요?', author: '익명', time: '2025-07-12' },
        { number: 1, title: '자바스크립트 문법에서 세미콜론은 꼭 필요한가요?', author: '익명', time: '2025-07-11' },
    ];

    let currentPage = 1;
    const postsPerPage = 10;
    const maxVisibleButtons = 5;
    let filteredPosts = [...posts]; // ✅ 빠졌던 선언 추가!

    
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

        let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
        let endPage = startPage + maxVisibleButtons - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisibleButtons + 1);
        }

        // ◀ 이전 버튼
        if (startPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.textContent = '◀';
            prevBtn.addEventListener('click', () => {
                currentPage = Math.max(1, currentPage - 1);
                renderTable(currentPage);
                renderPagination();
            });
            pagination.appendChild(prevBtn);
        }

        // 페이지 번호 버튼
        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = (i === currentPage) ? 'active' : '';
            btn.addEventListener('click', () => {
                currentPage = i;
                renderTable(i);
                renderPagination();
            });
            pagination.appendChild(btn);
        }

        // ▶ 다음 버튼
        if (endPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.textContent = '▶';
            nextBtn.addEventListener('click', () => {
                currentPage = Math.min(totalPages, currentPage + 1);
                renderTable(currentPage);
                renderPagination();
            });
            pagination.appendChild(nextBtn);
        }
    }

    // ✅ 검색 함수
    function handleSearch() {
        const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
        const field = document.getElementById('searchField').value; // 'title' 또는 'content'

        if (keyword === '') {
            filteredPosts = [...posts]; // 전체 목록 복원
        } else {
            filteredPosts = posts.filter(post => {
                const target = post[field]; // post.title 또는 post.content
                return target && target.toLowerCase().includes(keyword);
            });
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