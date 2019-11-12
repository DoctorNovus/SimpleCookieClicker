export class GameManager {
    constructor() {
        // How many auto clickers
        this.autoclickers;
        // How many cookies
        this.count;
        // Giant cookie clicker
        this.cookie;
        // Colors to be picked from when making a "+1"
        this.colors = [
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

        /*
        System for setting the cookie to either 0 or the amount in localstrorage
    */
        if (localStorage.getItem("cookies")) {
            if (parseInt(localStorage.getItem("cookies")).type == (undefined || null || NaN)) {
                this.count = 0;
                localStorage.setItem("cookies", 0);
            } else {
                this.count = parseInt(localStorage.getItem("cookies"));
            }
        } else {
            localStorage.setItem("cookies", 0);
            this.count = 0;
        }

        /* 
            System for setting the auto clickers to 0 unless localstorage amount is present. 
        */

        if (localStorage.getItem("autoclickers")) {
            if (parseInt(localStorage.getItem("autoclickers")).type == (undefined || null || NaN)) {
                this.autoclickers = 0;
                localStorage.setItem("autoclickers", 0);
            } else {
                this.autoclickers = parseInt(localStorage.getItem("autoclickers"));
            };
        } else {
            localStorage.setItem("autoclickers", 0);
            this.autoclickers = 0;
        }

        // System for fixing the NaN error when starting up the game
        if (this.autoclickers == NaN || this.count == NaN) {
            localStorage.clear();
            window.location.reload();
        }
    }

    /**
     * Adds a colorful +1 around the cookie location.
     * @param {Number} this.countOfCookies 
     */
    addCookie(countOfCookies = 0) {
        // Giant cookie on screen
        let cookie = document.getElementById("cookie");
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
        tex.style.color = this.colors[Math.floor(Math.random() * this.colors.length)]

        /* 
            System of adding and deleting the +1
        */
        document.body.appendChild(tex);

        setTimeout(() => {
            document.body.removeChild(tex);
        }, 500);

        // Adds the amount of cookies to the total cookie this.count
        this.count += countOfCookies;
        // Localstorage transfer setting amount of cookies to this.count
        localStorage.setItem("cookies", this.count);

        // Sets text to update amount of cookies
        cookieCount.innerText = `Cookies: ${this.count}`;
    };

    /**
     * Randomly moves to cookie, giving it a "Shaking" feeling
     */
    moveCookie() {
        // Giant cookie on screen
        let cookie = document.getElementById("cookie");
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

    /**
     * Basic setup of the auto clicker
     * @param {GameManager} gm
     */
    autoclick(gm) {
        gm.addCookie(1);
        gm.moveCookie();
        gm.detectAuto();
    };

    /**
     * Detects whenever cookies should be turned into clickers
     */
    detectAuto() {
        if (this.count >= Math.floor(Math.PI * this.autoclickers * 100)) {
            this.count -= Math.floor(Math.PI * this.autoclickers * 100);
            this.autoclickers++;
            localStorage.setItem("autoclickers", this.autoclickers);

            let clickers = document.getElementById("clickers");
            clickers.innerText = `Auto Clickers: ${this.autoclickers}`;

            let rc = document.getElementById("remainingCookies");
            rc.innerText = `${Math.floor(Math.PI * this.autoclickers * 100) - this.count} cookies remaining until next auto clicker.`;
        } else {
            let rc = document.getElementById("remainingCookies");
            rc.innerText = `${Math.floor(Math.PI * this.autoclickers * 100) - this.count} cookies remaining until next auto clicker. `;
        }
    };
}