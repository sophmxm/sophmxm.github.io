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
		let dot_area = document.createElement("div");
		nav_dots.appendChild(dot_area);

		let dot = document.createElement("div");
		dot.classList.add("dot");
		dot_area.appendChild(dot);

		// On click dot, scroll to section
		dot_area.onclick = () => {
			main_sections[i].scrollIntoView({ behavior: "smooth", block: "center" });
		};

		// Add element to array
		nav_dots_list.push(dot);

		// If section has icon attached
		if (main_sections[i].dataset.icon != null) {
			// Add class to dot if has icon attached to section
			nav_dots_list[i].classList.add("has-icon");

			// Create icon in nav dots
			let icon = document.createElement("iconify-icon");
			icon.icon = main_sections[i].dataset.icon;
			dot.appendChild(icon);
		}
	}
}

// Set active navigation section dot
function setActiveNavDot() {
	// Check each section
	for (let i = 0; i < main_sections.length; i++) {
		// Check if scroll is within bounds of one of the sections and set active style
		if (main_sections[i].offsetTop < main.scrollTop + main.offsetHeight / 4 && main_sections[i].offsetTop + main_sections[i].offsetHeight > main.scrollTop + main.offsetHeight / 4) {
			// Remove style from previous active dot
			for (let j = 0; j < nav_dots_list.length; j++) {
				if (nav_dots_list[j].classList.contains("active") && nav_dots_list[j] != nav_dots_list[i]) {
					// Remove active class from previous active dot
					nav_dots_list[j].classList.remove("active");

					// Check if previous active dot is above or below current active dot
					if (j > i) {
						nav_dots_list[j].style.animation = "nav-dots-shrink-up 500ms";
					} else {
						nav_dots_list[j].style.animation = "nav-dots-shrink-down 500ms";
					}
					// Remove animation style
					setTimeout(() => {
						nav_dots_list[j].style.animation = "";
					}, 500);
				}
			}
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
