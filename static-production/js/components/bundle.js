"use strict";
import Swup from "swup";
import SwupPreloadPlugin from "@swup/preload-plugin";
import SwupProgressPlugin from "@swup/progress-plugin";
import { doc } from "firebase/firestore";

const swup = new Swup({
    plugins: [new SwupPreloadPlugin(), new SwupProgressPlugin()],
});

init();

swup.on("contentReplaced", init);

function init() {
    if (document.querySelector(".name")) {
        new indexJS();
    }

    if (document.querySelector(".about")) {
        new aboutJS();
    }

    if (document.querySelector(".skillsPage")) {
        new skillsJS();
    }

    if (document.querySelector(".contactPage")) {
        new contactJS();
    }

    if (document.querySelector(".blogPage")) {
        new blogJS();
    }

    if (document.querySelector(".post")) {
        new detailedPostJS();
    }
}

///// indexJS

function indexJS() {
    document
        .querySelector(".content")
        .setAttribute("style", "filter: blur(0px)");

    const name = document.querySelector(".name");
    const sussyboi = document.querySelector(".sus1");
    name.addEventListener("click", function () {
        sussyboi.style.transition =
            "margin-left 15s ease-in, margin-bottom 15s ease-in, transform 15s ease-in";
        sussyboi.classList.add("susfly");

        setTimeout(function () {
            sussyboi.style.transition = "unset";
            sussyboi.classList.remove("susfly");
        }, 30000);
    });

    const activeNav = document.querySelectorAll(".navbar-container__a");
    activeNav.forEach(function (el) {
        el.classList.remove("activeNav");
    });
}

///// about.js

function aboutJS() {
    document
        .querySelector(".content")
        .setAttribute("style", "filter: blur(0px)");

    const activeNav = document.querySelectorAll(".navbar-container__a");
    activeNav.forEach(function (el) {
        el.classList.remove("activeNav");
    });
    activeNav[0].classList.add("activeNav");
}

//// skills.js

function skillsJS() {
    "use strict";
    const activeNav = document.querySelectorAll(".navbar-container__a");
    activeNav.forEach(function (el) {
        el.classList.remove("activeNav");
    });
    activeNav[1].classList.add("activeNav");
}

///// contact page

function contactJS() {
    "use strict";

    document
        .querySelector(".content")
        .setAttribute("style", "filter: blur(0px)");

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

    const activeNav = document.querySelectorAll(".navbar-container__a");
    activeNav.forEach(function (el) {
        el.classList.remove("activeNav");
    });
    activeNav[2].classList.add("activeNav");
}

////// Blog page

function blogJS() {
    "use strict";

    document
        .querySelector(".content")
        .setAttribute("style", "filter: blur(0px)");

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

    function openLink() {
        const links = document.querySelectorAll(".blog_link");
        links.forEach(function (el) {
            el.addEventListener("click", function (event) {
                window.open(el.getAttribute("data-href"), "_blank");
            });
            el.addEventListener("touch", function (event) {
                window.open(el.getAttribute("data-href"), "_blank");
            });
        });
    }

    function updateBlogs(data) {
        const blogs = document.querySelector(".blogs");
        blogs.innerHTML = data;
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

        openLink();
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
        openLink();
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

            openLink();
        }
    }

    filterUnhideBtn.addEventListener("click", function () {
        document.getElementById("filter").classList.toggle("hide_filter");
    });

    fetchBtn.addEventListener("click", getPost);

    clearFilter.addEventListener("click", clearFilters);

    const blogScroll = document.querySelector(".blogs");

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

    openLink();

    const activeNav = document.querySelectorAll(".navbar-container__a");
    activeNav.forEach(function (el) {
        el.classList.remove("activeNav");
    });
    activeNav[3].classList.add("activeNav");
}

///// Detailed post page

function detailedPostJS() {
    "use strict";

    document
        .querySelector(".content")
        .setAttribute("style", "filter: blur(3px)");

    const gitHub = document.querySelector(".popup_github");

    gitHub.addEventListener("click", function (event) {
        window.open(gitHub.getAttribute("data-href"), "_blank");
    });
    gitHub.addEventListener("touch", function (event) {
        window.open(gitHub.getAttribute("data-href"), "_blank");
    });
}
