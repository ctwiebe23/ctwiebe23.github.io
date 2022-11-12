async function fetchuser() {
    let url = "https://raw.githubusercontent.com/ctwiebe23/ctwiebe23.github.io/main/users.json";
    try {
        let response = await fetch(url);
        console.log(response);
        if (response.status == 200) {
            return await response.json();
        }
        else {
            console.log(response.status)
        }
        // break to catch, throw error
    } catch (error) {
        console.log(error);
    }
}

async function renderuser() {
    let users = await fetchuser();
    //console.log(user);
    let html = '';

    users.forEach(user => {
        console.log(user)
;        let htmlSegment = 
                            `<div class="user">
                            <h2>${user.firstname} ${user.lastname}</h2>
                            <div class="email"><a href="email:${user.email}">${user.email}</a></div>
                            </div>`
        html += htmlSegment;
    });

    let container = document.querySelector(".usercon");
    container.innerHTML = html;
}

renderuser();