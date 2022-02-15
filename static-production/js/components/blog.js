"use strict";

const blogs = document.querySelectorAll(".blog");
const popBlog = document.getElementById("pop_blog");
const closeBnt = document.getElementById("close_btn");
const overlay = document.querySelector(".overlay");

function createElementWithClassInnerHTML(type, className, content) {
    const element = document.createElement(type);
    element.className = className;
    element.innerHTML = content;
    return element;
}

function unhide() {
    popBlog.classList.remove("pop_blog_hidden");

    const image = document.createElement("img");
    image.classList.add("popup_img");
    image.src = this.children[0].src;
    const title = createElementWithClassInnerHTML(
        "h1",
        "popup_title",
        this.children[1].innerHTML
    );
    const tags = createElementWithClassInnerHTML(
        "ul",
        "popup_tags",
        this.children[2].innerHTML
    );
    const content = createElementWithClassInnerHTML(
        "div",
        "popup_content",
        this.children[3].innerHTML
    );
    const publishDate = createElementWithClassInnerHTML(
        "div",
        "popup_date",
        this.children[4].innerHTML
    );
    console.log(image, title, tags, content, publishDate);

    popBlog.appendChild(title);
    popBlog.appendChild(image);
    popBlog.appendChild(tags);
    popBlog.appendChild(content);
    popBlog.appendChild(publishDate);
    overlay.classList.add("overlay_on");
}

function hide() {
    popBlog.classList.add("pop_blog_hidden");
    popBlog.innerHTML = '<div id="close_btn" >&#10005;</div>';
    document.getElementById("close_btn").onclick = hide;
    overlay.classList.remove("overlay_on");
}

blogs.forEach(function (blog) {
    blog.addEventListener("click", unhide);
});

closeBnt.onclick = hide;

overlay.onclick = hide;
