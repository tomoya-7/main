/* =============================
  SVGアニメーション
============================= */
const loading = document.querySelector('.svgWrap');
const body = document.body;
const doneWindow = function () {
  loading.classList.add('done');
  body.classList.remove('ban-scroll');
}
setTimeout(doneWindow, 3600);

/* =============================
  選曲後、自動的に遷移する
============================= */
const selected = document.getElementById('playlist');
selected.onchange = function () {
  window.location.href = selected.value;
};

/* =============================
  お問い合わせ送信時の確認
============================= */
function check() {
  if (window.confirm('送信してもよろしいですか？')) {
    return true;
  } else {
    window.alert('キャンセルしました');
    return false;
  }
}