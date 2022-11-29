async function fetchmusic() {
    let url = "https://raw.githubusercontent.com/ctwiebe23/ctwiebe23.github.io/main/index.json";
    try {
        let response = await fetch(url);
        console.log(response);
        if (response.status == 200) {
            return await response.json();
        }
        else {
            console.log(response.status)
        }
    } catch (error) {
        console.log(error);
    }
}

async function rendermusic() {
    let music = await fetchmusic();
    console.log(music);
    let html = '';

    
;   let htmlSegment = 
                            `<div class="user">
                            <h2>${music["allthat"].name} ${music["allthat"].artist}</h2>
                            <div class="email"><a href="email:${music["allthat"].audio}">${music["allthat"].audio}</a></div>
                            </div>`
    html += htmlSegment;

    let container = document.querySelector(".usercon");
    container.innerHTML = html;
}

rendermusic();