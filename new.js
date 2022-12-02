let music = [];
let url = "https://raw.githubusercontent.com/ctwiebe23/ctwiebe23.github.io/main/index.json";
let recentsong = new Audio();

async function musicload() {
    if (music.length == 0) {
        let musictemp = await fetchmusic();
        console.log(musictemp);
        music = music.concat(musictemp.array);
        console.log(music);
    }
    for (i = 0; i < music.length; i++) {
        displayimage(findnew(i), ("new" + (i+1).toString()));
    } 
    storemusic();             
};

async function fetchmusic() {
    try {
        let response = await fetch(url);
        console.log(response);
        if (response.status == 200) {
            return await response.json();
        }
        else {
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
};

async function storemusic() {
    let http = new EasyHTTP;
    let data = {music};
    console.log(data);

    http.put(url, data)
    
    .then(data => console.log(data))
    
    .catch(err => console.log(err));
};

 function displayimage(key, location) {
    var theimage = document.createElement("img");
    theimage.setAttribute('src', key.image);
    theimage.setAttribute('alt', key.name);
    theimage.height = 120;
    theimage.width = 120;
    document.getElementById(location).innerHTML = "";
    document.getElementById(location).appendChild(theimage);
    document.getElementById(location + "name").innerHTML = key.name;
    document.getElementById(location + "artist").innerHTML = key.artist;
};

function playsong(song) {
    recentsong.pause();
    recentsong = new Audio(song.audio);
    recentsong.play();
    song.listens++;
    music = music.filter(function (letter) {
        return letter !== song;
    });
    music.unshift(song);
    musicload();
};

 function pausesong() {
    recentsong.pause();
};

 function restartsong(song) {
    recentsong.pause();
    recentsong = new Audio(song.audio);
    recentsong.load();
    recentsong.play();
    song.listens++;
    music = music.filter(function (letter) {
        return letter !== song;
    });
    music.unshift(song);
    musicload();
};

 function findpop(x) {
    let temparray = [];
    temparray = temparray.concat(music);
    temparray.sort(dynamicSort("-listens"));
    return temparray[x];
};

 function findnew(x) {
    let temparray = [];
    temparray = temparray.concat(music);
    temparray.sort(dynamicSort("-date"));
    return temparray[x];
};

 function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
};

class EasyHTTP {
    async put(url, data) {
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        let resData = await response.json();
        
        return resData;
    }
}

/*let music = [
    bipbip = {
        name: "incorrect",
        artist: "incorrect",
        listened: new Date(2022-11-03),
        audio: new Audio('bipbip.mp3'),
        image: "bipbip.png",
        listens: 8
    },
    
    allthat = {
        name: "All That",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        listens: 2,
        audio: new Audio('allthat.mp3'),
        image: "allthat.png",
    },

    creativeminds = {
        name: "Creative Minds",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('creativeminds.mp3'),
        image: "creativeminds.png",
        listens: 3
    },
    
    dreams = {
        name: "Dreams",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('dreams.mp3'),
        image: "dreams.png",
        listens: 7
    },
    
    funkysuspense = {
        name: "Funky Suspense",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('funkysuspense.mp3'),
        image: "funkysuspense.png",
        listens: 4
    },
    
    happyrock = {
        name: "Happy Rock",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('happyrock.mp3'),
        image: "happyrock.png",
        listens: 4
    },
    
    onceagain = {
        name: "Once Again",
        artist: "Benjamin Tissot",
        listened: new Date(2022-11-03),
        audio: new Audio('onceagain.mp3'),
        image: "onceagain.png",
        listens: 1
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
        listens: 12
    },
    
    weeknds = {
        name: "weeknds",
        artist: "DayFox",
        listened: new Date(2022-11-03),
        audio: new Audio('weeknds.mp3'),
        image: "weeknds.png",
        listens: 9
    }
];*/

musicload();