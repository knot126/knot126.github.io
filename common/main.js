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
		navbar.innerHTML = "<i>Failed to load navbar.</i>";
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
	let keywords = ["function", "if", "else", "while", "for", "switch", "case", "new", "array"];
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
