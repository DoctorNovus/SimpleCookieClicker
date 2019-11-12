/**
 * Imports from Iris
 */
import { Router, View } from "@outwalk/iris";
import { GameManager } from "./gameManager";

let gm = new GameManager();

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

/**
 * Executes when the game runs
 */
game.run = function() {
    gm.cookie = document.getElementById("cookie");

    // Text setup to show amount of clickers
    let clickers = document.getElementById("clickers");
    clickers.innerText = `Auto Clickers: ${gm.autoclickers}`;

    // Text setup to show amount of cookies needed before the next auto clicker
    let rc = document.getElementById("remainingCookies");
    rc.innerText = `${Math.floor(Math.PI * gm.autoclickers * 100) - gm.count} cookies remaining until next auto clicker.`;

    let cookie = document.getElementById("cookie");

    // Text setup to show how many cookies there are based on count
    let cookieCount = document.getElementById("cookieCount");
    cookieCount.innerText = `Cookies: ${gm.count}`;

    // Cookie clicker simple setup
    cookie.onclick = function() {
        gm.addCookie(1);
        gm.moveCookie();
        gm.detectAuto();
    };

    // Loops the auto clicker system to click every second 
    setInterval(() => {
        if (gm.autoclickers > 0) {
            for (let x = 0; x < gm.autoclickers; x++) {
                gm.autoclick(gm);
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