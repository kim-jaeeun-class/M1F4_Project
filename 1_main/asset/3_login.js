window.addEventListener('load', init);   
                                         
function init(){
    
    
    bind();
}
function bind() {

    const idInput = document.querySelector('.id');
    const pwInput = document.querySelector('.pw');
    const loginButton = document.querySelector('button[type="submit"]');
    
    // 로그인 함수
    function login() {
        const inputId = idInput.value.trim();
        const inputPw = pwInput.value.trim();

        if (!inputId || !inputPw) {
            alert('아이디와 비밀번호를 모두 입력하세요.');
            return;
        }

        const foundUser = users.find(u => u.id === inputId && u.password === inputPw);

        if (foundUser) {
            // 로그인 성공 시 현재 유저 정보 저장
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            window.location.href = '/1_main/html/1-1_mainpage_login.html';
        } else {
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