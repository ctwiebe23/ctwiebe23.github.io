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

function displayimage(key, y, x) {
    var theimage = document.createElement("img");
    theimage.setAttribute('src', key);
    theimage.setAttribute('alt', 'image');
    theimage.height = y;
    theimage.width = x;
    document.body.appendChild(theimage);  
}

let music = [
    allthat = {
        name: "All That",
        artist: "Benjamin Tissot",
        posted: 1,
        listened: new Date(2022-11-03),
        listens: 0,
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    bipbip = {
        name: "bipbip",
        artist: "bipbip",
        posted: 2,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    creativeminds = {
        name: "Creative Minds",
        artist: "Benjamin Tissot",
        posted: 3,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    dreams = {
        name: "Dreams",
        artist: "Benjamin Tissot",
        posted: 4,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    funkysuspense = {
        name: "Funky Suspense",
        artist: "Benjamin Tissot",
        posted: 5,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    happyrock = {
        name: "Happy Rock",
        artist: "Benjamin Tissot",
        posted: 6,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    onceagain = {
        name: "Once Again",
        artist: "Benjamin Tissot",
        posted: 7,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    passwordinfinity = {
        name: "Password Infinity",
        artist: "EvgenyBardyuzha",
        posted: 8,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    saveas = {
        name: "Save As",
        artist: "tobylane",
        posted: 9,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    },
    
    weeknds = {
        name: "weeknds",
        artist: "DayFox",
        posted: 10,
        listened: new Date(2022-11-03),
        audio: new Audio('allthat.mp3'),
        image: "MusicIcon.png",
    }
];