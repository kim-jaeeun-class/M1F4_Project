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

    // 버튼 클릭 이벤트(링크)
    const cancel = document.querySelector('#cancel');
    const input = document.querySelector('#input');
    
    if(cancel) {
        cancel.addEventListener('click', () => {
            window.location.href = '2_lecture_require.html';
        })
    }
    if(input) {
        input.addEventListener('click', () => {
            window.location.href = '2_lecture_require_detail.html';
        })
    }

    const dropdownBtn = document.querySelector('#dropdown-btn');
    const select = document.querySelector('.subject-list');

    dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        select.style.display = (select.style.display === 'block') ? 'none' : 'block';
    });

    // 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !select.contains(e.target)) {
            select.style.display = 'none';
        }
    });

    const checkboxes = document.querySelectorAll('.subject-con');
    const resultBox = document.querySelector('.result');

    // 그룹을 나누기 위해 상위 subject-box들을 기준으로 묶음
    const groups = document.querySelectorAll('.subject-box');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateResult);
    });

    function updateResult() {
        const groupResults = [];

        groups.forEach(group => {
            const selected = Array
                .from(group.querySelectorAll('input:checked'))
                .map(input => input.value);

            if (selected.length > 0) {
                groupResults.push(selected.join(','));
            }
        });

        resultBox.textContent = groupResults.length > 0
            ? groupResults.join(' | ')
            : '선택 없음';
    }

}