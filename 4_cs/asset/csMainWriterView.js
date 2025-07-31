window.addEventListener('load', bind);

function bind() {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const categoryMenu = document.getElementById('category-menu');

    hamburgerBtn.addEventListener('click', () => {
        categoryMenu.classList.toggle('show');
    });

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
    });

    // ✅ 게시글 불러오기
    const post = JSON.parse(localStorage.getItem('tempPost'));

    if (post) {
        document.getElementById('postTitle').textContent = post.title;
        document.getElementById('postAuthor').textContent = post.author;
        document.getElementById('postTime').textContent = post.time;
        document.getElementById('postContent').textContent = post.content;
    } else {
        document.querySelector('.form').innerHTML = '<p>불러올 게시글이 없습니다.</p>';
    }

    // 목록보기 누르면 공지사항 목록으로 이동
    document.querySelector('#backList').addEventListener('click', function () {
        window.location.href = "csMain.html"; // ✔ 목록 페이지 경로
    });

    // ✅ 수정 버튼 → 작성 페이지로 이동
    document.getElementById('pre').addEventListener('click', function () {
        window.location.href = "csMainView-v2.html"; // ✔ 수정은 작성 페이지로 이동 (확장 시 편집 기능도 가능)
    });

    // ✅ 삭제 버튼 → localStorage에서 삭제하고 목록으로 이동
    document.getElementById('next').addEventListener('click', function () {
        localStorage.removeItem('tempPost');
        alert("게시글이 삭제되었습니다.");
        window.location.href = "csMain.html";
    });
}