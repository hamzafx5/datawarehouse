class El {
	constructor(selector) {
		this.elements = typeof selector === "string" ? [...document.querySelectorAll(selector)] : [selector];
	}
	get collection() {
		return this.elements.length > 1 ? this.elements : this.elements[0];
	}
	on(event, cb) {
		this.elements.forEach((el) => {
			el.addEventListener(event, cb);
		});
	}
	addClass(...classes) {
		this.elements.forEach((el) => {
			classes.forEach((_class) => el.classList.add(_class));
		});
	}
	removeClass(...classes) {
		this.elements.forEach((el) => {
			classes.forEach((_class) => el.classList.remove(_class));
		});
	}
	toggleClass(...classes) {
		this.elements.forEach((el) => {
			classes.forEach((_class) => el.classList.toggle(_class));
		});
	}

	replaceClass(firstClass, secondClass) {
		this.elements.forEach((el) => {
			el.classList.remove(firstClass);
			el.classList.add(secondClass);
		});
	}
	css(styles) {
		this.elements.forEach((el) => {
			for (let [property, value] of Object.entries(styles)) {
				el.style[property] = value;
			}
		});
	}
	each(cb) {
		this.elements.forEach(cb);
	}

	getDiminutions() {
		const elDiminutions = this.elements.map((el) => el.getBoundingClientRect());
		return elDiminutions.length > 1 ? elDiminutions : this.elements[0];
	}
}

function $(selector) {
	return new El(selector);
}

// animating
// anime({
// 	targets: ".hero-section",
// 	opacity: ["0", "1"],
// 	easing: "easeInOutSine",
// 	// delay: anime.stagger(200),
// 	// autoplay: false,
// 	// loop: false
// 	duration: 500,
// 	// complete: function () {},
// });

// anime({
// 	targets: ".hero-section img",
// 	translateY: ["-15", "0"],
// 	easing: "easeInOutSine",
// 	duration: 600,
// });

// anime({
// 	targets: [".hero-section h1", ".hero-section p", ".hero-section button"],
// 	translateX: ["-30", "0"],
// 	easing: "easeOutQuad",
// 	delay: function (el, i, l) {
// 		return i * 90;
// 	},
// 	duration: 1000,
// });

// whenVisible(
// 	el,
// 	(entries) => {
// 		let entry = entries[entries.length - 1];
// 		if (entry.isIntersecting) {
// 			// about.seek(about.duration * 1);
// 			about.play();
// 			return;
// 		}
// 		// about.seek(about.duration * 0);
// 		// about.reset();
// 		about.reverse();
// 	},
// 	{
// 		rootMargin: "48px 0px",
// 		threshold: 0.6,
// 	},
// );

// function whenVisible(el, cb, options) {
// 	const observer = new IntersectionObserver(cb, options);
// 	observer.observe(el);
// }

// Open on closing the menu
const menu = $("#menu");
const toggleBtn = $("#toggle-menu");
toggleBtn.on("click", () => toggleMenu());

function toggleMenu() {
	toggleBtn.toggleClass("open");
	const isOpen = toggleBtn.collection.classList.contains("open");
	menu.css({
		left: isOpen ? "50%" : "-150%",
		opacity: isOpen ? 1 : 0,
	});
}

// close the menu when the use click on a link
$("#menu li a").each((el) => {
	$(el).on("click", () => toggleMenu());
});

// Open and close the settings view
$("#settings-view-toggler").on("click", ({ currentTarget }) => {
	currentTarget.parentNode.classList.toggle("open");
});

// toggle The dark mode
const html = document.querySelector("html");
const themeToggler = $("#toggle-mode");
const THEME_KEY = "BVHHDBJXBXHS";

const isDark = localStorage.getItem(THEME_KEY) === "dark" ? true : false;
toggleTheme(isDark);

themeToggler.on("change", ({ currentTarget }) => toggleTheme(currentTarget.checked));

function toggleTheme(isDark) {
	if (isDark) {
		localStorage.setItem(THEME_KEY, "dark");
		html.classList.add("dark");
		themeToggler.collection.checked = isDark;
		return;
	}
	localStorage.setItem(THEME_KEY, "light");
	html.classList.remove("dark");
	themeToggler.collection.checked = isDark;
}

// Slider
let slideIndex = 0;
const slider = $(".slider");
const slidesWrapper = $(".slider .slider-wrapper");
const slides = $(".slider .slider-wrapper > div");
const slidesCount = $(".slides-count");

slidesCount.collection.innerHTML = slides.collection
	.map((_, index) => {
		return `<li class="w-2 h-2 transition-all md:cursor-pointer duration-700 bg-white rounded-lg mx-1" data-index="${index}"></li>`;
	})
	.join("");

$(".next").on("click", () => {
	if (slideIndex === slides.collection.length - 1) return;
	slideIndex++;
	setSlide();
});

$(".prev").on("click", () => {
	if (slideIndex === 0) return;
	slideIndex--;
	setSlide();
});

function setSlide(to = null) {
	let x;
	if (to !== null) {
		slideIndex = to;
		x = to;
	} else {
		x = slideIndex;
	}
	activeBall(slideIndex);
	slidesWrapper.css({
		transform: `translateX(calc(-${x * slideBy()}px))`,
	});
}

function slideBy() {
	let x = slidesWrapper.collection.clientWidth / slides.collection.length;
	return x;
}

const ball = $(".slides-count li");
ball.on("click", ({ target }) => setSlide(Number(target.dataset.index)));
activeBall(0);

function activeBall(index) {
	ball.each((el, i) => {
		if (index === i) {
			$(el).css({ background: "#68C9BA", width: "0.8rem" });
			return;
		}
		$(el).css({ background: "#fff", width: "0.5rem" });
	});
}

// Scroll to top btn
const scrollToTop = $("#back-to-top");

scrollToTop.on("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", (e) => {
	if (window.pageYOffset < window.innerWidth * 1.5) {
		scrollToTop.css({
			visibility: "hidden",
			pointerEvent: "none",
		});
		return;
	}
	scrollToTop.css({
		visibility: "visible",
		pointerEvent: "",
	});
});
