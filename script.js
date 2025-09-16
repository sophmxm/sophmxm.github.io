"use strict";

let cycle_time = { typing: 1250, deleting: 1250, pause: 2500, delay: 500 };
let interval_time = Object.values(cycle_time).reduce((a, b) => {
	return a + b;
});

function subHeaderCycleText() {
	let span = document.getElementById("text-cycle-anim");
	let text_array = ["an emerging designer", "designing interactions", "developing websites", "learning coding languages", "designing fun", "looking to learn more", "a cat lover", "making for people"];
	let cursor = document.querySelector("#text-cycle-anim+div.cursor");

	cycleText(span, text_array, cursor);
}

subHeaderCycleText();

function cycleText(element, text_array, cursor) {
	// Initial cycle of text array
	cycleTextAnimation(element, text_array, cursor);

	// Set interval for each cycle of text array
	setInterval(() => {
		element.innerText = "";
		cycleTextAnimation(element, text_array, cursor);
	}, interval_time * text_array.length);
}

function cycleTextAnimation(element, text_array, cursor) {
	for (let i = 0; i < text_array.length; i++) {
		setTimeout(() => {
			typeWriter(element, text_array[i], cursor);
		}, interval_time * i);
	}
}

function typeWriter(element, text, cursor) {
	if (cursor) cursor.style.animation = "none";

	// Calculate typing interval time
	let typing_interval_time = cycle_time.typing / (text.length + 1);

	for (let i = 0; i < text.length; i++) {
		setTimeout(() => {
			element.textContent += text.charAt(i);

			if (i == text.length - 1) {
				if (cursor) {
					cursor.style.right = "-16px";
					cursor.style.animation = "";
				}

				setTimeout(() => {
					typeWriterBackspace(element, cursor);
				}, cycle_time.pause);
			}
		}, typing_interval_time * i);
	}
}

function typeWriterBackspace(element, cursor) {
	if (cursor) cursor.style.animation = "none";

	// Calculate typing interval time
	let typing_interval_time = cycle_time.typing / (element.textContent.length + 1);

	for (let i = 0; i < element.textContent.length; i++) {
		setTimeout(() => {
			element.textContent = element.textContent.slice(0, -1);

			if (cursor && i == element.textContent.length - 1) {
				cursor.style.animation = "";
				cursor.style.right = "-24px";
			}
		}, typing_interval_time * i);
	}
}
