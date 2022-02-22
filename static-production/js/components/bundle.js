"use strict";
import Swup from "swup";

const linkInclude = [
    `a[href^="${window.location.origin}"]`,
    `a[href^="/"]`,
    `a[href^="#"]`,
];

const linkExclude = ['[target="_blank"]'];

const exclude = linkExclude.map((selector) => `:not(${selector})`).join("");
const linkSelector = linkInclude
    .map((include) => `${include}${exclude}`)
    .join(",");

const swup = new Swup({ linkSelector });

init();

swup.on("contentReplaced", init);

function init() {
    if (document.querySelector(".skillsPage")) {
        new skillsJS();
    }

    if (document.querySelector(".contactPage")) {
        new contactJS();
    }

    if (document.querySelector(".blogPage")) {
        new blogJS();
    }
}

//// skills.js

function skillsJS() {
    "use strict";

    const swup = new Swup();

    const cards = document.querySelectorAll(".card");

    let y1 = -0.5;
    let y2 = 0.5;
    let oe = Math.trunc(cards.length / 2 - 1);

    cards.forEach(function (el) {
        const width = parseInt(window.innerWidth);

        if (parseInt(window.innerWidth) > 1100) {
            if (oe != 0) {
                el.style.transform = `translateY(${y1}rem)`;
                y1--;
                oe--;
            } else {
                el.style.transform = `translateY(${y1}rem)`;
                y1++;
            }
        } else {
            el.style.transform = `translateX(${y1}rem)`;
            y1++;
        }
    });

    cards[cards.length - 1].classList.add("active");

    cards.forEach((element) => {
        element.addEventListener("mouseover", function () {
            if (this != cards[cards.length - 1]) {
                this.classList.toggle("active");
                cards[cards.length - 1].classList.toggle("active");
            }
        });
        element.addEventListener("mouseout", function () {
            if (this !== cards[cards.length - 1]) {
                this.classList.toggle("active");
                cards[cards.length - 1].classList.toggle("active");
            }
        });
    });
}

///// contact page

function contactJS() {
    "use strict";

    const swup = new Swup();

    const textinputs = document.querySelectorAll(".form-control input");
    const textarea = document.querySelector(".form-control textarea");
    const submitBtn = document.querySelector(".form-control contact-btn");

    function validateMail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    textinputs.forEach(function (el) {
        if (el.value.length > 0) {
            el.style.backgroundColor = "#1f1d36";
            el.style.outlineColor = "#0edbff";
        }
    });

    if (textarea.value.length > 0) {
        textarea.style.backgroundColor = "#1f1d36";
        textarea.style.outlineColor = "#0edbff";
    }

    function onchange() {
        if (this.value.length > 0) {
            this.style.backgroundColor = "#1f1d36";
            this.style.outlineColor = "#0edbff";
        } else if (this.value.length == 0) {
            this.style.backgroundColor = "rgba(31, 29, 54, 0.35)";
        }
    }

    textinputs.forEach(function (el) {
        el.addEventListener("input", onchange);
    });

    textarea.addEventListener("input", onchange);

    textinputs[0].addEventListener("input", function () {
        if (validateMail(this.value.toLowerCase()) && this.value.length > 0) {
            this.style.outlineColor = "#0edbff";
            this.style.backgroundColor = "#1f1d36 !important";
        } else if (this.value.length == 0) {
            this.style.backgroundColor = "rgba(31, 29, 54, 0.35)";
        } else {
            this.style.outlineColor = "red";
            this.style.backgroundColor = "#1f1d36";
        }
    });
}

////// Blog page

function blogJS() {
    "use strict";

    const popBlog = document.getElementById("pop_blog");
    const closeBnt = document.getElementById("close_btn");
    const overlay = document.querySelector(".overlay");
    const fetchBtn = document.querySelector(".fetch-btn");
    const clearFilter = document.querySelector(".filter_clear");
    const filterUnhideBtn = document.querySelector(".filter_hide");
    let blogsLeft = true;
    const loading = `<div class="loading-waves"> 
                <div class="step step1"></div>
                <div class="step step2"></div>
                <div class="step step3"></div>
                <div class="step step4"></div>
                <div class="step step5"></div>
                </div>`;

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
        fetchBtn.innerHTML = "Search";
    }

    function appendBlogs(data) {
        if (data.trim() === "") {
            blogsLeft = false;
        } else {
            if (blogsLeft) {
                const blogs = document.querySelector(".blogs");
                blogs.insertAdjacentHTML("beforeend", data);
            }
        }
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

        // console.log(image, title, tags, content, publishDate, href.href);

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

    function clearFilters() {
        blogsLeft = true;
        fetchBtn.innerHTML = loading;
        clearFilter.classList.add("hidden");
        const params = {
            all: "all",
        };

        fetch(window.location + "?" + new URLSearchParams(params).toString())
            .then((response) => response.text())
            .then((data) => updateBlogs(data))
            .catch((error) => {
                console.error("Error:", error);
            });

        document.getElementById("id_Tags").selectedIndex = -1;
        document.getElementById("id_order_by").selectedIndex = 0;
    }

    function getPost() {
        blogsLeft = true;
        fetchBtn.innerHTML = loading;
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

        clearFilter.classList.remove("hidden");
    }

    function loadPost() {
        if (blogsLeft) {
            const tags = Array.from(
                document.getElementById("id_Tags").selectedOptions
            ).map(({ value }) => value);
            const orderBy = document.getElementById("id_order_by").value;
            const datetime = document.querySelectorAll(".datetime");
            // console.log(datetime[datetime.length - 1].innerHTML);
            const params = {
                tags: tags,
                orderby: orderBy,
                datetime: datetime[datetime.length - 1].innerHTML,
            };
            // console.log(params);

            fetch(
                window.location + "?" + new URLSearchParams(params).toString()
            )
                .then((response) => response.text())
                .then((data) => appendBlogs(data))
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }

    closeBnt.onclick = hide;

    overlay.onclick = hide;

    addPopup();

    fetchBtn.addEventListener("click", getPost);

    clearFilter.addEventListener("click", clearFilters);

    filterUnhideBtn.addEventListener("click", function () {
        document.getElementById("filter").classList.toggle("hide_filter");
    });

    const blogScroll = document.querySelector(".blogs");
    // console.log(blogScroll);

    let loadingBLogs = false;

    blogScroll.addEventListener("scroll", function (el) {
        if (
            Math.ceil(this.scrollHeight - this.scrollTop) ===
                this.clientHeight &&
            !loadingBLogs
        ) {
            loadingBLogs = true;
            loadPost();
        }
        loadingBLogs = false;
    });

    blogScroll.addEventListener("touchend", function (el) {
        console.log(this.scrollHeight - this.scrollTop === this.clientHeight);
        if (
            Math.ceil(this.scrollHeight - this.scrollTop) ===
                this.clientHeight &&
            !loadingBLogs
        ) {
            loadingBLogs = true;
            loadPost();
        } else {
            // console.log("false");
        }
        loadingBLogs = false;
    });
}
