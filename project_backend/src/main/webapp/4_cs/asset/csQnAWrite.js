window.addEventListener('load', bind6);

function bind6() {


    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
    });

    // 기존 게시글이 있으면 input에 채워 넣기 (수정용)
    const existingPost = JSON.parse(localStorage.getItem('tempPost'));
    if (existingPost) {
        document.getElementById('writeTitle').value = existingPost.title;
        document.getElementById('content').value = existingPost.content;
        document.getElementById('authorName').textContent = existingPost.author;
        document.getElementById('writeTime').textContent = existingPost.time;
    } else {
        // 새 글일 경우 현재 시간 삽입
        const now = new Date();
        const timeStr = now.toLocaleString();
        document.getElementById('writeTime').textContent = timeStr;
    }

    // 폼 제출 시 로컬스토리지에 저장 후 이동
    document.querySelector('.postForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('writeTitle').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('authorName').textContent;
        const time = document.getElementById('writeTime').textContent;

        const post = { title, content, author, time };

        localStorage.setItem('tempPost', JSON.stringify(post));

        location.href = 'csQnAWriterView.html';
    });
}