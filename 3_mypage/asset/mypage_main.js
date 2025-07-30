window.addEventListener('load', init);   
                                         
function init(){
    
    
    bind();
}
function bind() {
    
    // 예시 JSON 사용자 데이터
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
        },
        {
            id: 'tofhdns1130@naver.com',
            role: 'student',
            password: 'tofhdns'
        }
    ];
    const currentUserId = 'user02@gmail.com';
   
    // 화면에 아이디 표시
    document.getElementById('fix_id').textContent = currentUserId;
    
    // 비밀번호 확인 후 이동
    function confirm() {
        const input = document.getElementById('passwordInput').value;

        let found = false;

        // users 배열을 직접 순회하면서 id, password 동시에 확인
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === currentUserId && users[i].password === input) {
                found = true;

                // 역할에 따라 페이지 이동
                if (users[i].role === 'student') {
                    window.location.href = '../../3_mypage/html/studylist_student.html';
                } else if (users[i].role === 'volunteer') {
                    window.location.href = '../../3_mypage/html/studylist_volunteer.html';
                } else {
                    alert('알 수 없는 사용자 역할입니다.');
                }
                break;
            } 
        }
            
            if (!found) {
                alert('비밀번호가 틀렸습니다.');
            }
    }

    // 버튼 클릭 이벤트
    document.getElementById('button').addEventListener('click', confirm);

    // 엔터키 눌렀을 때 동작
    document.getElementById('passwordInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 동작 막기
            confirm();
        }
    });

}