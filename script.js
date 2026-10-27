// Put the "nav-links a" in a variable
const navLinks = document.querySelectorAll(".nav-links a");
// Put the "nav-links" in a variable
const navList = document.querySelector(".nav-links");
// Put every section in a variable
const sections = document.querySelectorAll("section");

const pill = document.createElement("span");
pill.classList.add("pill");

navList.prepend(pill);

// NOVO: bandeira que indica se o scroll foi provocado por um clique
let isClickScrolling = false;
// NOVO: guarda o timer, para o poder cancelar se clicares outra vez
let scrollTimer;

// Function to setActive the link on the NavBar
function setActive(link) {
    // Item = Link from the navbar
    navLinks.forEach(item => {
        item.classList.remove("active");
    });
    link.classList.add("active");
    pill.style.left = link.offsetLeft + "px";
    pill.style.width = link.offsetWidth + "px";
}

navLinks.forEach(item => {
    item.addEventListener("click", () => {
        setActive(item);
        isClickScrolling = true;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            isClickScrolling = false;
        }, 1000);
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isClickScrolling) {
            const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            setActive(link);
        }
    });
}, { threshold: 0.6 }); // 60% of the sections needs to be visible

// The observer is watching each section of the page
sections.forEach(section => {
    observer.observe(section);
});

setActive(document.querySelector(".nav-links a.active"));