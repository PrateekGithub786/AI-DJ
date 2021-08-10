song = "";

leftWristx = 0;
leftWristy = 0;

rightWristx = 0;
rightWristy = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

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
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FFFFFF");
    stroke("#000000");

    if(scoreRightWrist > 0.2){
        circle(rightWristx, rightWristy, 20);

        if(rightWristy >0 && rightWristy <= 100){
            document.getElementById("speed_button").innerHTML = "Speed" + " 0.5x";
            song.rate(0.5);
        
        }
        else if(rightWristy >100 && rightWristy <= 200){
            document.getElementById("speed_button").innerHTML = "Speed" + " 1x";
            song.rate(1);
        }
        else if(rightWristy >200 && rightWristy <= 300){
            document.getElementById("speed_button").innerHTML = "Speed" + " 1.5x";
            song.rate(1.5);
        }
        else if(rightWristy >300 && rightWristy <= 400){
            document.getElementById("speed_button").innerHTML = "Speed" + " 2x";
            song.rate(2);
        }
        else if(rightWristy >400){
            document.getElementById("speed_button").innerHTML = "Speed" + " 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2){
        circle(leftWristx, leftWristy, 20);
        InNumberLeftWristy = Number(leftWristy);
        removeDecimals = floor(InNumberLeftWristy);
        volume = removeDecimals/500;
        song.setVolume(volume);
        document.getElementById("volume_button").innerHTML = "Volume " + volume;
    }

}