"use strict";

let main = document.getElementsByTagName("main")[0];

let nav_dots = document.getElementById("nav-dots");
let nav_dots_list = [];
let main_sections = document.querySelectorAll("main>section:not(.hidden)");

// Default values
let dark_mode = false;
let one_page = false;

// Create the navigation section dots
function createNavDots() {
	// Clear nav dots
	nav_dots_list = [];
	nav_dots.innerText = "";

	// For each section in main, create navigation dot
	for (let i = 0; i < main_sections.length; i++) {
		// Create dot area
		let dot_area = document.createElement("div");
		nav_dots.appendChild(dot_area);

		// Create dot
		let dot = document.createElement("div");
		dot.classList.add("dot");
		dot_area.appendChild(dot);

		// Create label text of header that appears on hover
		let label = document.createElement("div");
		// Get the first header in the section
		for (let j = 0; j < main_sections[i].children.length; j++) {
			if (main_sections[i].children[j].tagName == "H1") {
				label.innerText = main_sections[i].children[j].innerText;
				j++;
			} else if (main_sections[i].children[j].tagName == "H2") {
				label.innerText = main_sections[i].children[j].innerText;
				j++;
			}
		}
		dot_area.appendChild(label);

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
	setActiveNavDot();
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

function createSettingsBtns() {
	let settings_btns = document.getElementById("settings-btns");

	createDarkModeBtn(settings_btns);
	createScrollToTopBtn(settings_btns);
}

// Create dark mode button
function createDarkModeBtn(container) {
	// Create button
	let btn = document.createElement("button");
	btn.onclick = () => {
		toggleDarkMode(icon);
	};
	container.appendChild(btn);

	// Create icon and change icon
	let icon = document.createElement("iconify-icon");
	if (localStorage.getItem("isDarkMode") == "true") icon.icon = "mage:moon-fill";
	else icon.icon = "mage:sun-fill";
	btn.appendChild(icon);

	// Create label
	let label = document.createElement("div");
	label.innerText = "Dark/light mode";
	btn.appendChild(label);
}

// Create scroll to top button
function createScrollToTopBtn(container) {
	// Create button
	let btn = document.createElement("button");
	btn.id = "scroll-to-top-btn";
	btn.classList.add("hidden");
	btn.onclick = () => {
		scrollToTop();
	};
	container.appendChild(btn);

	// Create icon
	let icon = document.createElement("iconify-icon");
	icon.icon = "mingcute:up-fill";
	btn.appendChild(icon);

	// Create label
	let label = document.createElement("div");
	label.innerText = "Scroll to top";
	btn.appendChild(label);

	// On scroll, reveal button
	main.addEventListener("scroll", () => {
		revealScrollToTopBtn(btn);
	});
}

// Staggered reveal content effect
function revealContent() {
	for (let i = 0; i < main.children.length; i++) {
		for (let j = 0; j < main.children[i].children.length; j++) {
			// Add animation delay effect to each section in content
			main.children[i].children[j].style.animationDelay = `calc(350ms + ${j * 150}ms)`;
		}
	}
}

// Create contact link list (from ul.contact-links)
function createContactLinks() {
	let parent = [...document.getElementsByClassName("contact-links")];
	let contact_links = [
		["mailto:sophmxm@gmail.com", "ic:round-email", "sophmxm@gmail.com"],
		["https://www.linkedin.com/in/sophmxm/", "mdi:linkedin", "linkedin.com/sophmxm"],
		["https://github.com/sophmxm", "mingcute:github-fill", "github.com/sophmxm"],
	];

	// For each element with class contact links, create links
	parent.forEach((element) => {
		// For each contact link in array, create link
		for (let i = 0; i < contact_links.length; i++) {
			let list_item = document.createElement("li");
			element.appendChild(list_item);

			let link = document.createElement("a");
			link.target = "_blank";
			link.href = contact_links[i][0];
			link.innerText = contact_links[i][2];
			list_item.appendChild(link);

			let icon = document.createElement("iconify-icon");
			icon.icon = contact_links[i][1];
			link.prepend(icon);
		}
	});
}

// Create about me text (from div.about-me-text)
function createAboutMeText() {
	let parent = [...document.getElementsByClassName("about-me-text")];
	let about_me_text = [
		"Hi, I’m Sophie! I’m an emerging interaction designer who specialises in UI/UX and visual design, with a big passion for web design and development.",
		"As both an artist and designer, I enjoy producing visually engaging digital works that focus on creating fun and interactive experiences. I love designing for people and problem-solving, always striving to create intuitive and user-centered solutions.",
	];

	// For each element with class about me text, create text
	parent.forEach((element) => {
		// Create first paragraph and prepend
		let p1 = document.createElement("p");
		p1.innerText = about_me_text[0];
		element.prepend(p1);

		// Create paragraphs after first paragraph
		for (let i = 1; i < about_me_text.length; i++) {
			let p = document.createElement("p");
			p.innerText = about_me_text[i];
			p1.after(p);
		}
	});
}

// Attached to button to top
function scrollToTop() {
	main.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

function revealScrollToTopBtn(btn) {
	if (main.scrollTop > 100) btn.classList.remove("hidden");
	else btn.classList.add("hidden");
}

// Check and set to one page or multiple section scroll
function checkIsOnePage() {
	// One page section
	let one_page_section = document.getElementById("one-page");

	// Check local storage
	if (localStorage.getItem("isOnePage") == null) localStorage.setItem("isOnePage", one_page);
	else if (localStorage.getItem("isOnePage") == "false") one_page = false;
	else if (localStorage.getItem("isOnePage") == "true") one_page = true;

	// Set hidden class to sections
	if (one_page === false) {
		one_page_section.classList.add("hidden");
		document.querySelectorAll("main>section:not(#one-page)").forEach((section) => section.classList.remove("hidden"));
	} else {
		one_page_section.classList.remove("hidden");
		document.querySelectorAll("main>section:not(#one-page)").forEach((section) => section.classList.add("hidden"));
	}

	// Update main sections array
	main_sections = document.querySelectorAll("main>section:not(.hidden)");
}

// Attached to button to toggle one page and multiple section scroll
function toggleOnePage() {
	// Set local storage
	if (localStorage.getItem("isOnePage") == "true") localStorage.setItem("isOnePage", false);
	else localStorage.setItem("isOnePage", true);

	// Reload page and nav dots
	checkIsOnePage();
	createNavDots();
}

// Check and set to light mode or dark mode
function checkIsDarkMode() {
	// Check local storage
	if (localStorage.getItem("isDarkMode") == null) localStorage.setItem("isDarkMode", dark_mode);
	else if (localStorage.getItem("isDarkMode") == "false") dark_mode = false;
	else if (localStorage.getItem("isDarkMode") == "true") dark_mode = true;

	// Set dataset mode
	if (dark_mode === false) {
		document.documentElement.dataset.mode = "light";
	} else {
		document.documentElement.dataset.mode = "dark";
	}
}

// Attached to button to toggle light mode and dark mode
function toggleDarkMode(icon) {
	// Set local storage and change icon
	if (localStorage.getItem("isDarkMode") == "true") {
		localStorage.setItem("isDarkMode", false);
		icon.icon = "mage:sun-fill";
	} else {
		localStorage.setItem("isDarkMode", true);
		icon.icon = "mage:moon-fill";
	}

	checkIsDarkMode();
}

// Get all elements with the dataset textbox and reveal text box on hover
function getTextBoxElements() {
	// Get all elements with the text box dataset
	let text_box_elements = document.querySelectorAll("[data-textbox]");

	// For each element with the dataset
	text_box_elements.forEach((element) => {
		// On hover, reveal text box and set text
		element.addEventListener("mouseenter", () => {
			createTextBox(element);
		});
	});
}

// Set text and reveal text box
function createTextBox(element) {
	// Text box element
	let text_box = document.getElementById("text-box");

	// Reveal text box and set text
	text_box.style.display = "block";
	text_box.innerText = element.dataset.textbox;

	// Move text box with mouse
	element.addEventListener("mousemove", (event) => {
		const { clientX, clientY } = event;

		// Animate text box
		text_box.animate(
			{
				left: `${clientX + 10}px`,
				top: `${clientY - text_box.clientHeight * 0.9 - 3}px`,
			},
			{ duration: 1000, fill: "forwards" }
		);
	});

	// One mouse leave, hide and reset text box
	element.addEventListener("mouseleave", () => {
		text_box.style.display = "";
		text_box.innerText = "";
	});
}

checkIsOnePage();
checkIsDarkMode();
createContactLinks();
createAboutMeText();
createNavDots();
createSettingsBtns();
revealContent();
getTextBoxElements();

// Set body transition after loaded
document.body.style.transition = "350ms";
