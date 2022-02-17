"use strict";

const popBlog = document.getElementById("pop_blog");
const closeBnt = document.getElementById("close_btn");
const overlay = document.querySelector(".overlay");
const fetchBtn = document.querySelector(".fetch-btn");

function createElementWithClassInnerHTML(type, className, content) {
    const element = document.createElement(type);
    element.className = className;
    element.innerHTML = content;
    return element;
}

function updateBlogs(data) {
    const blogs = document.querySelector(".blogs");
    blogs.innerHTML = data;
    addPopup();
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}

function unhide() {
    popBlog.classList.remove("pop_blog_hidden");

    let image = document.createElement("img");
    image.classList.add("popup_img");
    image.src = this.children[0].src;

    let title = createElementWithClassInnerHTML(
        "h1",
        "popup_title",
        this.children[1].innerHTML
    );
    let tags = createElementWithClassInnerHTML(
        "ul",
        "popup_tags",
        this.children[2].innerHTML
    );
    let content = createElementWithClassInnerHTML(
        "div",
        "popup_content",
        this.children[3].innerHTML
    );
    let publishDate = createElementWithClassInnerHTML(
        "div",
        "popup_date",
        this.children[4].innerHTML
    );

    let href = document.createElement("a");
    href.classList.add("popup_page_link");
    href.innerHTML = "Page";
    href.target = "_blank";
    href.href = this.children[5].href;

    console.log(image, title, tags, content, publishDate, href.href);

    popBlog.appendChild(title);
    popBlog.appendChild(image);
    popBlog.appendChild(tags);
    popBlog.appendChild(content);
    popBlog.appendChild(publishDate);
    popBlog.appendChild(href);
    overlay.classList.add("overlay_on");
}

function hide() {
    popBlog.classList.add("pop_blog_hidden");
    popBlog.innerHTML = '<div id="close_btn" >&#10005;</div>';
    document.getElementById("close_btn").onclick = hide;
    overlay.classList.remove("overlay_on");
}

function addPopup() {
    const blogs = document.querySelectorAll(".blog");
    blogs.forEach(function (blog) {
        blog.addEventListener("click", unhide);
    });
}

function getPost() {
    let tags = Array.from(
        document.getElementById("id_Tags").selectedOptions
    ).map(({ value }) => value);
    let orderBy = document.getElementById("id_order_by").value;
    let params = { tags: tags, orderby: orderBy };

    fetch(window.location + "?" + new URLSearchParams(params).toString())
        .then((response) => response.text())
        .then((data) => updateBlogs(data))
        .catch((error) => {
            console.error("Error:", error);
        });
}

closeBnt.onclick = hide;

overlay.onclick = hide;

addPopup();

fetchBtn.addEventListener("click", getPost);
