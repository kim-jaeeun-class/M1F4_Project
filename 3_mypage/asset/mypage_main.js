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

    bind(currentUser); // currentUser 전달
}
function bind(currentUser) {

    // 비밀번호 확인 후 이동
    function confirm() {
        const input = document.getElementById('passwordInput').value;

        if (input === currentUser.password) {
            if (currentUser.role === 'student') {
                window.location.href = '../../3_mypage/html/studylist_student.html';
            } else if (currentUser.role === 'volunteer') {
                window.location.href = '../../3_mypage/html/studylist_volunteer.html';
            } else {
                alert('알 수 없는 사용자 역할입니다.');
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