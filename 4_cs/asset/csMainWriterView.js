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
        document.querySelector('.postform').innerHTML = '<p>불러올 게시글이 없습니다.</p>';
    }

    // ✅ 목록보기
    document.getElementById('backList').addEventListener('click', function () {
        window.location.href = "csMain.html";
    });

    // ✅ 수정
    document.getElementById('edit').addEventListener('click', function () {
        // 수정 시 기존 데이터를 유지한 채 작성 페이지로 이동
        window.location.href = "csMainWrite.html";
    });

    // ✅ 삭제
    document.getElementById('delete').addEventListener('click', function () {
        localStorage.removeItem('tempPost');
        alert("게시글이 삭제되었습니다.");
        window.location.href = "csMain.html";
    });
}