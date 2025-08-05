window.addEventListener('load', bindFAQ);

/*
원래 function bind() 대괄호 내용만 작성했는데,
혹시나 싶어 감싸는 구조랑 주석 추가해둡니다.
*/
function bindFAQ() {
    
    $(document).ready(function () {
    // 현재 파일 이름 추출
    const currentPage = location.pathname.split('/').pop();

        // 각 카테고리 링크를 순회하면서 href가 현재 페이지와 같으면 .active 클래스 추가
        $('.csCategory-list a').each(function () {
            const linkPage = $(this).attr('href');
            if (linkPage === currentPage) {
                $(this).addClass('active');
            }
        });
    });

    // 세 개의 탭버튼을 눌렀을 때 해당하는 박스만 보이게
    $(document).ready(function() {
        // 초기 상태: 첫 번째 탭 관련 아코디언만 보여줌
        $('.accordio_box').hide();
        $('.accordio_box.login').show();
        $('.tab.login').addClass('active');

        $('.tab-list .tab').click(function() {
            const target = $(this).attr('class').split(' ').pop(); // 'login', 'lecture', 'etc'

            // 이미 활성화된 탭을 또 눌러도 무시
            if ($(this).hasClass('active')) return;

            // 탭 활성화 스타일 변경
            $('.tab').removeClass('active');
            $(this).addClass('active');

            // 아코디언 박스 보여줄 항목만 표시
            $('.accordio_box').hide();
            $('.accordio_box.' + target).show();
        });
    });

    /* 질문 목록이 아코디언 파일처럼 접히고 펴지게 */
    $(".accordio_box ol li").click(function(){
        $(this).toggleClass("on");
    });



    
}