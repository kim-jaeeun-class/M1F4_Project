window.addEventListener('load', bind);

/*
원래 function bind() 대괄호 내용만 작성했는데,
혹시나 싶어 감싸는 구조랑 주석 추가해둡니다.
*/
function bind() {
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

    // 이벤트 추가 필요할 경우 이 아래로 삽입

    function createParticle(x, y, type) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        document.body.appendChild(particle);

        const size = Math.floor(Math.random() * 20 + 5);

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const destinationX = x + (Math.random() - 0.5) * 2 * 75;
        const destinationY = y + (Math.random() - 0.5) * 2 * 75;

        switch (type) {
            case "circle":
                particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
                particle.style.borderRadius = "50%";
                break;
            default:
                particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
        }

        const animation = particle.animate([
            {
                transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
                opacity: 1
            },
            {
                transform: `translate(${destinationX}px, ${destinationY}px)`,
                opacity: 0
            }
        ], {
            duration: 500 + Math.random() * 1000,
            easing: "cubic-bezier(0, .9, .57, 1)",
            delay: Math.random() * 200
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }

    // 여러 개 파티클 생성 (개수 지정)
    function createParticles(count, x, y, type) {
        for (let i = 0; i < count; i++) {
            createParticle(x, y, type);
        }
    }

    const likeBtn = document.querySelector(".like-btn");
    likeBtn.addEventListener("click", (e) => {
        const { clientX: x, clientY: y } = e;
        const type = likeBtn.dataset.type || "circle";

        // 원하는 수 만큼 파티클 생성
        createParticles(10, x, y, type);
    });

}