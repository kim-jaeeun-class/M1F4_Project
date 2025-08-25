// 페이지가 완전히 로드되면 init 함수 실행
window.addEventListener('load', init);

function init() {
    bind();
}

function bind() {
    // 뒤로가기 버튼
    const backBtn = document.querySelector('.before_pw')
    
    backBtn.addEventListener('click', function () {
        window.location.href = '/1_main/html/3_login.html';
    });
    

    // 라디오 버튼과 폼 영역 선택
    const radioPhone = document.querySelector('input[value="휴대폰번호로 발급받기"]');
    const radioEmail = document.querySelector('input[value="이메일로 발급받기"]');
    const li1 = document.querySelector('.li_1');
    const li2 = document.querySelector('.li_2');

    // 휴대폰 번호로 발급 선택 시
    radioPhone.addEventListener('change', () => {
        if (radioPhone.checked) {
            li1.style.display = 'flex';
            li2.style.display = 'none';
        }
    });

    // 이메일로 발급 선택 시
    radioEmail.addEventListener('change', () => {
        if (radioEmail.checked) {
            li1.style.display = 'none';
            li2.style.display = 'flex';
        }
    });

    // 임시 비밀번호 생성 함수
    function generateTempPassword(length = 8) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}<>?';
        let temp = '';
        for (let i = 0; i < length; i++) {
            temp += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return temp;
    }

    // 이메일 방식 '다음' 버튼 클릭 이벤트
    const emailSubmitBtn = document.querySelector('.email .email_input button[type="submit"]');
    emailSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const inputs = emailSubmitBtn.parentElement.querySelectorAll('input');
        const idPart = inputs[0].value.trim();           // 아이디 부분
        const domainPartInput = inputs[1];                // 도메인 input (직접입력 가능)
        const domainSelect = emailSubmitBtn.parentElement.querySelector('select'); // select 박스

        let fullEmail = '';
        // 직접입력 선택 시 도메인 input 값 사용, 아니면 select 값 사용
        if (domainSelect.value === '직접입력') {
            fullEmail = `${idPart}@${domainPartInput.value.trim()}`;
        } else {
            fullEmail = `${idPart}@${domainSelect.value}`;
        }

        // users 배열에서 해당 이메일 찾기
        const user = users.find(u => u.id === fullEmail);
        if (user) {
            const tempPw = generateTempPassword();
            alert(`임시 비밀번호: ${tempPw}`);
            window.location.href = '/1_main/html/3_login.html';
        } else {
            alert('해당 이메일로 등록된 계정을 찾을 수 없습니다.');
        }
    });

    // 휴대폰 방식 '다음' 버튼 클릭 이벤트
    const phoneSubmitBtn = document.querySelector('.phone .id_2_1 button[type="submit"]');
    phoneSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const emailInputs = document.querySelectorAll('.phone_email_input input');
        const idPart = emailInputs[0].value.trim();
        const domainPart = emailInputs[1].value.trim();
        const domainSelect = document.querySelector('.phone_email_input select');

        let fullEmail = '';
        if (domainSelect.value === '직접입력') {
            fullEmail = `${idPart}@${domainPart}`;
        } else {
            fullEmail = `${idPart}@${domainSelect.value}`;
        }

        const user = users.find(u => u.id === fullEmail);
        if (user) {
            const tempPw = generateTempPassword();
            alert(`임시 비밀번호: ${tempPw}`);
            window.location.href = '/1_main/html/3_login.html';
        } else {
            alert('해당 이메일로 등록된 계정을 찾을 수 없습니다.');
        }
    });

    // 엔터 키로 버튼 동작
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (radioEmail.checked) {
                emailSubmitBtn.click();
            } else if (radioPhone.checked) {
                phoneSubmitBtn.click();
            }
        }
    });


    // 이메일 도메인 select 요소와 domain input 선택
    const phoneEmailInput = document.querySelector('.phone_email_input');
    const phoneSelect = phoneEmailInput.querySelector('.id_2_sel');
    const phoneDomainInput = phoneEmailInput.querySelector('.email_domain');
    
    if (phoneSelect.value !== '직접입력') {
        phoneDomainInput.value = phoneSelect.value;
        phoneDomainInput.readOnly = true;
    } else {
        phoneDomainInput.value = '';
        phoneDomainInput.readOnly = false;
    }
    
    phoneSelect.addEventListener('change', () => {
        if (phoneSelect.value === '직접입력') {
            phoneDomainInput.value = '';
            phoneDomainInput.readOnly = false;
            phoneDomainInput.focus();
        } else {
            phoneDomainInput.value = phoneSelect.value;
            phoneDomainInput.readOnly = true;
        }
        
    });
    // 이메일 셀렉트
    const emailInput = document.querySelector('.email_input');
    const emailSelect = emailInput.querySelector('.id_2_sel');
    const emailDomainInput = emailInput.querySelector('.email_domain');
    
    if (emailSelect.value !== '직접입력') {
        emailDomainInput.value = emailSelect.value;
        emailDomainInput.readOnly = true;
    } else {
        emailDomainInput.value = '';
        emailDomainInput.readOnly = false;
    }
    
    emailSelect.addEventListener('change', () => {
        if (emailSelect.value === '직접입력') {
            emailDomainInput.value = '';
            emailDomainInput.readOnly = false;
            emailDomainInput.focus();
        } else {
            emailDomainInput.value = emailSelect.value;
            emailDomainInput.readOnly = true;
        }
        
    });
}
