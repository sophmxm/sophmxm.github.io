"use strict";

/* MAIN ELEMENTS */

const header = document.getElementsByTagName("header")[0];
const main = document.getElementsByTagName("main")[0];
const footer = document.getElementsByTagName("footer")[0];

/* OTHER VARIABLES */

let contact_links = [
	{ type: "email", text: "sophmxm@gmail.com", link: "mailto:sophmxm@gmail.com", icon: "ic:round-email" },
	{ type: "phone", text: "+61 479 073 711", link: "#", icon: "f7:phone-fill" },
	{ type: "linkedin", text: "linkedin.com/sophmxm", link: "https://www.linkedin.com/in/sophmxm/", icon: "mdi:linkedin" },
];

let cycle_time = { typing: 1250, deleting: 1250, pause: 2500, delay: 500 };
let interval_time = Object.values(cycle_time).reduce((a, b) => {
	return a + b;
});

/* INITIATE FUNCTIONS AND CREATE DOCUMENT */

initiateDocument();

function initiateDocument() {
	createMainDocument();
	centreFirstSection();

	// Cycle sub header text if sub header exists
	if (document.getElementById("text-cycle-anim") != null) {
		subHeaderCycleText();
	}

	// Return time every second if time element exists
	if (document.getElementById("time") != null) {
		returnLocalTime();
		setInterval(() => {
			returnLocalTime();
		}, 1000);
	}
}

// Create main elements and functions of each document
function createMainDocument() {
	if (header != null) createNav();
	if (footer != null) createFooter();
}

/* FUNCTIONS */

function subHeaderCycleText() {
	// Elements
	let span = document.getElementById("text-cycle-anim");
	let cursor = document.querySelector("#text-cycle-anim+div.cursor");

	// Text
	let text_array = ["an emerging designer", "designing interactions", "developing websites", "learning coding languages", "designing fun", "looking to learn more", "a cat lover", "making for people"];

	// Cycle sub header text if sub header exists
	if (span != null) {
		cycleText(span, text_array, cursor);
	}
}

function cycleText(element, text_array, cursor) {
	// Initial cycle of text array
	cycleTextAnimation(element, text_array, cursor);

	// Set interval for each cycle of text array
	setInterval(() => {
		element.innerText = "";
		cycleTextAnimation(element, text_array, cursor);
	}, interval_time * text_array.length);
}

function cycleTextAnimation(element, text_array, cursor) {
	for (let i = 0; i < text_array.length; i++) {
		setTimeout(() => {
			typeWriter(element, text_array[i], cursor);
		}, interval_time * i);
	}
}

function typeWriter(element, text, cursor) {
	if (cursor) cursor.style.animation = "none";

	// Calculate typing interval time
	let typing_interval_time = cycle_time.typing / (text.length + 1);

	for (let i = 0; i < text.length; i++) {
		setTimeout(() => {
			element.textContent += text.charAt(i);

			if (i == text.length - 1) {
				if (cursor) {
					cursor.style.right = "-16px";
					cursor.style.animation = "";
				}

				setTimeout(() => {
					typeWriterBackspace(element, cursor);
				}, cycle_time.pause);
			}
		}, typing_interval_time * i);
	}
}

function typeWriterBackspace(element, cursor) {
	if (cursor) cursor.style.animation = "none";

	// Calculate typing interval time
	let typing_interval_time = cycle_time.typing / (element.textContent.length + 1);

	for (let i = 0; i < element.textContent.length; i++) {
		setTimeout(() => {
			element.textContent = element.textContent.slice(0, -1);

			if (cursor && i == element.textContent.length - 1) {
				cursor.style.animation = "";
				cursor.style.right = "-24px";
			}
		}, typing_interval_time * i);
	}
}

function returnLocalTime() {
	let date = new Date();

	const date_options = {
		timeZone: "Australia/Brisbane",
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	const time_options = {
		timeZone: "Australia/Brisbane",
		timeZoneName: "short",
		hourCycle: "h24",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};

	document.getElementById("time").innerText = date.toLocaleString("default", time_options) + ", " + date.toLocaleString("default", date_options);
}

// 50% top padding in main
function centreFirstSection() {
	let first_section = document.querySelector("main>section:first-of-type:not(.uncentered)");
	main.style.paddingTop = `calc(50vh - ${first_section.clientHeight / 2}px)`;
	main.style.minHeight = `calc(50vh + ${first_section.clientHeight / 2}px)`;
}

function createNav() {
	let nav_links = [
		["Sophie Martin", "/"],
		["My stuff", ""],
		["About me", "about-me.html"],
		["Say hi", ""],
	];

	let nav = document.createElement("nav");
	header.appendChild(nav);

	let ul = document.createElement("ul");
	nav.appendChild(ul);

	nav_links.forEach((link) => {
		let li = document.createElement("li");
		ul.appendChild(li);

		let a = document.createElement("a");
		a.innerText = link[0];
		a.href = link[1];
		li.appendChild(a);
	});
}

function createFooter() {
	let p = document.createElement("p");
	p.innerText = " Email me at ";
	footer.appendChild(p);

	let span = document.createElement("span");
	span.innerText = "Come say hi!";
	p.prepend(span);

	let email_link = document.createElement("a");
	email_link.target = "_blank";
	email_link.innerText = contact_links.find((link) => (link.type = "email")).text;
	email_link.href = contact_links.find((link) => (link.type = "email")).link;
	p.appendChild(email_link);

	// Create icon list
	let ul = document.createElement("ul");
	ul.classList.add("icon-list");
	footer.appendChild(ul);

	// For each link that is not phone, create list item
	contact_links
		.filter((link) => link.type != "phone")
		.forEach((link) => {
			let li = document.createElement("li");
			ul.appendChild(li);

			let a = document.createElement("a");
			a.target = "_blank";
			a.href = link.link;
			li.appendChild(a);

			let icon = document.createElement("iconify-icon");
			icon.icon = link.icon;
			a.appendChild(icon);
		});
}
