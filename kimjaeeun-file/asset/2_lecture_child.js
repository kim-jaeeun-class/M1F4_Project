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

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document
                .activeElement
                .blur();
        }
    });

    const moreBtn = document.querySelector('.more-btn');
    const cards = document.querySelectorAll('.review');

    let visibleCount = 6; // 처음 보여줄 카드 개수
    moreBtn.addEventListener('click', () => {
        let hiddenCards = Array
            .from(cards)
            .filter(card => card.style.display === 'none');
        if (hiddenCards.length === 0) {
            alert('더 이상 카드가 없습니다.');
            return;
        }
        // 다음 6개 보여주기
        for (let i = 0; i < 6 && i < hiddenCards.length; i++) {
            hiddenCards[i].style.display = 'flex';
            visibleCount++;
        }

        // 더 이상 보여줄 카드가 없으면 버튼 숨기기
        if (visibleCount >= cards.length) {
            moreBtn.style.display = 'none';
        }
    })

}