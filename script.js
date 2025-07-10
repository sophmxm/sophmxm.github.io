"use strict";

let main = document.getElementsByTagName("main")[0];

let nav_dots = document.getElementById("nav-dots");
let nav_dots_list = [];
let main_sections = document.querySelectorAll("main>section");
console.log(main_sections);

// Create the navigation section dots
function createNavDots() {
	// For each section in main, create navigation dot
	for (let i = 0; i < main_sections.length; i++) {
		let dot = document.createElement("div");
		dot.classList.add("dot");
		nav_dots.appendChild(dot);

		// On click dot, scroll to section
		dot.onclick = () => {
			main_sections[i].scrollIntoView({ behavior: "smooth", block: "center" });
		};

		// Add element to array
		nav_dots_list.push(dot);
	}
}

// Set active navigation section dot
function setActiveNavDot() {
	// Check each section
	for (let i = 0; i < main_sections.length; i++) {
		// Check if scroll is within bounds of one of the sections and set active style
		if (main_sections[i].offsetTop < main.scrollTop + main.offsetHeight / 4 && main_sections[i].offsetTop + main_sections[i].offsetHeight > main.scrollTop + main.offsetHeight / 4) {
			// Remove style from previous active dot
			nav_dots_list.forEach((dot) => dot.classList.remove("active"));
			// Add style to current active dot
			nav_dots_list[i].classList.add("active");
		}
	}
}

// Set active navigation dot on scroll event
main.addEventListener("scroll", setActiveNavDot);

// Staggered reveal content effect
function revealContent() {
	for (let i = 0; i < main.children.length; i++) {
		console.log(main.children[i].children);
		for (let j = 0; j < main.children[i].children.length; j++) {
			// Add animation delay effect to each section in content
			main.children[i].children[j].style.animationDelay = `calc(350ms + ${j * 150}ms)`;
		}
	}
}

createNavDots();
setActiveNavDot();
revealContent();
