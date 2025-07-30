window.addEventListener('load', bind);

function bind() {
    // 햄버거 버튼 부분
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const categoryMenu = document.getElementById('category-menu');

    hamburgerBtn.addEventListener('click', () => {
        categoryMenu
            .classList
            .toggle('show');
    });

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document
                .activeElement
                .blur();
        }
    });

    // 배너 슬라이드
    const images = document.querySelectorAll(".banner-block > div");
    let index = 0;
    let intervalId;

    function showImage(i) {
        images.forEach((img, idx) => {
            img
                .classList
                .remove("active");
            if (idx === i) {
                img
                    .classList
                    .add("active");
            }
        });
    }

    function startSlide() {
        intervalId = setInterval(() => {
            index = (index + 1) % images.length;
            showImage(index);
        }, 2000);
    }

    function stopSlide() {
        clearInterval(intervalId);
    }

    showImage(index);
    startSlide();

    // 배너 슬라이드 버튼
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

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

    // 로그인 시 화면 전환
    const loginBtn = document.querySelector('#login-btn');
    const loginBlock = document.querySelector('.login-block');
    const loginDone = document.querySelector('.login-done');

    loginBtn.addEventListener('click', () => {
        loginBlock.style.display = 'none';
        loginDone.style.display = 'block';
    });

    // 로그아웃 클릭 시 화면 전환

    const logout = document.querySelector('.logout');

    logout.addEventListener('click', () => {
        loginDone.style.display = 'none';
        loginBlock.style.display = 'block';
    });
}