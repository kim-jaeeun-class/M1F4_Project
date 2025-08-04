window.addEventListener('load', bind);

// 

function bind() {
    // 햄버거 버튼 부분
    const hamburgerBtn = document.querySelector('#hamburger-menu');
    const categoryMenu = document.querySelector('#category-menu');

    if (hamburgerBtn && categoryMenu) {
        hamburgerBtn.addEventListener('click', () => {
            categoryMenu.classList.toggle('show');
        });
    }

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
    });

    // 배너 슬라이드
    const images = document.querySelectorAll(".banner-block > div");
    let index = 0;
    let intervalId;

    function showImage(i) {
        images.forEach((img, idx) => {
            img.classList.remove("active");
            if (idx === i) {
                img.classList.add("active");
            }
        });
    }

    function startSlide() {
        intervalId = setInterval(() => {
            index = (index + 1) % images.length;
            showImage(index);
        }, 5000);
    }

    function stopSlide() {
        clearInterval(intervalId);
    }

    showImage(index);
    startSlide();

    // 배너 슬라이드 버튼
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlide();
            index = (index - 1 + images.length) % images.length;
            showImage(index);
            startSlide();
        });

        nextBtn.addEventListener('click', () => {
            stopSlide();
            index = (index + 1) % images.length;
            showImage(index);
            startSlide();
        });
    }

    // 로그인 버튼 클릭 이벤트

    const loginBtn = document.querySelector('#login-btn');
    const gaipBtn = document.querySelector('.login-gaip');
    
    if(loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = '3_login.html';
        })
    }
    if(gaipBtn) {
        gaipBtn.addEventListener('click', () => {
            window.location.href = '2_make_account_v3.html';
        })
    }

    // 추가 요청 js

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const loginBlock = document.querySelector('.login-block');
    const loginDone = document.querySelector('.login-done');
    const logoutBtn = document.querySelector('.logout');

    if (currentUser && currentUser.id) {

        // 로그인 상태 UI
        if (loginBlock) loginBlock.style.display = 'none';
        if (loginDone) loginDone.style.display = 'block';

        if (logoutBtn) {

        logoutBtn.addEventListener('click', function () {

            localStorage.removeItem('currentUser');
            location.reload();

        });
        }
    } else {

        // 비로그인 상태 UI
        if (loginDone) loginDone.style.display = 'none';
        if (loginBlock) loginBlock.style.display = 'block';

    }

}
