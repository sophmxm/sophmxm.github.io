"use strict";

let main = document.getElementsByTagName("main")[0];

let nav_dots = document.getElementById("nav-dots");
let nav_dots_list = [];
let main_sections = document.querySelectorAll("main>section");
console.log(main_sections);

function createNavDots() {
	for (let i = 0; i < main_sections.length; i++) {
		let dot = document.createElement("div");
		dot.classList.add("dot");
		nav_dots.appendChild(dot);

		nav_dots_list.push(dot);
	}
}

function setActiveNavDot() {
	for (let i = 0; i < main_sections.length; i++) {
		// Check if scroll is within bounds of one of the sections
		if (main_sections[i].offsetTop < main.scrollTop + main.offsetHeight / 4 && main_sections[i].offsetTop + main_sections[i].offsetHeight > main.scrollTop + main.offsetHeight / 4) {
			nav_dots_list.forEach((dot) => dot.classList.remove("active"));
			nav_dots_list[i].classList.add("active");
		}
	}
}

main.addEventListener("scroll", setActiveNavDot);

createNavDots();
setActiveNavDot();
