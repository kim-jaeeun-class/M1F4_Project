function bind() {
    // 탭 버튼
    const tabs = document.querySelectorAll('.tab');
    const contentMap = {
        'tab-info': 'contents-info',
        'tab-inquiry': 'contents-inquiry',
        'tab-review': 'contents-review'
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 모든 콘텐츠 숨김
            document
                .querySelectorAll('.tab-content')
                .forEach(c => c.classList.remove('active'));

            // 현재 탭에 해당하는 콘텐츠만 보이게
            const contentId = contentMap[tab.classList[1]]; // 예: tab-info → contents-info
            document
                .querySelector(`.${contentId}`)
                .classList
                .add('active');
        });
    });

    // a 태그 css 문제 해결용

    window.addEventListener('pageshow', () => {
        if (document.activeElement && document.activeElement.blur) {
            document
                .activeElement
                .blur();
        }
    });

    // 질문 클릭 시 답변 열기
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            if (answer && answer.classList.contains('answer')) {
                // display 속성을 토글
                const currentDisplay = getComputedStyle(answer).display;
                answer.style.display = (currentDisplay === 'none')
                    ? 'flex'
                    : 'none';
            }
        });
    });


    // 더 보기 버튼

    const moreBtn = document.querySelector('.more-btn');
    const cards = document.querySelectorAll('.review');

    let visibleCount = 6; // 처음 보여줄 카드 개수
    moreBtn.addEventListener('click', () => {
        let hiddenCards = Array
            .from(cards)
            .filter(card => card.style.display === 'none');
        if (hiddenCards.length === 0) {
            alert('더 이상 카드가 없습니다.');
            return;
        }
        // 다음 6개 보여주기
        for (let i = 0; i < 6 && i < hiddenCards.length; i++) {
            hiddenCards[i].style.display = 'flex';
            visibleCount++;
        }

        // 더 이상 보여줄 카드가 없으면 버튼 숨기기
        if (visibleCount >= cards.length) {
            moreBtn.style.display = 'none';
        }
    })

    // 신청 버튼 : alert로 완료됐다는 알림창만 띄우도록

    const apply = document.querySelector('.apply');

    apply.addEventListener('click', () => {
        alert(
            '신청이 완료되었습니다.\n최종 승인은 담당자 확인 후 반영됩니다.\n승인 처리 시, 선택하신 알림 서비스로 결과를 알려드립니다.'
        ), { once: true };
    })

    // 모달 관련 바로 처리
    // 후기 모달 열기
    const reviewBtn = document.querySelector('.review-btn');
    const reviewModal = document.getElementById('review-modal');

    // 질문 모달 열기
    const inquiryBtn = document.querySelector('.inquiry-btn');
    const inquiryModal = document.getElementById('inquiry-modal');

    // 닫기 버튼
    const closeReviewBtn = document.querySelector('#review-modal .close');
    const closeInquiryBtn = document.querySelector('#inquiry-modal .close');

    // 후기 모달 열기 이벤트
    if (reviewBtn && reviewModal) {
        reviewBtn.addEventListener('click', () => {
            reviewModal.style.display = 'block';
        });
    }

    // 질문 모달 열기 이벤트
    if (inquiryBtn && inquiryModal) {
        inquiryBtn.addEventListener('click', () => {
            inquiryModal.style.display = 'block';
        });
    }

    // 후기 모달 닫기 이벤트
    if (closeReviewBtn && reviewModal) {
        closeReviewBtn.addEventListener('click', () => {
            reviewModal.style.display = 'none';
        });
    }

    // 질문 모달 닫기 이벤트
    if (closeInquiryBtn && inquiryModal) {
        closeInquiryBtn.addEventListener('click', () => {
            inquiryModal.style.display = 'none';
        });
    }

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.style.display = 'none';
        }
        if (e.target === inquiryModal) {
            inquiryModal.style.display = 'none';
        }
    });

    // 작성 완료 버튼 클릭 시 알림창 띄우기
    const reviewDoneBtn = document.querySelector('#review-done-btn');

    reviewDoneBtn.addEventListener('click', () => {
        const reviewTitle = document.querySelector('#review-title').value.trim();
        const reviewCon = document.querySelector('#review-content').value.trim();

        if (reviewTitle === '' || reviewCon === '') {
            alert('후기 내용을 입력해주세요.');
            return;
        }

        alert('후기가 성공적으로 작성되었습니다. 게시글은 승인 후 등록됩니다.');
        modal.classList.remove('show');
        document.querySelector('#review-title').value = ''; // 입력창 초기화
        document.querySelector('#review-content').value = '';
    });

    const inquiryDoneBtn = document.querySelector('#inquiry-done-btn');

    inquiryDoneBtn.addEventListener('click', () => {
        const inquiryTitle = document.querySelector('#inquiry-title').value.trim();
        const inquiryCon = document.querySelector('#inquiry-content').value.trim();

        if (inquiryTitle === '' || inquiryCon === '') {
            alert('질문 제목이나 내용을 입력해주세요.');
            return;
        }

        alert('질문이 성공적으로 작성되었습니다. \n게시글은 담당자가 답변을 완료하면, 답변과 함께 등록됩니다.');
        modal.classList.remove('show');
        document.querySelector('#inquiry-title').value = ''; // 입력창 초기화
        document.querySelector('#inquiry-content').value = '';
    });

    // 지도?

    kakao.maps.load(function () {
            const map = new kakao.maps
                .Map(document.getElementById('map'), {
                    center: new kakao
                        .maps
                        .LatLng(37.5665, 126.9780),
                    level: 3
                });

            const geocoder = new kakao.maps.services.Geocoder();
            const endAddressElement = document.querySelector('.location-content-detail');
            const endAddress = endAddressElement?.textContent.trim();

            // 도착지 마커 표시
            geocoder.addressSearch(endAddress, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps
                        .LatLng(result[0].y, result[0].x);
                    const marker = new kakao.maps
                        .Marker({position: coords, map: map});

                    const infowindow = new kakao.maps
                        .InfoWindow(
                            {content: `<div style="padding:5px;font-size:13px;">
                            <strong>도착지</strong><br>${endAddress}
                        </div>`}
                        );
                    infowindow.open(map, marker);
                    map.setCenter(coords);
                } else {
                    alert("도착지 주소를 찾을 수 없습니다.");
                }
            });

            // 길찾기 버튼 동작: 출발지는 생략 (현재 위치 사용)
            window.openKakaoMapRoute = function () {
                geocoder.addressSearch(endAddress, function (result, status) {
                    if (status !== kakao.maps.services.Status.OK) {
                        alert("도착지 주소를 찾을 수 없습니다.");
                        return;
                    }

                    const lat = result[0].y;
                    const lng = result[0].x;
                    const name = encodeURIComponent(endAddress);
                    const url = `https://map.kakao.com/link/to/${name},${lat},${lng}`;

                    window.open(url);
                });
            };
        });

}