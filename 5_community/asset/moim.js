window.addEventListener('load', bind);

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

    // 이벤트 추가 필요할 경우 이 아래로 삽입

}