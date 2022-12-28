'use strict'
const body = document.querySelector('body');
const oferCards = document.querySelectorAll('.ofer_card');
const btnHeaderNav = document.querySelectorAll('.header_nav_btn');
const headerHeader = document.querySelector('.header_header');

// btn
const btnHeader = document.querySelector('.button_header');
const btnScrollTop = document.querySelector('.btn_scroll_top');

// section variables
const sectionOfers = document.querySelector('.section_ofers');
const sectionActions = document.querySelector('.section_action')
const footer = document.querySelector('.footer');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.btn_scroll_top').style.display = "block";
    } else {
        document.querySelector('.btn_scroll_top').style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    headerHeader.scrollIntoView({ behavior: 'smooth' });
}

// Event Handlers
btnScrollTop.addEventListener('click', function () {
    topFunction();
})
btnHeader.addEventListener('click', function () {
    sectionActions.scrollIntoView({ behavior: 'smooth' });
})
for (let i = 0; i < oferCards.length; i++) {
    oferCards[i].addEventListener('click', function () {
        console.log("click");
        console.log(oferCards[i].id);
    })
}
for (let i = 0; i < btnHeaderNav.length; i++) {
    btnHeaderNav[i].addEventListener('click', function () {
        console.log(btnHeaderNav[i].textContent);
        if (btnHeaderNav[i].textContent === 'Oferta') {
            console.log("asdfa");
            sectionOfers.scrollIntoView({ behavior: 'smooth' });
        }
        if (btnHeaderNav[i].textContent === 'Kontakt') {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    })
}
// Fade animation on the navigation bar
const navLinksHoverAnimation = function (e) {
    if (e.target.classList.contains('header_nav_btn')) {
        const linkOver = e.target;
        const siblingLinks = linkOver
            .closest('.header_nav')
            .querySelectorAll('.header_nav_btn');
        siblingLinks.forEach(el => {
            if (el !== linkOver) el.style.opacity = this;
        });
    }
};


headerHeader.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));

headerHeader.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// validation contact form
const form = document.querySelector('.contact_form');
const formArr = Array.from(form);
const validFormArr = [];
const btnContactForm = document.querySelector('.contact_btn');
console.log(validFormArr);
formArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
        el.setAttribute("is-valid", "0");
        validFormArr.push(el);
    }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
    if (target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    console.log(reg);
    console.log(inputValue);
    if (reg.test(inputValue)) {
        el.setAttribute("is-valid", "1");
        el.style.background = "rgb(0, 196, 0, 0.1)";
        el.style.border = "3px solid rgb(0, 196, 0)";
    } else {
        el.setAttribute("is-valid", "0");
        el.style.border = "3px solid rgb(255, 0, 0)";
        el.style.background = "rgb(255, 0, 0, 0.1)"
    }
    if (inputValue == '') {
        el.style.background = "#333333"
        el.style.border = "none";
    }
    el.style.color = "black";
}

function formCheck(e) {
    e.preventDefault();
    const allValid = [];
    validFormArr.forEach((el) => {
        allValid.push(el.getAttribute("is-valid"));
    });
    const isAllValid = allValid.reduce((acc, current) => {
        return acc && current;
    });
    if (!Boolean(Number(isAllValid))) {
        alert("Заполните поля правильно!");
        return;
    }
    formSubmit();
}

async function formSubmit() {
    const data = serializeForm(form);
    const response = await sendData(data);
    if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formReset();
    } else {
        alert("Код ошибки: " + response.status);
    }
}

function serializeForm(formNode) {
    return new FormData(form);
}

async function sendData(data) {
    return await fetch("mail.php", {
        method: "POST",
        body: data,
    });
}

function formReset() {
    form.reset();
    validFormArr.forEach((el) => {
        el.setAttribute("is-valid", 0);
        el.style.border = "none";
    });
}


// Function maps
document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([50.6767405, 17.9740576], 18);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([50.6767405, 17.9740576]).addTo(map);
    marker.bindPopup(`<b>Firma sprzątająca
      PCS</b>`).openPopup();

})