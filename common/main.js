/*
 * Main.js - Part of Knot's New Website
 * 
 * This is the main CSS file.
 */ 

// Cookies
// =======
// 
// Setting and getting cookies.

var cookies = {};

function loadCookies() {
	cookies = document.cookie;
	cookies = cookies.split(";");
	
	let parsedCookies = {};
	
	for (i = 0; i < cookies.length; i += 2) {
		let pair = cookies[i].split("=")
		parsedCookies[pair[0]] = pair[1];
		console.log("Loaded cookie : ", pair[0], pair[1]);
	}
	
	cookies = parsedCookies;
}

function saveCookies() {
	let savedCookies = "";
	
	for (let key in cookies) {
		savedCookies += key + "=" + cookies[key] + "; SameSite=Strict; ";
	}
	
	document.cookie = savedCookies;
}

// Site-specific
//
// Some extra site specific things

function afterLoad() {
	/*
	 * Function that should be run after page load 
	 */
	loadCookies();
	
	let theme = "light";
	
	if (cookies.hasOwnProperty("theme")) {
		theme = cookies.theme;
	}
	
	setTheme(theme);
}

function setTheme(theme) {
	/*
	 * Set the current theme
	 */
	if (theme == "dark") {
		var main = document.getElementById("container");
		main.classList.add("page-dark");
	}
	
	if (theme == "light") {
		var main = document.getElementById("container");
		main.classList.remove("page-dark");
	}
	
	cookies["theme"] = theme;
	saveCookies();
}

function toggleTheme() {
	/*
	 * Toggle between the light and dark themes
	 */
	
	if (cookies.theme == "light") {
		setTheme("dark");
		document.getElementById("swapper").src = "./common/light.svg";
	}
	
	else if (cookies.theme == "dark") {
		setTheme("light");
		document.getElementById("swapper").src = "./common/dark.svg";
	}
	
	console.log("Swapped themes!");
}
