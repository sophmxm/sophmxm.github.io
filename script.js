"use strict";

// Existing elements
const main = document.getElementsByTagName("main")[0];
const header = document.getElementsByTagName("header")[0];
const footer = document.getElementsByTagName("footer")[0];
let projects_preview = document.getElementById("projects-preview");

// Global variables
let over_1024;

// Arrays and objects
const social_links = [
	{ type: "email", text: "sophmxm@gmail.com", link: "mailto:sophmxm@gmail.com", icon: "ic:round-email" },
	{ type: "linkedin", text: "linkedin.com/sophmxm", link: "https://www.linkedin.com/in/sophmxm/", icon: "mdi:linkedin" },
];

const projects_preview_list = {
	template: {
		img: { src: "", alt: "" },
		title: "",
		subtitle: "",
		tags: [],
		description: "",
		link: "",
	},
	meowtropolis: {
		img: { src: "resources/previews/kkb385.png", alt: "" },
		title: "Meowtropolis",
		subtitle: "Capstone project",
		tags: ["HTML and CSS", "JavaScript", "Team project"],
		description: "An interactive, graphics-focused website that features characters based on real-life adoptable cats from AWLQ.",
	},
	catchnbake: {
		img: { src: "resources/previews/dxb211-a2-2.png", alt: "" },
		title: "CATch 'n Bake",
		subtitle: "Creative coding",
		tags: ["p5.js", "Illustration"],
		description: "A minigame that was produced for an exhibition in Fortitude Valley with the goal of interesting and engaging visitors to the lane. ",
	},
	petsnearme: {
		img: { src: "resources/previews/dxb111-a2-1.png", alt: "" },
		title: "Pets Near Me",
		subtitle: "Web design",
		tags: ["HTML and CSS", "Web design", "WCAG"],
		description: "An accessible, screen reader-friendly web-based prototype made for local children who have an interest in animals and/or own a pet.",
	},
	reactapp: {
		img: { src: "resources/previews/cab230-a2-2.png", alt: "" },
		title: "React App",
		subtitle: "React + REST API",
		tags: ["React", "REST API"],
		description: "A React-based web app that allows users to view and analyse data about volcanoes via a REST API.",
	},
	saladprototype: {
		img: { src: "resources/previews/dxb110-a2_preview.png", alt: "" },
		title: "Who says?",
		subtitle: "UI / UX",
		tags: ["UX / UI", "Figma", "Prototyping", "User-centered design"],
		description: "An interactive prototype made for an order-online, healthy-fast-food business mock design brief.",
	},
};

// Remove template from object
delete projects_preview_list.template;

// Initiate page
createHeader();
createFooter();
createSocialIconsList();

// Check window width
if (isWidth1024()) over_1024 = true;
else over_1024 = false;

// Check if the window width is 1024px or larger, returns bool
function isWidth1024() {
	if (window.innerWidth > 1024) {
		return true;
	} else return false;
}

// Create header element
function createHeader() {
	const nav_links = [
		{ text: "Sophie Martin", link: "/" },
		{ text: "My stuff", link: "#" },
		{ text: "About me", link: "about-me.html" },
		{ text: "Say hi", link: "#" },
	];

	let nav = document.createElement("nav");
	header.appendChild(nav);

	let list = document.createElement("ul");
	nav.appendChild(list);

	nav_links.forEach((item) => {
		let list_item = document.createElement("li");
		list.appendChild(list_item);

		let link = document.createElement("a");
		link.innerText = item.text;
		link.href = item.link;
		list_item.appendChild(link);
	});
}

// Create footer element
function createFooter() {
	let footer_container = document.createElement("div");
	footer.appendChild(footer_container);

	let p = document.createElement("p");
	footer_container.appendChild(p);

	let link_contact = document.createElement("a");
	link_contact.innerText = "Contact me";
	link_contact.href = "#";

	let link_resume = document.createElement("a");
	link_resume.innerText = "download my resume";
	link_resume.href = "#";

	p.innerText = "Come say hi! ";
	p.appendChild(link_contact);
	p.append(" or ");
	p.appendChild(link_resume);

	let social_icons_list = document.createElement("ul");
	social_icons_list.classList.add("social-icons-list");
	footer_container.appendChild(social_icons_list);
}

// Create social icons list for each element with class
function createSocialIconsList() {
	// Select all classes
	let social_icons_list_elements = document.querySelectorAll(".social-icons-list");

	// For each class
	social_icons_list_elements.forEach((list) => {
		// For each item in social links array
		social_links.forEach((item) => {
			// Create elements
			let list_item = document.createElement("li");
			list.appendChild(list_item);

			let link = document.createElement("a");
			link.href = item.link;
			list_item.appendChild(link);

			let icon = document.createElement("iconify-icon");
			icon.icon = item.icon;
			link.appendChild(icon);
		});
	});
}

function createProjectsPreview() {
	let container = projects_preview.children[0];

	Object.values(projects_preview_list).forEach((item, i) => {
		let link = document.createElement("a");
		link.href = `/projects/${Object.keys(projects_preview_list)[i]}.html`;
		container.appendChild(link);

		let image = document.createElement("img");
		image.src = item.img.src;
		image.alt = item.img.alt;
		link.appendChild(image);

		if (item.title != null && item.tags != null && item.description != null) {
			let overlay = document.createElement("div");
			link.appendChild(overlay);

			let heading = document.createElement("div");
			overlay.appendChild(heading);

			let title = document.createElement("h3");
			title.innerText = item.title;
			heading.appendChild(title);

			if (item.subtitle != null && item.subtitle != "") {
				let subtitle = document.createElement("span");
				subtitle.innerText = item.subtitle;
				heading.appendChild(subtitle);
			}

			let list = document.createElement("ul");
			list.classList.add("tags");
			overlay.appendChild(list);

			if (item.tags != null) {
				item.tags.forEach((tag) => {
					let list_item = document.createElement("li");
					list_item.innerText = tag;
					list.appendChild(list_item);
				});
			}

			let description = document.createElement("p");
			description.innerText = item.description;
			overlay.appendChild(description);
		}
	});
}

function scrollProjectsPreviewHorizontal() {
	// Container variables
	let container = projects_preview.children[0];
	let container_width = container.clientWidth;
	let single_container_width = container_width / 3;

	// Scroll variables
	let current_scroll_x = single_container_width * -1;
	let offset_scroll_x = 0;

	// Set container to middle
	container.style.transform = `translateX(${current_scroll_x}px)`;

	// Detect wheel event
	window.addEventListener("wheel", function (e) {
		// Offset scroll
		if (e.deltaY > 0) offset_scroll_x += 1;
		else offset_scroll_x -= 1;

		// Limit offset scroll amount
		if (offset_scroll_x > 1) {
			offset_scroll_x = 2;
		} else if (offset_scroll_x < -1) {
			offset_scroll_x = -2;
		}
	});

	// Animate settings
	let time_length = 0.02;
	let keyframes_speed = 5;
	let movemove_length = 10;
	let current_speed = time_length;

	// Animate scroll
	setInterval(() => {
		// Detect if scroll is offset by mouse event
		if (offset_scroll_x != 0) {
			// Increase or decrease animation speed
			if (offset_scroll_x > 0.5 || offset_scroll_x < -0.5) {
				current_speed = Math.min(time_length * 5, 1);
			} else {
				current_speed = time_length;
			}

			// Calculate infinite scroll
			if (current_scroll_x > (single_container_width / 2) * -1) {
				// If scroll left
				current_scroll_x = (single_container_width / 2 + single_container_width) * -1;
				container.style.transform = `translateX(${current_scroll_x}px)`;
			} else if (current_scroll_x < (single_container_width + single_container_width / 2) * -1) {
				// If scroll right
				current_scroll_x = (single_container_width - single_container_width / 2) * -1;
				container.style.transform = `translateX(${current_scroll_x}px)`;
			}

			// Animate
			current_scroll_x = current_scroll_x + offset_scroll_x * movemove_length;
			offset_scroll_x = Math.round((offset_scroll_x - Math.sign(offset_scroll_x) * current_speed) * 100) / 100;

			container.style.transform = `translateX(${current_scroll_x}px)`;
		}
	}, keyframes_speed);
}

// If projects preview exists on page, run functions after delay/page loads
if (projects_preview != null && projects_preview != undefined) {
	createProjectsPreview();

	// Check window width
	if (window.innerWidth > 1024) {
		// Create two more copies for infinite scroll
		for (let i = 0; i < 2; i++) {
			createProjectsPreview();
		}

		setTimeout(() => {
			scrollProjectsPreviewHorizontal();
		}, 450);
	}
}

// Detect window width and reload if window goes over or under 1024px
function detectWindowWidthOver1024() {
	if (isWidth1024() && over_1024 == false) {
		over_1024 = true;
		location.reload();
	} else if (!isWidth1024() && over_1024 == true) {
		over_1024 = false;
		location.reload();
	}
}

// If projects preview exists on page, detect on window resize and reload
window.onresize = detectWindowWidthOver1024;

// If page is project, then fill
function checkIfProjectsPage() {
	// Get page href url
	let href = window.location.href;
	let is_project_page = href.includes("/projects/");

	// Check if page is projects page
	if (is_project_page) {
		// Change body id to project for styling
		document.body.id = "project";

		// Get project id from href url
		let project_id = href.match(/(?<=projects\/)(\w*)/gm);
		fillProjectsPage(project_id);
	}
}

// Fill projects page with project data
function fillProjectsPage(project) {
	// Get data
	let data = projects_preview_list[project];

	// Fill title
	document.getElementById("project-name").innerText = data.title;

	// Fill tags
	data.tags.forEach((tag) => {
		let li = document.createElement("li");
		li.innerText = tag;
		document.getElementById("project-tags").appendChild(li);
	});
}

// Check if page is project, then fill
checkIfProjectsPage()

// Expand image and rotate through list
function expandImageList(img_list_element) {
	// Keeps track of the current image that is being displayed
	let current_img = 0;

	let img_list = [...img_list_element.children];

	// Filter out anything that is not image or div element (eg. figcaption)
	img_list = img_list.filter((img) => {
		return img.nodeName == "IMG" || img.nodeName == "DIV";
	});

	// For each child element in image list
	for (let i = 0; i < img_list.length; i++) {
		// Check if element is an image or not, continue if element is a div
		if (img_list[i].nodeName != "IMG" && img_list[i].nodeName == "DIV") {
			// For each child element in the div
			for (let j = 0; j < img_list_element.children[i].children.length; j++) {
				// Push div child elements to the image list
				img_list.push(img_list_element.children[i].children[j]);
			}
			// Remove the div from the image list
			img_list.splice(i, 1);
		}
	}

	// For each image in the image list
	for (let i = 0; i < img_list.length; i++) {
		// On click
		img_list[i].onclick = () => {
			// Sets current image being displayed
			current_img = i;

			// Creates image preview
			let img_preview = document.createElement("div");
			img_preview.classList.add("img-preview");

			let img = document.createElement("img");
			img.src = img_list[i].src;
			img_preview.appendChild(img);

			document.body.appendChild(img_preview);

			// Removes or roates image preview on click
			img_preview.addEventListener("click", function (e) {
				if (e.target != img) {
					// Remove image preview if clicked outside image
					img_preview.remove();
				} else if (img_list[current_img + 1] == null && !img_list_element.classList.contains("looping")) {
					// Remove image preview if no more images in list and not looping
					img_preview.remove();
				} else if (img_list[current_img + 1] == null && img_list_element.classList.contains("looping")) {
					// Loop to first image if no more images in list and looping
					current_img = 0;
					img.src = img_list[current_img].src;
				} else {
					// Else, rotate image preview to next image
					current_img += 1;
					img.src = img_list[current_img].src;
				}
			});
		};
	}
}

if (isWidth1024()) {
	let img_lists = document.querySelectorAll(".img-grid.previewable, .img-flex.previewable");
	// For each image list, run function
	img_lists.forEach((img_list_element) => {
		expandImageList(img_list_element);
	});
}
