function decodeEmail(email_address) {
	let result = atob(atob(email_address));
	let place = document.getElementById("email-" + email_address);
	
	place.innerHTML = "<h3><a href=\"mailto:" + result + "\">" + result + "</a></h3>";
}

function request(method, url, body, handler) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = handler;
	xhr.open(method, url);
	xhr.send(body);
}

function getParam(named) {
	return (new URLSearchParams(document.location.search)).get(named);
}

function hasParam(named) {
	return (new URLSearchParams(document.location.search)).has(named);
}

function download_sidebar() {
	request("GET", "./navbar.html", "", setup_sidebar);
}

function setup_sidebar() {
	if (this.readyState == 4 && this.status == 200) {
		let navbar = document.getElementById("navbar");
		navbar.innerHTML = this.responseText;
	}
	else if (this.readyState == 4) {
		let navbar = document.getElementById("navbar");
		navbar.innerHTML = "<p><i>Failed to load navbar.</i></p>";
	}
}

/** BLOG INDEX **/
function download_blog_index() {
	request("GET", "./blog/blog.json", "", setup_blog_index);
}

function setup_blog_index() {
	let index = document.getElementById("blog-index");
	
	if (this.readyState == 4 && this.status == 200) {
		let entries = JSON.parse(this.responseText);
		
		index.innerHTML = "<h1>Blog</h1>";
		
		for (let entry of entries) {
			index.innerHTML += `<div class="card-section">
				<h3><a href="${entry.url}">${entry.title}</a></h3>
				<p>${entry.date}</p>
				<p>${entry.desc}</p>
			</div>`;
		}
	}
	else if (this.readyState == 4) {
		index.innerHTML = "<p><i>Failed to load blog posts!</i></p>";
	}
}

/** BLOG PAGE **/
function download_blog_page() {
	request("GET", "./blog/" + getParam("page"), "", setup_blog_page);
}

function setup_blog_page() {
	let sect = document.getElementById("main");
	
	if (this.readyState == 4 && this.status == 200) {
		sect.innerHTML = marked.parse(this.responseText);
	}
	else if (this.readyState == 4 && this.status == 404) {
		sect.innerHTML = "<h1>404 Not found!</h1><p><i>This blog page does not exist.</i></p>";
	}
	else if (this.readyState == 4) {
		sect.innerHTML = "<p><i>Failed to load blog page.</i></p>";
	}
}

/** load function to call from html **/
function blog_load() {
	if (hasParam("page")) {
		download_blog_page();
	}
	else {
		download_blog_index();
	}
}

function main() {
	download_sidebar();
}

function chr(s) {
	return s.charCodeAt(0);
}

function is_number(s) {
	return (chr(s) >= chr("0")) && (chr(s) <= chr("9"));
}

function format_string(str) {
	let keywords = ["function", "if", "else", "while", "for", "switch", "case", "new", "array", "then", "end", "do", "return", "true", "false"];
	let output = "";
	
	// The identifier hack will not use number formatting for a number if a
	// valid symbol character ($, _, A-Z, a-z) precedes it. It only works for
	// one number in and id, but it should be good enough for anything on this
	// site.
	let identifier_hack = false;
	
	while (str.length > 0) {
		current = str[0];
		
		switch (current) {
			// Numbers
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				if (identifier_hack) {
					output += current;
				}
				else {
					output += "<code-number>" + current + "</code-number>";
				}
				str = str.slice(1);
				break;
			
			// Dots: If around numbers, format as that.
			case ".":
				if (str.length >= 2 && is_number(str[1])) {
					output += "<code-number>" + current + "</code-number>";
				}
				else {
					output += current;
				}
				
				str = str.slice(1);
				break;
			
			// Quotes are strings!
			case "\"":
			case "\'":
				str = str.slice(1);
				let i = str.indexOf(current);
				
				if (i >= 0) {
					let highlighted = current + str.slice(0, i) + current;
					output += "<code-string>" + highlighted + "</code-string>";
					str = str.slice(i + 1);
				}
				else {
					output += current;
				}
				
				break;
			
			case "{":
			case "}":
			case "(":
			case ")":
			case ",":
			case "=":
			case "~":
			case "|":
			// case ";":
				output += "<code-special>" + current + "</code-special>";
				str = str.slice(1);
				
				break;
			
			// Anything else is normal
			default:
				let found = false;
				
				for (let k = 0; k < keywords.length; k++) {
					if (str.startsWith(keywords[k])) {
						str = str.slice(keywords[k].length);
						output += "<code-keyword>" + keywords[k] + "</code-keyword>";
						
						found = true;
						break;
					}
				}
				
				if (!found) {
					output += current;
					str = str.slice(1);
				}
				
				break;
		}
		
		// bad code :thumbsup:
		identifier_hack = 
			((current.charCodeAt(0) >= 'a'.charCodeAt(0)) && (current.charCodeAt(0) <= 'z'.charCodeAt(0)))
			|| ((current.charCodeAt(0) >= 'A'.charCodeAt(0)) && (current.charCodeAt(0) <= 'Z'.charCodeAt(0)))
			|| current == '_' || current == '$';
	}
	
	return output;
}

function format_section(id) {
	let e = document.getElementById(id);
	e.innerHTML = format_string(e.innerHTML);
}

function format_codes() {
	/**
	 * Format code0, code1, code2, etc.
	 */
	
	let i = 0;
	
	while (true) {
		let e = document.getElementById("code" + i);
		
		if (!e) {
			break;
		}
		
		format_section("code" + i);
		
		i += 1;
	}
}

function setup_copyright() {
	document.getElementById("copyright").innerHTML = "This website is Copyright © 2020 — 2024 Knot126";
}

var gQuotes = [
	"I really like Tails.",
	"best foxxo ever :3",
	"The answer is maybe...",
	"Hello, world!",
	"I am PRO GAMER (0% true)",
	"These quotes are random!",
	"Put something embarassing here.",
	"You've been rickrolled B)",
	"TAILS!",
	"The aroace flag is really nice :)",
	"🖤🩶🤍💜",
	"MISSING STRING",
	"100% Money Back True",
	"exists (impossible)",
	"I do not work for shit stain studios.",
	"Hold gently, like hamburger.",
	"AWOOO!",
	"FIRE IN THE HOLE!",
	"Earth is like Hell: it exists.",
	"I really like Tails",
	"Miles &quot;Tails&quot; Prower",
	"Recently used tags: #tails",
	"It's magic, Joel, it's magic",
	"There are foxes, and then there is everything else.",
	"its someone with a tails the fox pfp ahh",
	"I think Nine was cool :D",
	"Used to be a dragon",
	"Not a dragon anymore",
	"Too much for little time",
	"Has tried to learn Lisp at least once",
	"University? my arse!",
	"<code>var foxxo = good;</code>",
	"<code>messageNotUnderstood:</code>",
	"<code>(defun age () (* 4 2 0))</code>",
];

function randint(max) {
	return Math.floor(Math.random() * max);
}

function me_randomise_quote() {
	let e = document.getElementById("me-random-quote");
	e.innerHTML = `<img src="common/refresh.svg" style="position: absolute;" onclick="me_randomise_quote()" /><span style="padding-right: calc(32px + 0.5em);"></span>`;
	e.innerHTML += gQuotes[randint(gQuotes.length)];
}
