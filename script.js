"use strict";

const main = document.getElementsByTagName("main")[0];
const header = document.getElementsByTagName("header")[0];
const footer = document.getElementsByTagName("footer")[0];
let projects_preview = document.getElementById("projects-previews");

const social_links = [
	{ type: "email", text: "sophmxm@gmail.com", link: "mailto:sophmxm@gmail.com", icon: "ic:round-email" },
	{ type: "linkedin", text: "linkedin.com/sophmxm", link: "https://www.linkedin.com/in/sophmxm/", icon: "mdi:linkedin" },
];

createHeader();
createFooter();
createSocialIconsList();

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

function createSocialIconsList() {
	let social_icons_list_elements = document.querySelectorAll(".social-icons-list");

	social_icons_list_elements.forEach((list) => {
		social_links.forEach((item) => {
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

function calcMainMinHeight() {
	let win_height = window.innerHeight;
	let main_padding_y = [window.getComputedStyle(main).getPropertyValue("padding-top").slice(0, -2), window.getComputedStyle(main).getPropertyValue("padding-bottom").slice(0, -2)];
	let footer_height = footer.offsetHeight;

	let min_main_height = win_height - main_padding_y[0] - main_padding_y[1] - footer_height;

	main.style.minHeight = `${min_main_height}px`;

	console.log(win_height, footer_height, min_main_height);
}

calcMainMinHeight();
window.onresize = calcMainMinHeight;

function scrollProjectsPreviewHorizontal() {
	let container = projects_preview.children[0];
	let container_width = container.clientWidth;

	let current_scroll_x = (container_width / 3) * -1;
	let offset_scroll_x = 0;

	container.style.transform = `translateX(${current_scroll_x}px)`;

	let time_length = 0.02;
	let keyframes_speed = 5;
	let movemove_length = 10;
	let current_speed = time_length;

	window.addEventListener("wheel", function (e) {
		if (e.deltaY > 0) offset_scroll_x += 1;
		else offset_scroll_x -= 1;

		if (offset_scroll_x > 1) {
			offset_scroll_x = 2;
		} else if (offset_scroll_x < -1) {
			offset_scroll_x = -2;
		}
	});

	setInterval(() => {
		if (offset_scroll_x != 0) {
			if (offset_scroll_x > 0.5 || offset_scroll_x < -0.5) {
				current_speed = Math.min(time_length * 5, 1);
			} else {
				current_speed = time_length;
			}

			current_scroll_x = current_scroll_x + offset_scroll_x * movemove_length;
			offset_scroll_x = Math.round((offset_scroll_x - Math.sign(offset_scroll_x) * current_speed) * 100) / 100;

			container.style.transform = `translateX(${current_scroll_x}px)`;
		}
	}, keyframes_speed);
}

function loopProjectsPreviewScroll() {
	/* window.addEventListener("wheel", function (e) {
		setTimeout(() => {
			console.log(projects_preview.scrollLeft, projects_preview.children[0].children[1].getBoundingClientRect());
		}, 500);
	}); */
}

if (projects_preview != null && projects_preview != undefined) {
	setTimeout(() => {
		scrollProjectsPreviewHorizontal();
		loopProjectsPreviewScroll();
	}, 450);
}
