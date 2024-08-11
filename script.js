console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Lose Yourself", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Without Me", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Till I Collapse", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "The Real Slim Shady", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Mockingbird", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Love The Way You Lie", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Godzilla (feat. Juice WRLD)", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Rap God", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Smack That(feat.Akon)", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Venom - Music From Motion Picture", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){ /**Audio is paused or is not playing */
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');  /*stop play button */
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle'); /*stop pause button */
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); /*shows song play progress*/
    myProgressBar.value = progress;
})
// Update Seekbar for next song
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

/*To  change songs symbol from pause to play in their respective lists*/
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

/*To play songs in their respective lists*/
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

/*forward button functionality*/
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

/*backward button functionality*/
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
//Update Song play timestamp

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){ 
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');  
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle'); 
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
    updateTimestamp(); // Call updateTimestamp function
})

// Update timestamp
function updateTimestamp(){
    setInterval(()=>{
        let currentTime = audioElement.currentTime;
        let minutes = Math.floor(currentTime / 60);
        let seconds = Math.floor(currentTime % 60);
        let timestamp = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timestamp').innerText = timestamp; // Update timestamp element
    }, 1000); // Update every 1 second
}

// Create a timestamp element next to the play button
let timestampElement = document.createElement('span');
timestampElement.id = 'timestamp';
masterPlay.parentNode.appendChild(timestampElement);


// Handle play/pause click while song is playing
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){ 
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');  
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle'); 
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


