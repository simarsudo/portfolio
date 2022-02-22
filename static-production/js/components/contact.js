"use strict";

const textinputs = document.querySelectorAll(".form-control input");
const textarea = document.querySelector(".form-control textarea");
const submitBtn = document.querySelector(".form-control contact-btn");

function validateMail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
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
    }
});
