var knwbEnableEditor = false;

function decodeEmail(email_address) {
	let result = atob(atob(email_address));
	let place = document.getElementById("email-" + email_address);
	
	place.innerHTML = "<h3><a href=\"mailto:" + result + "\">" + result + "</a></h3>";
}

function openEmail(email_address) {
	window.open("mailto:" + atob(atob(email_address)));
}

function showDialogue(content) {
	let body = document.getElementById("main");
	body.innerHTML += `<div id="dialogue" class="dialogue-background">
	<div class="main-section content-section dialogue-box">${content}</div>
</div>`;
}

function hideDialgoue() {
	let dialogue = document.getElementById("dialogue").remove();
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

function formatDate(t) {
	return (new Date(t * 1000)).toISOString().substring(0, 10);
}

/** Navbar **/
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
		let entries = JSON.parse(this.responseText).reverse();
		
		index.innerHTML = "<h1>Blog</h1>";
		
		if (knwbEnableEditor) {
			index.innerHTML += `<div style="display: grid; grid-template-columns: auto 180px;">
				<div style="grid-column: 1;">
					<div class="textbox-outer"><input id="create-page-input" class="textbox" type="text" placeholder="Page name"/></div>
				</div>
				<div style="grid-column: 2; padding-left: 20px;">
					<button class="button" onclick="openCreatePage()" style="width: 100%; height: 100%;">Create page</button>
				</div>
			</div>`;
			index.innerHTML += `<div style="height: 1em;"></div>`;
		}
		
		// for (let entry of entries) {
		for (let i = 0; i < entries.length; i++) {
			let entry = entries[i];
			
			index.innerHTML += `<div style="padding: 1em; background: #8882; border-radius: 0.25em;">
				<h3 style="padding-top: 0;"><a href="./blog.html?page=${entry.file}">${entry.title}</a></h3>
				<p style="opacity: 0.6;">${(entry.time == 0) ? entry.date : formatDate(entry.time)}</p>
				<p style="margin-bottom: 0;">${entry.desc}</p>
			</div>`;
			
			if (i != entries.length - 1) {
				index.innerHTML += `<div style="height: 1em;"></div>`;
			}
		}
	}
	else if (this.readyState == 4) {
		index.innerHTML = "<p><i>Failed to load blog posts!</i></p>";
	}
}

function openCreatePage() {
	let cpi = document.getElementById("create-page-input");
	window.open("./blog.html?page=" + cpi.value + "&edit=1");
}

/** BLOG PAGE **/
function download_blog_page() {
	request("GET", "./blog/" + getParam("page"), "", setup_blog_page);
}

function setup_blog_page() {
	let sect = document.getElementById("main");
	
	if (!hasParam("edit")) {
		if (this.readyState == 4 && this.status == 200) {
			sect.innerHTML = marked.parse(this.responseText);
		}
		else if (this.readyState == 4 && this.status == 404) {
			sect.innerHTML = "<h1>404 Not found!</h1><p><i>This blog page does not exist.</i></p>";
		}
		else if (this.readyState == 4) {
			sect.innerHTML = "<p><i>Failed to load blog page.</i></p>";
		}
		
		if (this.readyState == 4 && knwbEnableEditor) {
			sect.innerHTML += `<p><button class="button" onclick="editPage()" style="position: absolute; top: 20px; right: 20px;">Edit page</button></p>`;
		}
	} else {
		if (this.readyState == 4 && this.status == 200) {
			setupEditor(sect, this.responseText);
		}
		else if (this.readyState == 4) {
			setupEditor(sect, "");
		}
	}
}

/** Editor **/
function editPage() {
	window.location = window.location + "&edit=1";
}

function setupEditor(sect, mdContent) {
	sect.innerHTML = `
	<h1>Edit page</h1>
	<div style="display: grid; grid-template-columns: 49% 2% auto;">
		<div style="grid-column: 1;">
			<p><textarea id="editor-data" class="blog-editor-code" oninput="updateEditorPreview()"></textarea></p>
		</div>
		<div style="grid-column: 2;"></div>
		<div id="editor-preview" style="grid-column: 3; overflow-y: scroll; height: 50vh;">
		</div>
	</div>
	<p>
		<button class="button" onclick="savePage()">Save page</button>
		<button class="button secondary" onclick="pushChanges()">Push changes</button>
		<span id="editor-error"></span>
	</p>`;
	document.getElementById("editor-data").value = mdContent;
	updateEditorPreview();
}

async function updateEditorPreview() {
	let preview = document.getElementById("editor-preview");
	let data = document.getElementById("editor-data").value;
	preview.innerHTML = marked.parse(data);
}

function setWaiting() {
	document.getElementById("editor-error").innerHTML = `<object data="./common/spinner2.svg" width="20" height="20"></object>`;
}

function savePage() {
	setWaiting();
	
	let data = {
		"page": getParam("page"),
		"content": document.getElementById("editor-data").value,
	};
	
	request("POST", "/api/save", JSON.stringify(data), savePageOnFinish);
}

function savePageOnFinish() {
	let err = document.getElementById("editor-error");
	
	if (this.readyState == 4 && this.status == 200) {
		err.innerHTML = "Saved!";
	}
	else if (this.readyState == 4) {
		err.innerHTML = "Error while saving";
	}
}

function pushChanges() {
	setWaiting();
	request("POST", "/api/push", "", pushChangesOnFinish);
}

function pushChangesOnFinish() {
	let err = document.getElementById("editor-error");
	
	if (this.readyState == 4 && this.status == 200) {
		err.innerHTML = "Pushed changes!";
	}
	else if (this.readyState == 4) {
		err.innerHTML = "Error while pushing";
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
	"The best fox ever :3",
	"The answer is yes",
	"The answer is maybe",
	"The answer is no",
	"Hello, world!",
	"I am (not) PRO GAMER <sup>TM</sup>",
	"These quotes are randomised!",
	"Put something embarassing here",
	"🖤🩶🤍💜",
	"MISSING STRING",
	"100% Money Back True",
	"Hold gently, like hamburger",
	"AWOOO!",
	"Earth is hell",
	"I really like Tails",
	"Miles &quot;Tails&quot; Prower",
	"It's magic",
	"...thinks Nine deserved a better ending",
	"It feels like nuclear winter today",
	"<code>(set 'foxes :good)</code>",
	"<code>(defparameter *approx-age* 0)</code>",
];

function randint(max) {
	return Math.floor(Math.random() * max);
}

function me_randomise_quote() {
	let e = document.getElementById("me-random-quote");
	e.innerHTML = `<img src="common/refresh.svg" style="position: absolute;" onclick="me_randomise_quote()" /><span style="padding-right: calc(32px + 0.5em);"></span>`;
	e.innerHTML += gQuotes[randint(gQuotes.length)];
}
