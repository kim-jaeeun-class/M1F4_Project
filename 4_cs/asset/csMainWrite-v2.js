window.addEventListener('load', bind);

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


    // 작성 시간 자동 삽입
    window.addEventListener('DOMContentLoaded', () => {
        const now = new Date();
        const timeStr = now.toLocaleString(); // 예: 2025. 7. 31. 오전 11:11
        document.getElementById('writeTime').textContent = timeStr;
    });

    // 폼 제출 시 로컬스토리지에 저장 후 이동
    document.querySelector('.postForm').addEventListener('submit', function (e) {
        e.preventDefault(); // 폼 기본 제출 막기

        const title = document.getElementById('writeTitle').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('authorName').textContent;
        const time = document.getElementById('writeTime').textContent;

        const post = {
            title,
            content,
            author,
            time
        };

        // localStorage에 저장
        localStorage.setItem('tempPost', JSON.stringify(post));

        // 보기 페이지로 이동
        location.href = 'csMainWriterView.html';
    });


    // 글 작성 누르면 작성된 글로 이동
    
}