window.addEventListener('load', init);   
                                         
function init(){
    
    
    bind();
}
function bind() {

    const users = [
        { 
            id: 'user01@naver.com', 
            role: 'student', 
            password: '1234' 
        },
        { 
            id: 'user02@gmail.com', 
            role: 'volunteer', 
            password: '0000' 
        }
    ];

    const idInput = document.querySelector('.id');
    const pwInput = document.querySelector('.pw');
    const loginButton = document.querySelector('button[type="submit"]');

    // 로그인 함수
    function login() {
        const inputId = idInput.value.trim();
        const inputPw = pwInput.value.trim();
        let found = false;

        for (let i = 0; i < users.length; i++) {
            if (users[i].id === inputId && users[i].password === inputPw) {
                found = true;

                // 메인 페이지로 이동 중
                window.location.href = '/1_main/html/1_mainpage.html';
                break;
            }
        }

        if (!found) {
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    }

    // 클릭으로 로그인
    loginButton.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 제출 방지
        login();
    });

    // 엔터 키로 로그인
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            login();
        }
    });

}