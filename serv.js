import { Router, View } from "@outwalk/iris";

let base = new View("menu.html");
let game = new View("game.html");
let autoclickers;
let count;

base.run = function() {
    console.log("Test");
};

let addCookie = function(cookie, countOfCookies = 0) {
    let colors = [
        "white",
        "black",
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "cyan",
        "teal",
        "purple"
    ];

    let width = cookie.width;
    let height = cookie.height;

    let randX = Math.floor(Math.random() * width);
    let randY = Math.floor(Math.random() * height);

    let tex = document.createElement("p");
    tex.innerText = `+${(1 * countOfCookies)}`;
    tex.style.position = "absolute";
    tex.style.left = randX + "px";
    tex.style.top = randY + "px";
    tex.style.color = colors[Math.floor(Math.random() * colors.length)]

    document.body.appendChild(tex);

    setTimeout(() => {
        document.body.removeChild(tex);
    }, 500);

    count += countOfCookies;
    localStorage.setItem("cookies", count);

    cookieCount.innerText = `Cookies: ${count}`;
};

let cookie;

function moveCookie() {
    cookie = document.getElementById("cookie");
    let cX = cookie.offsetWidth;
    let cY = cookie.offsetHeight;

    cookie.style.left = Math.floor(Math.random() * cX) / 5 + "px";
    cookie.style.top = Math.floor(Math.random() * cY) / 5 + "px";

    setTimeout(() => {
        cookie.style.left = cX;
        cookie.style.top = cY;
    }, 1000);
};

function autoclick() {
    addCookie(cookie, 1);
    moveCookie();
    detectAuto();
};

function detectAuto() {
    if (count >= Math.floor(Math.PI * autoclickers * 100)) {
        count -= Math.floor(Math.PI * autoclickers * 100);
        autoclickers++;
        localStorage.setItem("autoclickers", autoclickers);

        let clickers = document.getElementById("clickers");
        clickers.innerText = `Auto Clickers: ${autoclickers}`;

        let rc = document.getElementById("remainingCookies");
        rc.innerText = `${Math.floor(Math.PI * autoclickers * 100) - count} cookies remaining until next auto clicker.`;
    } else {
        let rc = document.getElementById("remainingCookies");
        rc.innerText = `${Math.floor(Math.PI * autoclickers * 100) - count} cookies remaining until next auto clicker. `;
    }
};

game.run = function() {
    cookie = document.getElementById("cookie");

    if (localStorage.getItem("cookies")) {
        if (parseInt(localStorage.getItem("cookies")).type == (undefined || null || NaN)) {
            count = 0;
            localStorage.setItem("cookies", 0);
        } else {
            count = parseInt(localStorage.getItem("cookies"));
        }
    } else {
        localStorage.setItem("cookies", 0);
        count = 0;
    }

    if (localStorage.getItem("autoclickers")) {
        if (parseInt(localStorage.getItem("autoclickers")).type == (undefined || null || NaN)) {
            autoclickers = 0;
            localStorage.setItem("autoclickers", 0);
        } else {
            autoclickers = parseInt(localStorage.getItem("autoclickers"));
        };
    } else {
        localStorage.setItem("autoclickers", 0);
        autoclickers = 0;
    }

    let clickers = document.getElementById("clickers");
    clickers.innerText = `Auto Clickers: ${autoclickers}`;

    let rc = document.getElementById("remainingCookies");
    rc.innerText = `${Math.floor(Math.PI * autoclickers * 100) - count} cookies remaining until next auto clicker.`;


    let cookieCount = document.getElementById("cookieCount");

    cookieCount.innerText = `Cookies: ${count}`
    cookie.onclick = function() {
        addCookie(cookie, 1);
        moveCookie();
        detectAuto();
    };

    setInterval(() => {
        if (autoclickers > 0) {
            for (let x = 0; x < autoclickers; x++) {
                autoclick();
            };
        };
    }, 1000);



};

const router = new Router({
    "/": base,
    "/game": game
});

router.start();