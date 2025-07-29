window.addEventListener('load', bind);

function bind() {

    // 모바일에서 상단 카테고리 출력

    const hamburgerBtn = document.getElementById('hamburger-menu');
    const categoryMenu = document.getElementById('category-menu');

    hamburgerBtn.addEventListener('click', () => {
        categoryMenu
            .classList
            .toggle('show');
    });

    // 탭 버튼

    const tabs = document.querySelectorAll('.tab');
    const contentMap = {
        'tab-info': 'contents-info',
        'tab-inquiry': 'contents-inquiry',
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

    // a 태그 css 문제 해결용

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document
                .activeElement
                .blur();
        }
    });

    // 더 보기 버튼

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

    // 신청 버튼 : alert로 완료됐다는 알림창만 띄우도록

    const apply = document.querySelector('.apply');

    apply.addEventListener('click', () => {
        alert(
            '신청이 완료되었습니다.\n최종 승인은 담당자 확인 후 반영됩니다.\n승인 처리 시, 선택하신 알림 서비스로 결과를 알려드립니다.'
        );
    })

}