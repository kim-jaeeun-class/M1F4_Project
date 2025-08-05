const btnMore = document.getElementById('btnMore');
const cards = document.querySelectorAll('.group-card');
let visibleCount = 4;  // 초기에 보이는 카드 개수
const increment = 2;   // 한번에 더 보여줄 카드 개수

btnMore.addEventListener('click', () => {
  let shown = 0;
  for (let i = visibleCount; i < cards.length && shown < increment; i++) {
    if (cards[i].classList.contains('hidden')) {
      cards[i].classList.remove('hidden');
      shown++;
    }
  }
  visibleCount += shown;
  if (visibleCount >= cards.length) {
    btnMore.style.display = 'none';  // 모두 다 보여주면 버튼 숨김
  }
});

for(let i=0; i<cards.length; i++){
  cards[i].addEventListener('click', () => {
    window.location.href = 'moimView.html'
  })
}


