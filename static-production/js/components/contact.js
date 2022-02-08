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
        this.style.backgroundColor = "#072227";
        this.style.outlineColor = "#08fdd8";
    } else if (this.value.length == 0) {
        this.style.backgroundColor = "transparent";
        this.style.outlineColor = "#aefeff";
    }
}

textinputs.forEach(function (el) {
    el.addEventListener("input", onchange);
});

textarea.addEventListener("input", onchange);

textinputs[0].addEventListener("input", function () {
    if (validateMail(this.value.toLowerCase()) && this.value.length > 0) {
        this.style.outlineColor = "#08fdd8";
        this.style.backgroundColor = "#072227";
    } else if (this.value.length == 0) {
        this.style.outlineColor = "#aefeff";
        this.style.backgroundColor = "transparent";
    } else {
        this.style.outlineColor = "red";
        this.style.backgroundColor = "#072227";
    }
});
