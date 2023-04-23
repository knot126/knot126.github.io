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
}

function main() {
	download_sidebar();
}
