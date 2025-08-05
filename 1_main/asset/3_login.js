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

        let foundUser = null;

        for (const user of users) {
            if (user.id === inputId && user.password === inputPw) {
                foundUser = user;
                break;
            }
        }


        if (foundUser) {
            // 로그인 성공 시 현재 유저 정보 저장
            localStorage.setItem('currentUser', JSON.stringify(foundUser));

            // 역할에 따라 페이지 이동
            if (foundUser.role === 'admin') {
                window.location.href = '/admin.html';
            } else if (foundUser.role !== 'admin') {
                window.location.href = '/1_main/html/1_mainpage.html';
            } else {
                alert('알 수 없는 사용자 권한입니다.');
            }
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