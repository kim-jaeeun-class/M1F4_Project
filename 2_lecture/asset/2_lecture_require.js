window.addEventListener('load', bind);

/*
원래 function bind() 대괄호 내용만 작성했는데,
혹시나 싶어 감싸는 구조랑 주석 추가해둡니다.
*/
function bind() {
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

    // 이벤트 추가 필요할 경우 이 아래로 삽입

    // // ✅ 테이블 렌더링 함수
    //     function renderTable(page = 1) {
    //         const start = (page - 1) * postsPerPage;
    //         const end = start + postsPerPage;
    //         const pagePosts = filteredPosts.slice(start, end);

    //         const tbody = document.getElementById('tableBody');
    //         tbody.innerHTML = ''; // 기존 내용 초기화

    //         pagePosts.forEach(post => {
    //             const row = document.createElement('tr');
    //             row.innerHTML = `
    //             <td>${post.number}</td>
    //             <td><a href="csMainView.html">${post.title}</a></td>
    //             <td>${post.author}</td>
    //             <td>${post.time}</td>
    //             `;
    //             tbody.appendChild(row);
    //         });

    //         currentPage = page;
    //         renderPagination();
    //     }

    //     // ✅ 페이지네이션 렌더링 함수
    //     function renderPagination() {
    //     const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    //     const pagination = document.getElementById('pagination');
    //     pagination.innerHTML = '';

    //     let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    //     let endPage = startPage + maxVisibleButtons - 1;

    //     if (endPage > totalPages) {
    //         endPage = totalPages;
    //         startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    //     }

    //     // ◀ 이전 버튼
    //     if (startPage > 1) {
    //         const prevBtn = document.createElement('button');
    //         prevBtn.textContent = '◀';
    //         prevBtn.addEventListener('click', () => {
    //             currentPage = Math.max(1, currentPage - 1);
    //             renderTable(currentPage);
    //             renderPagination();
    //         });
    //         pagination.appendChild(prevBtn);
    //     }

    //     // 페이지 번호 버튼
    //     for (let i = startPage; i <= endPage; i++) {
    //         const btn = document.createElement('button');
    //         btn.textContent = i;
    //         btn.className = (i === currentPage) ? 'active' : '';
    //         btn.addEventListener('click', () => {
    //             currentPage = i;
    //             renderTable(i);
    //             renderPagination();
    //         });
    //         pagination.appendChild(btn);
    //     }

    //     // ▶ 다음 버튼
    //     if (endPage < totalPages) {
    //         const nextBtn = document.createElement('button');
    //         nextBtn.textContent = '▶';
    //         nextBtn.addEventListener('click', () => {
    //             currentPage = Math.min(totalPages, currentPage + 1);
    //             renderTable(currentPage);
    //             renderPagination();
    //         });
    //         pagination.appendChild(nextBtn);
    //     }
    // }

}