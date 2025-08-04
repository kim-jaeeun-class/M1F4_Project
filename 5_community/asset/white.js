window.addEventListener('load', bind);

function bind() {
  initHamburgerMenu();
  initPageFocusReset();
  initPhotoUpload();
  initApproveButton();
  initRejectButton();
}

function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const categoryMenu = document.getElementById('category-menu');

  hamburgerBtn.addEventListener('click', () => {
    categoryMenu.classList.toggle('show');
  });
}

function initPageFocusReset() {
  window.addEventListener('pageshow', () => {
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  });
}

function initPhotoUpload() {
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

function initApproveButton() {
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

function initRejectButton() {
  const rejectBtn = document.querySelector(".reject-btn");
  const form = document.querySelector(".application-list form");

  rejectBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const checkedBoxes = form.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach(checkbox => {
      const label = checkbox.parentElement;
      label.remove();
    });
  });
}
window.addEventListener('load', bind);

function bind() {
  initHamburgerMenu();
  initPageFocusReset();
  initPhotoUpload();
  initApproveButton();
  initRejectButton();
  initResetButton();  // ✅ 추가!
}
function initResetButton() {
  const resetBtn = document.querySelector(".reset-btn");

  resetBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('.application-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  });
}