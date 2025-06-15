"use strict";

const win_url = window.location.href;
const main = document.getElementsByTagName("main")[0];

// Nav items
const nav = document.getElementById("nav-bar");
const nav_items = [
	["", "", ["mdi:star-four-points-outline", "mdi:star-four-points"]],
	["me", "Me", ["mingcute:user-3-line", "mingcute:user-3-fill"]],
	["my-stuff", "My stuff", ["mingcute:box-3-line", "mingcute:box-3-fill"]],
	["contact", "Contact", ["mingcute:send-plane-line", "mingcute:send-plane-fill"]],
];

// Initialise home page sections
let current_section = nav_items[0];

function initialiseHomePage() {
	let sections = document.querySelectorAll("main>section");

	sections.forEach((section) => {
		section.style.display = "none";
	});

	if (win_url.split("#")[1] != undefined) {
		current_section = nav_items.filter((item) => item.includes(win_url.split("#")[1]))[0];
		switchSection(current_section);
	}
}

// Reveal element effect
function revealElement(element) {
	// Reset
	element.style.opacity = "0";
	element.style.animation = "";

	setTimeout(() => {
		// Add animation delay effect to each section in content
		element.style.animation = "appear-up 500ms ease-in-out";
		element.style.opacity = "1";
	}, 50);
}

// Create skill bars
const skills = document.getElementById("skills");

function createSkillBars() {
	skills.childNodes.forEach((skill) => {
		if (skill.nodeName == "LI") {
			let skill_container = document.createElement("div");
			skill.appendChild(skill_container);

			let skill_bar = document.createElement("div");
			skill_bar.style.width = skill.dataset.skill + "%";
			skill_container.appendChild(skill_bar);
		}
	});
}

// Create nav
function createNav() {
	const list = document.createElement("ul");
	nav.appendChild(list);

	let nav_icons = [];

	// For each nav item
	nav_items.forEach((item) => {
		// Create nav list item
		let list_item = document.createElement("li");
		list.appendChild(list_item);

		let link = document.createElement("a");
		if (document.querySelector("body#landing-page") != null) {
			link.href = "#" + item[0];
		} else {
			link.href = "/";
		}
		link.innerText = item[1];
		list_item.appendChild(link);

		let icon = document.createElement("iconify-icon");
		icon.icon = item[2][0];
		link.appendChild(icon);

		nav_icons.push([icon, item[2][0]]);

		// Nav list item on click
		link.onclick = () => {
			switchSection(item);
		};
	});
}

// Switch section
function switchSection(selected_section) {
	// If section is not hero section
	if (current_section[0] != "") {
		// Hide previous current section
		document.getElementById(current_section[0]).style.display = "none";
	}

	// Deselect previous selected nav item
	document.querySelector(`#nav-bar a[href='#${current_section[0]}']>iconify-icon`).icon = current_section[2][0];

	// Update current section
	current_section = selected_section;

	// Select current selected nav item
	document.querySelector(`#nav-bar a[href='#${selected_section[0]}']>iconify-icon`).icon = selected_section[2][1];

	// Reveal selected section
	if (selected_section[0] != "") {
		let section = document.getElementById(selected_section[0]);
		section.style.display = "";
		revealElement(section);
	}
}

// Check if the window width is 1024px or larger, returns bool
function isWidth1024() {
	if (window.innerWidth >= 1024) {
		return true;
	} else return false;
}

// Expand image
function expandImage(img_src) {
	if (isWidth1024()) {
		// Creates image preview
		let img_preview = document.createElement("div");
		img_preview.classList.add("img-preview");

		let img = document.createElement("img");
		img.src = img_src;
		img_preview.appendChild(img);

		document.body.appendChild(img_preview);

		// Removes image preview on click
		img_preview.addEventListener("click", function () {
			img_preview.remove();
		});
	}
}

// Expand image and rotate through list
function expandImageList(img_list_element) {
	// Keeps track of the current image that is being displayed
	let current_img = 0;

	let img_list = [...img_list_element.children];

	// For each child element in image list
	for (let i = 0; i < img_list.length; i++) {
		// Check if element is an image or not, continue if element is a div
		if (img_list[i].nodeName != "IMG") {
			// For each child element in the div
			for (let j = 0; j < img_list_element.children[i].children.length; j++) {
				// Push div child elements to the image list
				img_list.push(img_list_element.children[i].children[j]);
			}
		}
	}

	// Filter out anything that is not an image
	img_list = img_list.filter((element) => element.nodeName == "IMG");
	console.log("final", img_list);

	// For each image in the image list
	for (let i = 0; i < img_list.length; i++) {
		// On click
		img_list[i].onclick = () => {
			if (isWidth1024()) {
				// Sets current image being displayed
				current_img = i;

				// Creates image preview
				let img_preview = document.createElement("div");
				img_preview.classList.add("img-preview");

				let img = document.createElement("img");
				img.src = img_list[i].src;
				img_preview.appendChild(img);

				document.body.appendChild(img_preview);

				// Removes or rotates image preview on click
				img_preview.addEventListener("click", function (e) {
					if (e.target != img) {
						// Remove image preview if clicked outside image
						img_preview.remove();
					} else if (img_list[current_img + 1] == null) {
						// Remove image preview if no more images in list
						img_preview.remove();
					} else {
						// Else, rotate image preview to next image
						current_img += 1;
						img.src = img_list[current_img].src;
					}
				});
			}
		};
	}
}

/* if (document.querySelector("body#landing-page") != null) {
	if (window.scrollY == 0) {
	}
} */

// Create components
createNav();
initialiseHomePage();

if (skills) createSkillBars();

let image_grids = document.querySelectorAll(".img-grid");
image_grids.forEach((grid) => {
	expandImageList(grid);
});
