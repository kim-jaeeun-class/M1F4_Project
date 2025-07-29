//head와 header를 로드하는 자바 스크립트 입니다.
<<<<<<< HEAD
=======

>>>>>>> 00ddbe42ef22e6fe3e293de916319065017ab3d1
fetch("../../0_templete/templete.html")
.then(res => res.text())
.then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html'); 
    //text/html 가상의 문자열 html

    const header = doc.querySelector(".head");
    const footer = doc.querySelector(".footer");

    if (header) document.querySelector(".head").innerHTML = header.innerHTML;
    if (footer) document.querySelector(".footer").innerHTML = footer.innerHTML;
})
.catch(err => console.error("불러오기 실패:", err));
