/* =============================
  音源設定
============================= */
// リクエストを作成
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();
const request3 = new XMLHttpRequest();
const request4 = new XMLHttpRequest();

request1.open('GET', '../audio/aogeba-totoshi_s.mp3', true);
request1.responseType = 'arraybuffer';
request1.setRequestHeader('Content-Type', 'audio/mp3');
request1.onload = function () {
  audioContext.decodeAudioData(request1.response, function (buffer) {
    source1.buffer = buffer;
  });
};
request1.send();

request2.open('GET', '../audio/aogeba-totoshi_a.mp3', true);
request2.responseType = 'arraybuffer';
request2.setRequestHeader('Content-Type', 'audio/mp3');
request2.onload = function () {
  audioContext.decodeAudioData(request2.response, function (buffer) {
    source2.buffer = buffer;
  });
};
request2.send();

request3.open('GET', '../audio/aogeba-totoshi_t.mp3', true);
request3.responseType = 'arraybuffer';
request3.setRequestHeader('Content-Type', 'audio/mp3');
request3.onload = function () {
  audioContext.decodeAudioData(request3.response, function (buffer) {
    source3.buffer = buffer;
  });
};
request3.send();

request4.open('GET', '../audio/aogeba-totoshi_p.mp3', true);
request4.responseType = 'arraybuffer';
request4.setRequestHeader('Content-Type', 'audio/mp3');
request4.onload = function () {
  audioContext.decodeAudioData(request4.response, function (buffer) {
    source4.buffer = buffer;
  });
};
request4.send();

// AudioContextを作成する
const audioContext = new AudioContext();

// 音源を読み込む
const source1 = audioContext.createBufferSource();
const source2 = audioContext.createBufferSource();
const source3 = audioContext.createBufferSource();
const source4 = audioContext.createBufferSource();

// ゲインノード
const gainNode1 = audioContext.createGain();
const gainNode2 = audioContext.createGain();
const gainNode3 = audioContext.createGain();
const gainNode4 = audioContext.createGain();

// 連携
source1.connect(gainNode1);
source2.connect(gainNode2);
source3.connect(gainNode3);
source4.connect(gainNode4);

// 出力
gainNode1.connect(audioContext.destination);
gainNode2.connect(audioContext.destination);
gainNode3.connect(audioContext.destination);
gainNode4.connect(audioContext.destination);

// 音量調整
gainNode1.gain.value = 0.5;
gainNode2.gain.value = 0.5;
gainNode3.gain.value = 0.5;


/* =============================
  再生〜終了までの処理
============================= */
// ボタン取得
const audioSwitch = document.getElementById('audioSwitch');
const pause = document.getElementById('pause');

// 再生停止の状態を表す変数(初期値は停止状態)
let isPlaying = false;

// 開始時間
const startTime = audioContext.currentTime;

// 再生開始
audioSwitch.addEventListener('click', function () {
    // 同時に再生開始
    source1.start(startTime);
    source2.start(startTime);
    source3.start(startTime);
    source4.start(startTime);
    audioSwitch.classList.add('none');
    pause.classList.remove('none');
    isPlaying = true;
});

// 一時停止と再生
pause.addEventListener('click', function () {
  if (!isPlaying) {
    audioContext.resume().then(function () {
      isPlaying = true;
      pause.innerHTML = '<img src="../images/ch_icon_pause.png"></img>';
    });
  } else {
    audioContext.suspend().then(function () {
      isPlaying = false;
      pause.innerHTML = '<img src="../images/ch_icon_play.png"></img>';
    });
    }
});

// 終了時の処理
const dialogContainer = document.getElementById('dialogContainer');
const dialogBg = document.getElementById('dialogBg');
const dialogOk = document.getElementById('dialogOk');
const dialogCancel = document.getElementById('dialogCancel');
const dialogSelect = function () { window.location.href = '../stage/index.html'; }

source4.onended = function () {
  pause.innerHTML = '<img src="../images/ch_icon_play.png"></img>';
  dialogContainer.style.display = 'flex';
  dialogBg.style.display = 'block';
  setTimeout(dialogSelect, 2000);
};


/* =============================
  ミュート設定
============================= */
// アイコン
var ch_icon_s = document.getElementById('ch_icon_s');
var ch_icon_a = document.getElementById('ch_icon_a');
var ch_icon_t = document.getElementById('ch_icon_t');
var ch_icon_p = document.getElementById('ch_icon_p');
// APNG
var mo_s = document.getElementById('mo_s');
var mo_a = document.getElementById('mo_a');
var mo_t = document.getElementById('mo_t');

ch_icon_s.addEventListener('click', function () {
  const currentValue1 = gainNode1.gain.value;
  if (currentValue1 === 0.5) {
    gainNode1.gain.value = 0;
    ch_icon_s.classList.add('mute');
    mo_s.classList.add('mute');
  } else if(currentValue1 === 0) {
    gainNode1.gain.value = 0.5;
    ch_icon_s.classList.remove('mute');
    mo_s.classList.remove('mute');
  }
});
ch_icon_a.addEventListener('click', function () {
  const currentValue2 = gainNode2.gain.value;
  if (currentValue2 === 0.5) {
    gainNode2.gain.value = 0;
    ch_icon_a.classList.add('mute');
    mo_a.classList.add('mute');
  } else if(currentValue2 === 0) {
    gainNode2.gain.value = 0.5;
    ch_icon_a.classList.remove('mute');
    mo_a.classList.remove('mute');
  }
});
ch_icon_t.addEventListener('click', function () {
  const currentValue3 = gainNode3.gain.value;
  if (currentValue3 === 0.5) {
    gainNode3.gain.value = 0;
    ch_icon_t.classList.add('mute');
    mo_t.classList.add('mute');
  } else if(currentValue3 === 0) {
    gainNode3.gain.value = 0.5;
    ch_icon_t.classList.remove('mute');
    mo_t.classList.remove('mute');
  }
});
ch_icon_p.addEventListener('click', function () {
  const currentValue4 = gainNode4.gain.value;
  if (currentValue4 === 1) {
    gainNode4.gain.value = 0;
    ch_icon_p.classList.add('mute');
  } else if(currentValue4 === 0) {
    gainNode4.gain.value = 1;
    ch_icon_p.classList.remove('mute');
  }
});

// 譜めくりボタン
const images = document.getElementById('score');
function next() {
  images.appendChild(images.children[0]);
}
function previous() {
  images.insertBefore(images.children[images.children.length -1],images.children[0]);
}

// リロードボタン
const reloadBtn = document.getElementById('reloadBtn');
reloadBtn.addEventListener('click', function () {
  location.reload();
});

/* =============================
  暗幕を上げる
============================= */
// 暗幕を取得
const maku = document.querySelector('.stage-maku-black');
const sChs = document.querySelector('.ch-anm');
const sMenu = document.querySelector('.soundMenu');
const sMenu2 = document.querySelector('.soundMenu-2');
const scoreBtn = document.querySelector('.score_button');

// 暗幕を上げるクラスを付与
const maku_ = function () {
  maku.classList.add('done');
}
// キャラクター入場
const chIn = function () {
  sChs.classList.add('in');
}
// 譜めくりbtnを表示
const scoreBtn_ = function () {
  scoreBtn.classList.remove('none');
}
// メニューを表示
const sMenu_ = function () {
  sMenu.classList.remove('none');
  sMenu2.classList.remove('none');
}
// 実行する
setTimeout(maku_, 1500);
setTimeout(chIn, 7500);
setTimeout(scoreBtn_, 8500);
setTimeout(sMenu_, 8800);