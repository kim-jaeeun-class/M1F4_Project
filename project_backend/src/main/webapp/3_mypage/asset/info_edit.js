window.addEventListener('load', init);

function init() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('로그인이 필요합니다.');
        window.location.href = '/1_main/html/3_login.html';
        return;
    }

    const userFixId = document.getElementById("fix_id");
    if (userFixId) {
        userFixId.value = currentUser.id;
    }
    bindTab();
    binduser(currentUser);
}

function correctPassword(password) {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck;
}

function bindTab() {
    document.querySelector('.tab_1').addEventListener('click', function () {
        window.location.href = '/3_mypage/html/studylist.html';
    });
    document.querySelector('.tab_2').addEventListener('click', function () {
        window.location.href = '/3_mypage/html/mypage_main.html';
    });
}

function binduser(user) {
    // 정보
    const nickname = document.querySelector(".nickname");
    const pw = document.querySelector(".password");
    const interest = document.querySelector(".interest");
    const region = document.querySelector(".region");
    const zipCode = document.querySelector(".zipcode");
    const address = document.querySelector(".address");
    
    // 초기값
    nickname.value = user.nickname || "";
    pw.value = user.password || "";
    interest.value = user.interest || "";
    region.value = user.region || "";
    zipCode.value = user.zipcode || "";
    address.value = user.address || "";


    // 기존 프로필 사진
    const profile = document.querySelector(".profile");
    
    if (user.profile) {
        profile.style.backgroundImage = `url(${user.profile})`;
    }
    
    // 프로필 사진 변경
    const profileButton = document.querySelector(".profile_button button");
    
    profileButton.addEventListener("click", () => {
        
        const profileFile = document.createElement("input");
        
        profileFile.type = "file";
        profileFile.accept = "image/*";
        profileFile.addEventListener("change", () => {
            const file = profileFile.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {

                const imageDataUrl = e.target.result;

                profile.style.backgroundImage = `url(${imageDataUrl})`;
                user.profile = imageDataUrl;
            };
            reader.readAsDataURL(file);
        });

        profileFile.click();
    });
    
    // 다음 주소 API 연동
    const zipBtn = document.querySelector(".zipBtn");

    zipBtn.addEventListener('click', function () {
        new daum.Postcode({
            oncomplete: function (data) {
                zipCode.value = data.zonecode;
                address.value = data.address;
            }
        }).open();
    });
    
    // 저장하기
    const saveButton = document.querySelector(".save button");
    
    saveButton.addEventListener("click", () => {
        
        const newNickname = nickname.value.trim();
        const newPassword = pw.value.trim();
        
        if (!newNickname || !newPassword) {
            alert("닉네임과 비밀번호는 필수입니다.");
            return;
        }
        
        if (!correctPassword(newPassword)) {
            alert("비밀번호는 8자 이상이며, 대소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.");
            return;
        }


        const detailAddress = document.querySelector(".detail");
        
        user.nickname = newNickname;
        user.password = newPassword;
        user.interest = interest.value;
        user.region = region.value;
        user.zipcode = zipCode.value;
        user.detailAddress = detailAddress.value;
        
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];

        for(let i = 0; i < allUsers.length; i++) {
            if(allUsers[i].id === user.id) {
                allUsers[i] = user;
                break;
            }
        }

        localStorage.setItem("users", JSON.stringify(allUsers));
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        alert("회원정보가 수정되었습니다.");
    });
    
    // 회원탈퇴
    const quitButton = document.querySelector(".quit button");

    quitButton.addEventListener("click", () => {

        const confirmDelete = confirm("정말 탈퇴하시겠습니까?");
        
        if (!confirmDelete) return;
        
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];

        const remainingUsers = [];
            for(let i = 0; i < allUsers.length; i++) {

                if(allUsers[i].id !== user.id) {

                    remainingUsers.push(allUsers[i]);
                }
            }

        localStorage.setItem("users", JSON.stringify(remainingUsers));
        localStorage.removeItem("currentUser");

        alert("탈퇴되었습니다.");
        window.location.href = "../../1_main/html/1_mainpage.html";
    });
}
