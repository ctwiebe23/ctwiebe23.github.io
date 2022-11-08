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
    return theimage; 
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
    },
    
    creativeminds = {
        name: "Creative Minds",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('creativeminds.mp3'),
        image: "creativeminds.png",
    },
    
    dreams = {
        name: "Dreams",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('dreams.mp3'),
        image: "dreams.png",
    },
    
    funkysuspense = {
        name: "Funky Suspense",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('funkysuspense.mp3'),
        image: "funkysuspense.png",
    },
    
    happyrock = {
        name: "Happy Rock",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('happyrock.mp3'),
        image: "happyrock.png",
    },
    
    onceagain = {
        name: "Once Again",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('onceagain.mp3'),
        image: "onceagain.png",
    },
    
    passwordinfinity = {
        name: "Password Infinity",
        artist: "EvgenyBardyuzha",
        listened: new Date(2022-11-03),
        audio: new Audio('passwordinfinity.mp3'),
        image: "passwordinfinity.png",
    },
    
    saveas = {
        name: "Save As",
        artist: "tobylane",
        listened: new Date(2022-11-03),
        audio: new Audio('saveas.mp3'),
        image: "saveas.png",
    },
    
    weeknds = {
        name: "weeknds",
        artist: "DayFox",
        listened: new Date(2022-11-03),
        audio: new Audio('weeknds.mp3'),
        image: "weeknds.png",
    }
];
