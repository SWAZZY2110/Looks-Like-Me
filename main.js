var sound = "";
leftWristY = 0;
rightWristY = 0;
leftWristX = 0;
rightWristX = 0;
lefConf = 0;
rigConf = 0;
function setup() {
  canvas = createCanvas(600, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotResult);
}

function preload() {
  sound = loadSound("Looks_Like_Me.mp3");
}

function draw() {
  image(video, 0, 0, 600, 400);

  circle(leftWristX, leftWristY - 200, 50);

  circle(rightWristX, rightWristY - 200, 50);
}

function play() {
  sound.play();
  sound.setVolume(1);
  sound.rate(1);
}

function stop() {
  sound.stop();
}

function pause() {
  sound.pause();
}
function modelLoaded() {
  console.log("Cool :D");
}
function gotResult(result) {
  if (result.length > 0) {
    console.log(result);
    lefConf = result[0].pose.leftWrist.confidence;
    rigConf = result[0].pose.rightWrist.confidence;
    if (rigConf > 0.2) {
      rightWristY = result[0].pose.rightWrist.y;
      rightWristX = result[0].pose.rightWrist.x;
    }
    if (lefConf > 0.2) {
      leftWristX = result[0].pose.leftWrist.x;
      leftWristY = result[0].pose.leftWrist.y;
    }
  }
}
