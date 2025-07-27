window.addEventListener('load', bind);

function bind() {

    const hamburgerBtn = document.getElementById('hamburger-menu');
    const categoryMenu = document.getElementById('category-menu');

    hamburgerBtn.addEventListener('click', () => {
        categoryMenu
            .classList
            .toggle('show');
    });

    const tabs = document.querySelectorAll('.tab');
    const contentMap = {
        'tab-info': 'contents-info',
        'tab-inquery': 'contents-inquery',
        'tab-review': 'contents-review'
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 모든 콘텐츠 숨김
            document
                .querySelectorAll('.tab-content')
                .forEach(c => c.classList.remove('active'));

            // 현재 탭에 해당하는 콘텐츠만 보이게
            const contentId = contentMap[tab.classList[1]]; // 예: tab-info → contents-info
            document
                .querySelector(`.${contentId}`)
                .classList
                .add('active');
        });
    });

}