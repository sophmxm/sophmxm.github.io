"use strict";

let contact_links = [
	{ type: "email", text: "sophmxm@gmail.com", link: "mailto:sophmxm@gmail.com", icon: "ic:round-email" },
	{ type: "phone", text: "+61 479 073 711", link: "#", icon: "f7:phone-fill" },
	{ type: "linkedin", text: "linkedin.com/sophmxm", link: "https://www.linkedin.com/in/sophmxm/", icon: "mdi:linkedin" },
];

imageIconAnimation();

function imageIconAnimation() {
	let interval;
	let interval_time = 5000;
	let interval_paused = false;
	let image_count = 7;
	let image_counter = 0;
	let element = document.getElementById("img-icon");
	let element_children = Object.values(element.children).filter((child) => child.tagName == "IMG");
	let icon = element.getElementsByTagName("iconify-icon")[0];

	let intervalFunction = () => {
		createImageIcon(image_count, image_counter, element_children, interval_time);
		image_counter = (image_counter + 1) % image_count;
	};

	interval = setInterval(intervalFunction, interval_time);

	element.addEventListener("click", () => {
		if (interval_paused === false) {
			clearInterval(interval);
			icon.icon = "material-symbols:play-arrow-rounded";
			icon.style.opacity = "1";
			interval_paused = true;
		} else {
			interval = setInterval(intervalFunction, interval_time);
			icon.icon = "material-symbols-light:pause-rounded";
			icon.style.opacity = "";
			interval_paused = false;
		}
	});
}

function createImageIcon(image_count, image_counter, element_children, interval_time) {
	element_children[1].style.opacity = "0";
	element_children[0].src = `resources/assets/images/icon_${image_counter + 1}.jpg`;

	setTimeout(() => {
		element_children[1].src = `resources/assets/images/icon_${((image_counter + 1) % image_count) + 1}.jpg`;
		element_children[1].style.opacity = "1";
	}, 350);
}
