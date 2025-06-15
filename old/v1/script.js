const main = document.getElementsByTagName("main")[0];
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

// Staggered reveal sidebar effect
function revealSidebar() {
	for (let i = 0; i < sidebar.children.length; i++) {
		// Add animation delay effect to each sidebar element
		sidebar.children[i].style.animationDelay = `calc(500ms + ${i * 150}ms)`;
	}
}

// Staggered reveal title words effect
function revealTitle() {
	let titles = document.querySelectorAll(".title");

	titles.forEach((title) => {
		let words = title.textContent.split(" ");
		title.innerText = "";

		words.forEach((word) => {
			// Append each word to span
			let span = document.createElement("span");
			span.append(word + " ");
			title.appendChild(span);
		});

		for (let i = 0; i < title.children.length; i++) {
			// Add animation delay effect to each span
			title.children[i].style.animationDelay = `calc(1350ms + ${i * 150}ms)`;
		}
	});
}

// Staggered reveal content effect
function revealContent() {
	for (let i = 0; i < content.children.length; i++) {
		// Add animation delay effect to each section in content
		content.children[i].style.animationDelay = `calc(1000ms + ${i * 150}ms)`;
	}
}

// Create navigation bar
function createNav() {
	const nav = document.getElementById("nav-bar");
	const current_tab = nav.dataset.currentTab;

	let list = document.createElement("ul");
	nav.appendChild(list);

	// Nav item information
	const nav_items = [
		["/websites.html", "majesticons:browser", "Websites"],
		// ["/art.html", "ep:picture-filled", "Art"],
		["/other.html", "fluent:list-16-filled", "Other"],
		["/about-me.html", "akar-icons:info-fill", "About me"],
	];

	// Add each nav item on the nav bar
	nav_items.forEach((item) => {
		let list_item = document.createElement("li");
		list.appendChild(list_item);

		let link = document.createElement("a");
		link.href = item[0];
		link.innerText = item[2];
		list_item.appendChild(link);

		let icon = document.createElement("iconify-icon");
		icon.icon = item[1];
		link.prepend(icon);

		// Check if tab is the current tab
		if (current_tab == item[2].toLowerCase()) {
			// Add class
			list_item.classList.add("current");

			// Remove link
			link.href = "#";
		}
	});
}

// Create sidebar
function createSidebar() {
	const sidebar = document.getElementById("sidebar");

	// Create heading
	let heading = document.createElement("h1");
	let link = document.createElement("a");
	link.href = "/";
	link.innerText = "Sophie Martin";
	heading.appendChild(link);
	sidebar.appendChild(heading);

	// Create description
	let p1 = document.createElement("p");
	p1.innerText = `Hi, I’m Sophie! I’m an emerging interaction designer who specialises in UI/UX and visual design, with a big passion for web design and development.`;
	sidebar.appendChild(p1);

	let p2 = document.createElement("p");
	p2.innerText = `As both an artist and designer, I enjoy producing visually engaging digital works that focus on creating fun and interactive experiences. I love designing for people and problem-solving, always striving to create intuitive and user-centered solutions.`;
	sidebar.appendChild(p2);

	// Link item information
	let link_items = [
		["mailto:sophmxm@gmail.com", "ic:round-email", "sophmxm@gmail.com"],
		["https://www.linkedin.com/in/sophmxm/", "mdi:linkedin", "linkedin.com/sophmxm"],
		["https://github.com/sophmxm", "mingcute:github-fill", "github.com/sophmxm"],
	];

	// Add each link item to the sidebar
	let list = document.createElement("ul");
	list.classList.add("links");
	sidebar.appendChild(list);
	link_items.forEach((item) => {
		list_item = document.createElement("li");
		list.appendChild(list_item);

		let link = document.createElement("a");
		link.href = item[0];
		link.classList.add("underlined");
		link.innerText = " " + item[2];
		link.target = "_blank";
		list_item.appendChild(link);

		let icon = document.createElement("iconify-icon");
		icon.icon = item[1];
		icon.classList.add("txt-size");
		link.prepend(icon);
	});

	let p3 = document.createElement("p");
	p3.innerText = `Website portfolio made by me from scratch with HTML, CSS, and JavaScript.`;
	sidebar.appendChild(p3);
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

				// Removes or roates image preview on click
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

// Run main fuctions
createNav();
createSidebar();
revealSidebar();

// Run other misc functions
revealTitle();

let img_lists = document.querySelectorAll(".img-list");
// For each image list, run function
img_lists.forEach((img_list_element) => {
	expandImageList(img_list_element);
});
