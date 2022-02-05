"use strict";

const cards = document.querySelectorAll(".card");

let y1 = -0.5;
let y2 = 0.5;
let oe = cards.length / 2 - 1;

cards[cards.length - 1].classList.add("active");

cards.forEach(function (el) {
    if (oe != 0) {
        el.style.transform = `translateY(${y1}rem)`;
        y1--;
        oe--;
    } else {
        el.style.transform = `translateY(${y1}rem)`;
        y1++;
    }
});

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
