// window.addEventListener('load', bind); 
// headfooter에서 bind 를 하기떄문에 여기서 한번더 호출하면 증복 호출이 됩니다.



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

    // 페이지네이션 구현 시작
    const rowsPerPage = 10;
    const tbody = document.querySelector('#table-body');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    let currentPage = 1;
    let currentGroup = 1;
    const paginationContainer = document.getElementById('pagination');

    function renderTable(page) {
        tbody.innerHTML = '';
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageRows = rows.slice(start, end);
        pageRows.forEach(row => tbody.appendChild(row));
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';

        const groupSize = 10;
        const totalGroups = Math.ceil(totalPages / groupSize);
        const startPage = (currentGroup - 1) * groupSize + 1;
        const endPage = Math.min(currentGroup * groupSize, totalPages);

        // 이전 버튼
        if (currentGroup > 1) {
            const prevBtn = createPageButton('이전', () => {
                currentGroup--;
                currentPage = (currentGroup - 1) * groupSize + 1;
                renderTable(currentPage);
                renderPagination();
            });
            paginationContainer.appendChild(prevBtn);
        }

        // 페이지 번호 버튼
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = createPageButton(i, () => {
                currentPage = i;
                renderTable(currentPage);
                renderPagination();
            });
            if (i === currentPage) {
                pageBtn.style.fontWeight = 'bold';
                pageBtn.style.color = '#3e6b3e';
            }
            paginationContainer.appendChild(pageBtn);
        }

        // 이후 버튼
        if (currentGroup < totalGroups) {
            const nextBtn = createPageButton('이후', () => {
                currentGroup++;
                currentPage = (currentGroup - 1) * groupSize + 1;
                renderTable(currentPage);
                renderPagination();
            });
            paginationContainer.appendChild(nextBtn);
        }
    }

    function createPageButton(label, onClick) {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.style.margin = '0 5px';
        btn.style.padding = '5px 10px';
        btn.style.border = '1px solid #3e6b3e';
        btn.style.borderRadius = '5px';
        btn.style.backgroundColor = '#fff';
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', onClick);
        return btn;
    }

    // 초기 페이지 로딩
    renderTable(currentPage);
    renderPagination();

}