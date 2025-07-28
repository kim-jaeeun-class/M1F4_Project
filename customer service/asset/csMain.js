window.onload = function () {
    bind();
};

function bind(){
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


    /* 게시글 표시 리스트 + 목록 */
    // 예시 게시글 데이터 25개 생성
    const posts = [];
    for(let i = 1; i <= 25; i++) {
        posts.push({
            number: i,
            title: `[공지사항] 제목 예시 ${i}`,
            author: '관리자',
            time: `2025-07-${(i%30+1).toString().padStart(2,'0')}`
        });
    }

    const postsPerPage = 10;
    let currentPage = 1;

    function renderTable(page) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        const sortedPosts = [...posts].sort((a, b) => b.number - a.number); // 번호 기준 역순 정렬

        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pagePosts = sortedPosts.slice(start, end);

        for(const post of pagePosts) {
            const tr = document.createElement('tr');

            tr.innerHTML = `
            <td>${post.number}</td>
            <td><a href="csMainArticle.html">${post.title}</a></td>
            <td>${post.author}</td>
            <td>${post.time}</td>
            `;
            tableBody.appendChild(tr);
        }
        renderPagination();
    } 

    function renderPagination() {
        let paginationDiv = document.getElementById('pagination');
        if(!paginationDiv){
            paginationDiv = document.createElement('div');
            paginationDiv.id = 'pagination';
            paginationDiv.style.textAlign = 'center';
            paginationDiv.style.marginTop = '15px';
            document.querySelector('.notice-contents').appendChild(paginationDiv);
        }

        const totalPages = Math.ceil(posts.length / postsPerPage);

        paginationDiv.innerHTML = `
            <button id="prevBtn" ${currentPage === 1 ? 'disabled' : ''}>이전</button>
            <span style="margin:0 10px;">${currentPage} / ${totalPages}</span>
            <button id="nextBtn" ${currentPage === totalPages ? 'disabled' : ''}>다음</button>
    `;

        document.getElementById('prevBtn').onclick = () => {
            if(currentPage > 1) {
                currentPage--;
                renderTable(currentPage);
            }
        };
        document.getElementById('nextBtn').onclick = () => {
            if(currentPage < totalPages) {
                currentPage++;
                renderTable(currentPage);
            }
        };
    }
    // 초기 표시
    renderTable(currentPage);

    

}