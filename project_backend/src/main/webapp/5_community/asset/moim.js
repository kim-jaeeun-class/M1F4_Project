window.addEventListener('load', () => {
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const categoryMenu = document.getElementById('category-menu');

  hamburgerBtn.addEventListener('click', () => {
    categoryMenu.classList.toggle('show');
  });

  window.addEventListener('pageshow', () => {
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  });

  document.querySelector('.allUpload').addEventListener('click', () => {
    window.location.href = '/5_community/html/moimWriterView.html';
  });

  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('fileInput');
  const imagePreview = document.querySelector('.image-preview'); // 수정됨

  if (uploadBtn && fileInput && imagePreview) {
    uploadBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) {
        imagePreview.textContent = '미리보기';
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택해주세요!');
        fileInput.value = '';
        imagePreview.textContent = '미리보기';
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="업로드 이미지" style="max-width: 100%; border-radius: 8px;" />`;
      };
      reader.readAsDataURL(file);
    });
  }
});