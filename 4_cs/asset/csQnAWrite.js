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
    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hour = String(now.getHours()).padStart(2, "0");
        const minute = String(now.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    document.getElementById("writeTime").textContent = getCurrentDateTime();

    // 폼 제출 처리 (예: 서버에 POST 전송 or 화면에 출력)
    document.querySelector(".postForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.querySelector("#writeTitle").value;
        const content = document.querySelector("#content").value;

        // 글 작성 누르면 작성된 글로 이동
        // 여기서 서버로 데이터를 보낼 수도 있고, 지금은 간단히 alert로 표시
        alert("글이 작성되었습니다!\n제목: " + title + "\n본문:\n" + content);
        window.location.href = "csQnAView.html";

        // 제출 후 폼 초기화
        this.reset();

        // 작성시간 갱신
        document.getElementById("writeTime").textContent = getCurrentDateTime();
    });


    // 글 작성 누르면 작성된 글로 이동
    
}