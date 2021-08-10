music1 = "";
music2 = "";

leftWristx = 0;
leftWristy = 0;

rightWristx = 0;
rightWristy = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

statusSong1 = 0;
statusSong2 = 0;

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

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score = " + scoreLeftWrist + "Right Wrist Score = " + scoreRightWrist);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("Left Wrist x = " + leftWristx + "Left Wrist y = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("Right Wrist x = " + rightWristx + "Right Wrist y = " + rightWristy);
    }
}

function preload(){
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function draw(){
    image(video, 0, 0, 600, 500);

    statusSong1 = music1.isPlaying();
    statusSong2 = music2.isPlaying();

    fill("#FFFFFF");
    stroke("#000000");

    if(scoreLeftWrist > 0.2){
        circle(leftWristx, leftWristy, 20);
        music2.stop();

        if(statusSong1 = false){
            music1.play();
            document.getElementById("name_of_song").innerHTML = " " + "Harry Potter Theme";
        }
    
    }

}