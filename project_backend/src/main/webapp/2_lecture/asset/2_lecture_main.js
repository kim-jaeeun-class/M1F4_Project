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
    // 필터링

    const dropdownBtn = document.querySelector('#dropdown-btn');
    const dropdownMenu = document.querySelector('#dropdown-menu');
    const applyBtn = document.querySelector('#apply-btn');
    const resetBtn = document.querySelector('#reset-btn');
    const selectedFilters = document.querySelector('#selected-filters');
    const checkboxes = document.querySelectorAll('#filter-form input[type="checkbox"]');

    // 드롭다운 열기/닫기
    dropdownBtn.addEventListener('click', () => {
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        }
        else {
            dropdownMenu.style.display = 'none';
        }
    });

    // 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

    // 적용 버튼 클릭 시 선택값 표시
    applyBtn.addEventListener('click', () => {
        const filterForm = document.querySelector('#filter-form');

        // 범주별로 분리하여 값 가져오기
        const selectedRegion = filterForm.querySelector('input[name="region"]:checked');
        const selectedPeriod = filterForm.querySelector('input[name="period"]:checked');
        const selectedSubjects = Array.from(
            filterForm.querySelectorAll('input[name="subject"]:checked')
        );

        const selectedTexts = [];

        if (selectedRegion) {
            selectedTexts.push(`지역: ${selectedRegion.value}`);
        }

        if (selectedSubjects.length > 0) {
            const subjectValues = selectedSubjects.map(cb => cb.value).join(', ');
            selectedTexts.push(`주제: ${subjectValues}`);
        }

        if (selectedPeriod) {
            selectedTexts.push(`기간: ${selectedPeriod.value}`);
        }

        selectedFilters.textContent = selectedTexts.length > 0
            ? selectedTexts.join(' | ')
            : '선택 없음';

        dropdownMenu.style.display = 'none';
    });


    // 초기화 버튼 클릭 시 전체 해제 및 초기화
    resetBtn.addEventListener('click', () => {
        document.querySelectorAll('#filter-form input').forEach(input => input.checked = false);
        selectedFilters.textContent = '선택 없음';
    });

    // 더 보기

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

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document
                .activeElement
                .blur();
        }
    });
}