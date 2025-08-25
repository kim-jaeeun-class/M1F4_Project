window.addEventListener('load', bind);

function bind() {
  photoUpload();
  approveButton();
  rejectButton();
  resetButton()
}



function photoUpload() {
  const uploadBtn = document.getElementById('uploadBtn');
  const photoInput = document.getElementById('photoInput');

  uploadBtn.addEventListener('click', () => {
    photoInput.click();
  });

  photoInput.addEventListener('change', () => {
    if (photoInput.files.length > 0) {
      uploadBtn.style.display = 'none'; // 업로드 버튼 숨기기
      // 여기에서 사진 미리보기 추가도 가능해요!
    }
  });
}

function approveButton() {
  const approveBtn = document.querySelector('.approve-btn');
  const approvedList = document.getElementById('approved-users');

  approveBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.application-list input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const name = checkbox.parentElement.textContent.trim();

        // 중복 확인
        const already = Array.from(approvedList.children).some(li => li.textContent.includes(name));
        if (!already) {
          const li = document.createElement('li');
          li.textContent = `✅ ${name}`;
          approvedList.appendChild(li);
        }

        checkbox.checked = false;
      }
    });
  });
}

function rejectButton() {
  const rejectBtn = document.querySelector(".reject-btn");
  const form = document.querySelector(".application-list form");

  rejectBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const checkedBoxes = form.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach(checkbox => {
      const label = checkbox.parentElement;

      // 숨김 처리만 (삭제 X)
      label.classList.add('hidden');

      // 체크 해제
      checkbox.checked = false;
    });
  });
}

function resetButton() {
  const resetBtn = document.querySelector(".reset-btn");

  resetBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('.application-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    // 숨겨진 신청자 다시 보이게
    const hiddenLabels = document.querySelectorAll('.application-list label.hidden');
    hiddenLabels.forEach(label => {
      label.classList.remove('hidden');
    });
  });
}
function rejectButton() {
  const rejectBtn = document.querySelector(".reject-btn");
  const form = document.querySelector(".application-list form");

  rejectBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const checkedBoxes = form.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach(checkbox => {
      const label = checkbox.parentElement;

      // 삭제
      label.remove();
    });
  });
}
// 삭제된 신청자 임시 저장 공간
let rejectedApplicants = [];

function rejectButton() {
  const rejectBtn = document.querySelector(".reject-btn");
  const form = document.querySelector(".application-list form");

  rejectBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const checkedBoxes = form.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach((checkbox) => {
      const label = checkbox.closest("label");
      if (label) {
        rejectedApplicants.push(label); // 삭제 전 저장
        label.remove(); // 화면에서 제거
      }
    });
  });
}

function resetButton() {
  const resetBtn = document.querySelector(".reset-btn");
  const form = document.querySelector(".application-list form");

  resetBtn.addEventListener("click", () => {
    // 모든 체크박스 해제
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    // 삭제됐던 신청자 복구
    rejectedApplicants.forEach(label => {
      form.appendChild(label);
    });

    rejectedApplicants = []; // 복구했으니 초기화
  });
}
