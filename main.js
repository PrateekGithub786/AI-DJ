song = "";

leftWristx = 0;
leftWristy = 0;

rightWristx = 0;
rightWristy = 0;


function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video, modelLaoded);
    pose.on("pose", gotPoses);
}

function modelLaoded(){
    console.log("PoseNEt is Intialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("Left Wrist x = " + leftWristx + "Left Wrist y = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("Right Wrist x = " + rightWristx + "Right Wrist y = " + rightWristy);
    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function draw(){
    image(video, 0, 0, 600, 500);
}