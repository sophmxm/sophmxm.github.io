"use strict";

createHeader();
createFooter();

function createHeader() {
	const header = document.getElementsByTagName("header")[0];

	const header_items = [
		["Sophie Martin", "/"],
		["My stuff", "#"],
		["About me", "#"],
		["Say hi", "#"],
	];

	let nav = document.createElement("nav");
	header.appendChild(nav);

	let list = document.createElement("ul");
	nav.appendChild(list);

	header_items.forEach((item) => {
		let list_item = document.createElement("li");
		list.appendChild(list_item);

		let link = document.createElement("a");
		link.innerText = item[0];
		link.href = item[1];
		list_item.appendChild(link);
	});
}

function createFooter() {
	const footer = document.getElementsByTagName("footer")[0];

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
}
