window.addEventListener('load', bind);

function bind() {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const categoryMenu = document.getElementById('category-menu');

    hamburgerBtn.addEventListener('click', () => {
        categoryMenu
            .classList
            .toggle('show');
    });

    const moreBtn = document.querySelector('.more-btn');
    const cards = document.querySelectorAll('.contents-card');

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
            hiddenCards[i].style.display = 'block';
            visibleCount++;
        }

        // 더 이상 보여줄 카드가 없으면 버튼 숨기기
        if (visibleCount >= cards.length) {
            moreBtn.style.display = 'none';
        }
    })
}