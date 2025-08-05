window.addEventListener('load', bind4);

function bind4() {
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
        { number: 13, title: '[Q&A] 수업은 어디서 진행되나요?', content: '수업은 지정된 지역 학습센터나 기관에서 대면으로 진행됩니다.', author: '관리자', time: '2025-07-31' },
        { number: 12, title: '[Q&A] 학습 봉사자는 어떤 자격이 필요한가요?', content: '봉사자는 성인 이상이며, 간단한 교육 이수를 통해 활동 가능합니다.', author: '관리자', time: '2025-07-30' },
        { number: 11, title: '[Q&A] 수업 예약은 어떻게 하나요?', content: '홈페이지에서 원하는 일정과 강좌를 선택해 예약할 수 있습니다.', author: '관리자', time: '2025-07-29' },
        { number: 10, title: '[Q&A] 봉사자는 수업에 몇 분 전에 도착해야 하나요?', content: '원활한 준비를 위해 최소 10분 전에 도착해 주세요.', author: '관리자', time: '2025-07-28' },
        { number: 9, title: '[Q&A] 수강자는 수업에 어떻게 참여하나요?', content: '예약한 수업 시간에 해당 교육 장소로 방문하시면 됩니다.', author: '관리자', time: '2025-07-27' },
        { number: 8, title: '[Q&A] 수업에 지각하거나 결석하면 어떻게 되나요?', content: '지각이나 결석이 잦을 경우 수강 제한이 있을 수 있습니다.', author: '관리자', time: '2025-07-26' },
        { number: 7, title: '[Q&A] 봉사시간은 어떻게 인증받나요?', content: '출석 체크 후, 관리자의 확인을 거쳐 자동으로 봉사시간이 등록됩니다.', author: '관리자', time: '2025-07-25' },
        { number: 6, title: '[Q&A] 수업 자료는 제공되나요?', content: '필요 시 봉사자가 프린트물 등 자료를 준비할 수 있습니다.', author: '관리자', time: '2025-07-24' },
        { number: 5, title: '[Q&A] 수업 시간은 얼마나 되나요?', content: '수업은 기본적으로 1회 50분이며, 강좌에 따라 다를 수 있습니다.', author: '관리자', time: '2025-07-23' },
        { number: 4, title: '[Q&A] 누구나 수업에 참여할 수 있나요?', content: '네, 간단한 회원가입 후 누구나 수강 신청이 가능합니다.', author: '관리자', time: '2025-07-22' },
        { number: 3, title: '[Q&A] 봉사자가 수업을 변경하고 싶을 땐 어떻게 하나요?', content: '마이페이지 > 수업관리 메뉴에서 일정 변경 요청이 가능합니다.', author: '관리자', time: '2025-07-21' },
        { number: 2, title: '[Q&A] 수업 내용에 대한 질문은 어디서 하나요?', content: '수업 종료 후 Q&A 게시판을 통해 질문을 남기실 수 있습니다.', author: '관리자', time: '2025-07-20' },
        { number: 1, title: '[Q&A] 대면 수업이 어려운 경우 대체 방법이 있나요?', content: '현재는 대면 수업만 운영 중이며, 온라인 수업은 제공되지 않습니다.', author: '관리자', time: '2025-07-19' }
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
                <td><a href="csQnAView.html">${post.title}</a></td>
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
            window.location.href = 'csQnAWrite.html'; // 작성 페이지 경로
        });
    }
}