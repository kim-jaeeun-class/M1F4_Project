// /asset/3_login.js



(() => {
  'use strict';

  function getContextPath() {
    // 예: /myapp/1_main/html/3_login.html -> /myapp
    const p = window.location.pathname;
    const i = p.indexOf('/', 1);
    return i > 0 ? p.substring(0, i) : '';
  }

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function toQuery(bodyObj) {
    // URL-Encoded 바디 생성 -> 서블릿에서 request.getParameter(...)로 받기 쉬움
    return new URLSearchParams(bodyObj);
  }

  function setLoading($btn, loading) {
    if (!$btn) return;
    if (loading) {
      $btn.dataset._oldText = $btn.textContent;
      $btn.textContent = '로그인 중...';
      $btn.disabled = true;
    } else {
      if ($btn.dataset._oldText) $btn.textContent = $btn.dataset._oldText;
      $btn.disabled = false;
    }
  }

  async function parseResponse(res) {
    // 서버가 JSON을 주는 것을 기대. 다만 혹시 모를 상황을 대비해 fallback.
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      return await res.json();
    }
    // 텍스트면 단순 포맷으로 감싼다.
    const text = await res.text();
    return { ok: res.ok, msg: text || (res.ok ? 'OK' : 'ERROR') };
  }

  // ===== 메인 로직 =====
  async function doLogin() {
    const idEl = $('.id');
    const pwEl = $('.pw');
    const keepEl = $('#keep_login');
    const btn = $('#btnLogin');

    if (!idEl || !pwEl) {
      alert('ID/PW 입력 요소를 찾지 못했습니다.');
      return;
    }

    const id = idEl.value.trim();
    const pw = pwEl.value; // 공백 가능
    const keep = keepEl && keepEl.checked ? '1' : '0';

    if (!id || !pw) {
      alert('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    const body = toQuery({ id, pw, keep_login: keep });

    try {
      setLoading(btn, true);

      const res = await fetch(getContextPath() + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body,
        credentials: 'include', // 세션 쿠키 사용
      });

      const data = await parseResponse(res);

      if (res.ok && data && data.ok) {
        // 서버가 내려준 redirect 경로로 이동 (예: /myapp/home.jsp)
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          // redirect 미전달 시 기본 이동
          window.location.href = getContextPath() + '/home.jsp';
        }
      } else {
        alert((data && data.msg) || '아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(btn, false);
    }
  }

  function bind() {
    const btn = $('#btnLogin');

    if (!btn) {
      // 이 스크립트를 다른 페이지에서 재사용해도 에러 안 나게 가드
      console.warn('#btnLogin not found; login bind skipped.');
      return;
    }

    // 클릭 로그인
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      doLogin();
    });

    // 엔터키로 로그인 (ID/PW 입력 중)
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      // 포커스가 입력창 근처일 때만 처리 (원치 않는 엔터 방지)
      const active = document.activeElement;
      if (active && (active.classList?.contains('id') || active.classList?.contains('pw'))) {
        e.preventDefault();
        doLogin();
      }
    });
  }

  function init() {
    bind();
  }

  // DOMContentLoaded 이후 실행 (스크립트 위치/캐시에 상관없이 안전)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
