function search() {
    let myInput = document.getElementById("myInput").value;
    myInput = myInput.toLowerCase();
    let music = document.getElementsByClassName("music");

    for (i = 0; i < music.length; i++) {
        if (!music[i].innerHTML.toLowerCase().includes(myInput)) {
            music[i].style.display = "none";
        }
        else {
            music[i].style.display = "list-item";
        }
    }

}

window.onload = function() {
    displayimage(music[0], 120);    
    displayimage(music[1], 120);
    displayimage(music[2], 120);
    displayimage(music[3], 120);
    displayimage(music[4], 120);
    displayimage(music[5], 120);    
    displayimage(music[6], 120);
    displayimage(music[7], 120);
    displayimage(music[8], 120);    
    displayimage(music[9], 120);
}

function displayimage(key, size) {
    var theimage = document.createElement("img");
    theimage.setAttribute('src', key.image);
    theimage.setAttribute('alt', key.name);
    theimage.height = size;
    theimage.width = size;
    document.getElementById(key.name).appendChild(theimage);
}

function playsong(song) {
    song.audio.play();
    song.listens++;
    song.listened = new Date();
}

function pausesong(song) {
    song.audio.pause();
}

function restartsong(song) {
    song.audio.load();
    song.audio.play();
    song.listens++;
    song.listened = new Date();
}

function makemodel(song) {
    
}

let music = [
    allthat = {
        name: "All That",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        listens: 0,
        audio: new Audio('allthat.mp3'),
        image: "allthat.png",
    },
    
    bipbip = {
        name: "bipbip",
        artist: "bipbip",
        listened: new Date(2022-11-03),
        audio: new Audio('bipbip.mp3'),
        image: "bipbip.png",
        listens: 0
    },
    
    creativeminds = {
        name: "Creative Minds",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('creativeminds.mp3'),
        image: "creativeminds.png",
        listens: 0
    },
    
    dreams = {
        name: "Dreams",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('dreams.mp3'),
        image: "dreams.png",
        listens: 0
    },
    
    funkysuspense = {
        name: "Funky Suspense",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('funkysuspense.mp3'),
        image: "funkysuspense.png",
        listens: 0
    },
    
    happyrock = {
        name: "Happy Rock",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('happyrock.mp3'),
        image: "happyrock.png",
        listens: 0
    },
    
    onceagain = {
        name: "Once Again",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('onceagain.mp3'),
        image: "onceagain.png",
        listens: 0
    },
    
    passwordinfinity = {
        name: "Password Infinity",
        artist: "EvgenyBardyuzha",
        listened: new Date(2022-11-03),
        audio: new Audio('passwordinfinity.mp3'),
        image: "passwordinfinity.png",
        listens: 0
    },
    
    saveas = {
        name: "Save As",
        artist: "tobylane",
        listened: new Date(2022-11-03),
        audio: new Audio('saveas.mp3'),
        image: "saveas.png",
        listens: 0
    },
    
    weeknds = {
        name: "weeknds",
        artist: "DayFox",
        listened: new Date(2022-11-03),
        audio: new Audio('weeknds.mp3'),
        image: "weeknds.png",
        listens: 0
    }
];
