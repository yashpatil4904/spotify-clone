
let songIndex=0;
let audioElement =new Audio("songs/1.mp3");
let masterplay = document.getElementById("masterplay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songitem'));
let currentplaybutton=document.getElementById("0");
currentplaybutton.classList.remove("fa-play-circle");
currentplaybutton.classList.add("fa-pause-circle");
let MasterSongName= document.getElementById("MasterSongName");
console.log(currentplaybutton);
//console.log(songItems);
let songs =[
    {songname : "Tu Mile Dil Khile",filepath : "songs/1.mp3",coverpath:"./covers/1.jpg"},
    {songname : "Ambarsariya",filepath : "songs/2.mp3",coverpath:"./covers/2.jpg"},
    {songname : "Bol Na Halke Halke",filepath : "songs/3.mp3",coverpath:"./covers/3.jpg"},
    {songname : "Kabira",filepath : "songs/4.mp3",coverpath:"./covers/4.jpg"},
    {songname : "Likhe Jo Khat Tujhe",filepath : "songs/5.mp3",coverpath:"./covers/5.jpg"},
    {songname : "Tum Tak",filepath : "songs/6.mp3",coverpath:"./covers/6.jpg"},
    {songname : "Kahan Ho Tum",filepath : "songs/7.mp3",coverpath:"./covers/7.jpg"},
]
MasterSongName.innerText=songs[songIndex].songname;
songItems.forEach((element, i)=>{ 
    //console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname; 
});
masterplay.addEventListener("click",()=>{
if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
    gif.style.opacity=1;
    
}
else{
    audioElement.pause();
    masterplay.classList.remove("fa-pause-circle");
    masterplay.classList.add("fa-play-circle")
    gif.style.opacity=0;
}
});
audioElement.addEventListener("timeupdate",()=>{
    progress = (audioElement.currentTime/audioElement.duration)*100;
    myProgressBar.value=progress;
    if(audioElement.currentTime==audioElement.duration){
        audioElement.currentTime=0;
        masterplay.classList.remove("fa-pause-circle");
        masterplay.classList.add("fa-play-circle")
        gif.style.opacity=0;
    }
});
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
});
function makeAllPlays(){
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element,i)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element,i)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        gif.style.opacity=1;
        audioElement.src=songs[songIndex].filepath;
        MasterSongName.innerText=songs[songIndex].songname;
        audioElement.currentTime=0;
        audioElement.play()
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle");
    })
})
document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=6){
        songIndex=0;
    }
    else{
    songIndex+=1;
    }

    console.log(songs[songIndex]);
    audioElement.src=songs[songIndex].filepath;
    audioElement.currentTime=0;
    audioElement.play()
    makeAllPlays();
    MasterSongName.innerText=songs[songIndex].songname;
    currentplaybutton=document.getElementById(songIndex);
    currentplaybutton.classList.remove("fa-play-circle");
    currentplaybutton.classList.add("fa-pause-circle");
    console.log(currentplaybutton);
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
})
document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=6;

    }
    else{
    songIndex-=1;
    }
    console.log(songs[songIndex]);
    audioElement.src=songs[songIndex].filepath;
    audioElement.currentTime=0;
    makeAllPlays();
    MasterSongName.innerText=songs[songIndex].songname;
    currentplaybutton=document.getElementById(songIndex);
    currentplaybutton.classList.remove("fa-play-circle");
    currentplaybutton.classList.add("fa-pause-circle");
    audioElement.play()
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
})
