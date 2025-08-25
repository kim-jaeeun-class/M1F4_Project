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

    // 버튼 클릭 이벤트 : 작성 취소, 작성 완료
    // 작성 취소 버튼을 누를 시, 정말 취소하시겠습니까?라는 알림창을 표시한 후
    // 알림창의 확인 버튼을 누르면 글 작성이 취소되었습니다라는 알림과 함께
    // 지정한 페이지로 이동
    // 작성 버튼을 누르면 제목, 주제, 날짜, 내용 값이 전부 있는 지 확인 후,
    // 값이 있을 때만 글 작성이 완료됐다는 알림창 표시한 후 페이지 이동
    // 아니면 00를 작성하지 않으셨습니다라는 내용의 알림창을 띄움
    const cancel = document.querySelector('#cancel');
    const input = document.querySelector('#input');

    if (cancel) {
        cancel.addEventListener('click', () => {
            const confirmed = confirm('정말 글 작성을 취소하시겠습니까?');
            if (confirmed) {
                alert('글 작성이 취소되었습니다.');
                setTimeout(() => {
                    window.location.href = '2_lecture_require.html';
                }, 100);
            }
        });
    }

    let isSubmitted = false;

    if (input) {
        input.addEventListener('click', () => {
            if (isSubmitted) 
                return; // 이미 클릭된 경우 무시
            isSubmitted = true;

            const title = document
                .querySelector('.input-txt')
                .value
                .trim();
            const checkedSubjects = document.querySelectorAll('.subject-con:checked');
            const date = document
                .querySelector('.date-sel')
                .value;
            const content = document
                .querySelector('.write')
                .value
                .trim();

            if (!title) {
                alert('제목이 작성되지 않았습니다.');
                isSubmitted = false;
                return;
            }
            if (checkedSubjects.length === 0) {
                alert('주제를 선택하지 않았습니다.');
                isSubmitted = false;
                return;
            }
            if (!date) {
                alert('날짜가 선택되지 않았습니다.');
                isSubmitted = false;
                return;
            }
            if (!content) {
                alert('내용이 작성되지 않았습니다.');
                isSubmitted = false;
                return;
            }

            alert('글 작성이 완료되었습니다.');
            setTimeout(() => {
                window.location.href = '2_lecture_require_detail.html';
            }, 100);
        });
    }
}