window.addEventListener('load', init);   
                                         
function init(){
    
   const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('로그인이 필요합니다.');
        window.location.href = '/1_main/html/3_login.html';
        return;
    }

    // 로그인 정보가 있을 경우, 아이디를 마이페이지에 출력
    const userFixId = document.getElementById("fix_id");
    if (userFixId) {
        userFixId.textContent = currentUser.id;
    }
    bindTab();
    bindmypage(currentUser); // currentUser 전달
}
function bindmypage(currentUser) {

    // 비밀번호 확인 후 이동
    function confirm() {
        const input = document.getElementById('passwordInput').value;

        if (input === currentUser.password) {
            if (!currentUser) {
                alert('알 수 없는 사용자 역할입니다.');
            } else {
                window.location.href = '../../3_mypage/html/info_edit.html';
            }
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    }

    // 버튼 클릭 이벤트
    document.getElementById('button').addEventListener('click', confirm);

    // 엔터키 눌렀을 때 동작
    document.getElementById('passwordInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            confirm();
        }
    });
}

function bindTab() {
    document.querySelector('.tab_1').addEventListener('click', function () {
        window.location.href = '/3_mypage/html/studylist.html';
    });
    document.querySelector('.tab_2').addEventListener('click', function () {
        window.location.href = '/3_mypage/html/mypage_main.html';
    });
}