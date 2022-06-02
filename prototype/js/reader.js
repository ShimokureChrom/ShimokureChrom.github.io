// html要素（video）を取得
const video = document.querySelector('#js-video');

// ローカルメディアにアクセス・メディア入力の許可を要求
const access_rear_camera = navigator.mediaDevices
  .getUserMedia({
    // 音声不使用
    audio: false,
    // ビデオ使用（facingMode:exact=user > フロントカメラ, facingMode:exact=environment > リアカメラ）
    video: {
      facingMode: {
        exact: 'environment'
      }
    }
  })
  .then(function (stream) {
    // 成功した場合、取得したストリームを video エレメントで再生
    video.srcObject = stream;
    // 動画のメタデータを読み終えた際に video を再生する
    video.onloadedmetadata = function (e) {
      video.play();
    }
  })
  .catch(function (err) {
    console.log('EROOR: Cannot access rear camera!');
    // 失敗した場合、フロントカメラを使用警告を表示
    navigator.mediaDevices
      .getUserMedia({
        // 音声不使用
        audio: false,
        // ビデオ使用（facingMode:exact=user > フロントカメラ, facingMode:exact=environment > リアカメラ）
        video: {
          facingMode: {
            exact: 'user'
          }
        }
      })
      .then(function (stream) {
        // 成功した場合、取得したストリームを video エレメントで再生
        video.srcObject = stream;
        // 動画のメタデータを読み終えた際に video を再生する
        video.onloadedmetadata = function (e) {
          video.play();
        }
      })
      .catch(function (err) {
        // 失敗した場合、警告を表示
        alert('EROOR: Cannot access your camera!');
      })
  })

// html要素（canvas）を取得
const canvas = document.querySelector('#js-canvas');
const ctx = canvas.getContext('2d');

function checkImage() {
  // 取得している動画を canvas に描画
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // canvas からデータを取得
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // jsQRに投げる
  const code = jsQR(imageData.data, canvas.width, canvas.height);

  // 読み取り成功でモーダル起動
  // 失敗で再度実行
  if (code) {
    if (read_data.qr_data !== code.data) {
      read_data.qr_data = code.data;
      reader.camera_on = false;
    }
    setTimeout(() => { checkImage() }, 500);
  } else {
    setTimeout(() => { checkImage() }, 500);
  }
}

checkImage();
