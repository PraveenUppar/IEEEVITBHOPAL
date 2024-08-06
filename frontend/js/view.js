class View {
  #currentActiveSection = document.querySelector(".nav-items--active");

  constructor() {
    this.handleNavOptionClick();
  }

  handleNavOptionClick() {
    const parentEl = document.querySelector(".nav-list");

    parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".nav-items");
      if (!target) return;

      this.#currentActiveSection.classList.remove("nav-items--active");
      document
        .getElementById(this.#currentActiveSection.dataset.section)
        .classList.add("hidden");

      this.#currentActiveSection = target;

      this.#currentActiveSection.classList.add("nav-items--active");
      document
        .getElementById(this.#currentActiveSection.dataset.section)
        .classList.remove("hidden");
    });
  }
}

export default new View();
