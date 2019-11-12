/**
 * Imports from Iris
 */
import { Router, View } from "@outwalk/iris";

// Base view for the SPA
let base = new View("menu.html");
// Game view for the SPA
let game = new View("game.html");

/**
 * Code ran when Main menu is executed
 */
base.run = function() {
    console.log("Test");
};

// How many auto clickers
let autoclickers;
// How many cookies
let count;
// Giant cookie clicker
let cookie;

/**
 * Adds a colorful +1 around the cookie location.
 * @param {HTMLElement} cookie 
 * @param {Number} countOfCookies 
 */
let addCookie = function(cookie, countOfCookies = 0) {
    // Colors to be picked from when making a "+1"
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


    // Width of cookie
    let width = cookie.width;
    // Height of cookie
    let height = cookie.height;

    // A random x position to place the +1
    let randX = Math.floor(Math.random() * width);
    // A random y position to place the +1
    let randY = Math.floor(Math.random() * height);

    // The actual element
    let tex = document.createElement("p");
    // How many cookies are to be added, typically 1
    tex.innerText = `+${(1 * countOfCookies)}`;
    // Styles for the +1
    tex.style.position = "absolute";
    tex.style.left = randX + "px";
    tex.style.top = randY + "px";
    tex.style.color = colors[Math.floor(Math.random() * colors.length)]

    /* 
        System of adding and deleting the +1
    */
    document.body.appendChild(tex);

    setTimeout(() => {
        document.body.removeChild(tex);
    }, 500);

    // Adds the amount of cookies to the total cookie count
    count += countOfCookies;
    // Localstorage transfer setting amount of cookies to count
    localStorage.setItem("cookies", count);

    // Sets text to update amount of cookies
    cookieCount.innerText = `Cookies: ${count}`;
};

/**
 * Randomly moves to cookie, giving it a "Shaking" feeling
 */
function moveCookie() {
    cookie = document.getElementById("cookie");
    // X position of the cookie
    let cX = cookie.offsetWidth;
    // Y position of the cookie
    let cY = cookie.offsetHeight;

    // New x location for the cookie
    cookie.style.left = Math.floor(Math.random() * cX) / 5 + "px";
    // New y location for the cookie
    cookie.style.top = Math.floor(Math.random() * cY) / 5 + "px";

    // Sets the cookie back to original location after 1 second
    setTimeout(() => {
        cookie.style.left = cX;
        cookie.style.top = cY;
    }, 1000);
};

// Basic setup of the auto clicker
function autoclick() {
    addCookie(cookie, 1);
    moveCookie();
    detectAuto();
};

/**
 * Automatically detects if the cookies should be turned into auto clickers. 
 */
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

/**
 * Executes when the game runs
 */
game.run = function() {
    cookie = document.getElementById("cookie");

    /*
        System for setting the cookie to either 0 or the amount in localstrorage
    */
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

    /* 
        System for setting the auto clickers to 0 unless localstorage amount is present. 
    */

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

    // System for fixing the NaN error when starting up the game
    if (autoclickers == NaN || count == NaN) {
        localStorage.clear();
        window.location.reload();
    }

    // Text setup to show amount of clickers
    let clickers = document.getElementById("clickers");
    clickers.innerText = `Auto Clickers: ${autoclickers}`;

    // Text setup to show amount of cookies needed before the next auto clicker
    let rc = document.getElementById("remainingCookies");
    rc.innerText = `${Math.floor(Math.PI * autoclickers * 100) - count} cookies remaining until next auto clicker.`;


    // Text setup to show how many cookies there are based on count
    let cookieCount = document.getElementById("cookieCount");
    cookieCount.innerText = `Cookies: ${count}`;

    // Cookie clicker simple setup
    cookie.onclick = function() {
        addCookie(cookie, 1);
        moveCookie();
        detectAuto();
    };

    // Loops the auto clicker system to click every second 
    setInterval(() => {
        if (autoclickers > 0) {
            for (let x = 0; x < autoclickers; x++) {
                autoclick();
            };
        };
    }, 1000);
};

// Iris router for setting up the SPA using base and game views
const router = new Router({
    "/": base,
    "/game": game
});

// Starts the entire SPA up
router.start();