
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function webcam_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xQp6dCxA_/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function check_gesture()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function speak()
{
    var synth =window.speechSynthesis;
    speak_data=toSpeak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function gotResult(error,results)
{
if(error)
{
    console.error(error);
}
else
{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    prediction=results[0].label;
    toSpeak="";
    if(prediction=="amazing")
    {
      toSpeak="this is looking amazing";
      document.getElementById("update_emoji").innerHTML="&#128076;";
    }
    else if(prediction=="best")
    {
      toSpeak="this is looking best";
      document.getElementById("update_emoji").innerHTML=" &#129304;";
    }
    else if(prediction=="victory")
    {
      toSpeak="this is looking victory";
      document.getElementById("update_emoji").innerHTML="&#9996;";
    }
  speak();  
}
}