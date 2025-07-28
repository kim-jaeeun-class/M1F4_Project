window.onload = function () {
    bind();
};

function bind(){

    // 목록보기 누르면 공지사항 목록으로 이동
    document.querySelector('#backList').addEventListener('click', function(){
        window.location.href = "csMain.html";
    })

}