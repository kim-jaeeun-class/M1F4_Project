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

    document.querySelector('.allUpload').addEventListener('click', ()=>{
        window.location.href = '/5_community/html/moimWriterView.html';
    })

    // 이벤트 추가 필요할 경우 이 아래로 삽입

}