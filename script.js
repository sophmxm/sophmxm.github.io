"use strict"

createHeader();

function createHeader() {
    const header = document.getElementsByTagName("header")[0];

    const header_items = [["Sophie Martin", "/"], ["My stuff", "#"], ["About me", "#"], ["Say hi", "#"]];

    let nav = document.createElement("nav");
    header.appendChild(nav);

    let list = document.createElement("ul");
    nav.appendChild(list);

    header_items.forEach(item => {
        let list_item = document.createElement("li");
        list.appendChild(list_item);

        let link = document.createElement("a");
        link.innerText = item[0];
        link.href = item[1];
        list_item.appendChild(link);
    })
}