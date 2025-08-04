window.addEventListener('load', bind);

function bind() {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const categoryMenu = document.getElementById('category-menu');

    if (hamburgerBtn && categoryMenu) {
        hamburgerBtn.addEventListener('click', () => {
            categoryMenu.classList.toggle('show');
        });
    }

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
    });

    const post = JSON.parse(localStorage.getItem('tempPost'));

    if (post) {
        document.getElementById('postTitle').textContent = post.title;
        document.getElementById('postAuthor').textContent = post.author;
        document.getElementById('postTime').textContent = post.time;
        document.getElementById('postContent').textContent = post.content;
    } else {
        document.querySelector('.form').innerHTML = '<p>불러올 게시글이 없습니다.</p>';
    }

    document.getElementById('backList').addEventListener('click', () => {
        window.location.href = "csQnA.html";
    });

    document.getElementById('edit').addEventListener('click', () => {
        window.location.href = "csQnAWrite.html";
    });

    document.getElementById('delete').addEventListener('click', () => {
        localStorage.removeItem('tempPost');
        alert("게시글이 삭제되었습니다.");
        window.location.href = "csQnA.html";
    });
}