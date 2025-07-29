window.addEventListener('load', init);   
                                         
function init(){
    
    
    bind();
}
function bind() {
    // 지난 , 진행 중 수강내역 버튼 클릭 js
    // 수강내역 버튼 클릭시
    const tabButtons = document.querySelectorAll('.list_tab div');
    const contents = document.querySelectorAll('.contents-line');

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            // 모든 탭에서 active 제거
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            
            // 현재 클릭한 탭에 active 추가
            this.classList.add('active');

            // 진행중 / 지난 탭 id 판단
            console.log(this);
            const tabId = this.dataset.tab;
            console.log(tabId);

            // 콘텐츠 섹션 표시 전환
            contents.forEach(content => {
                if(content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // 페이지네이션 js
    


}