class View {
  #currentActiveSection = document.querySelector(".nav-items--active");

  constructor() {
    this.handleNavOptionClick();
    this.handleNavMainOptionClick();
  }

  #changeCurrentView(target) {
    this.#currentActiveSection.classList.remove("nav-items--active");
    document
      .getElementById(this.#currentActiveSection.dataset.section)
      .classList.add("hidden");

    this.#currentActiveSection = target;

    this.#currentActiveSection.classList.add("nav-items--active");
    document
      .getElementById(this.#currentActiveSection.dataset.section)
      .classList.remove("hidden");
  }

  handleNavOptionClick() {
    const parentEl = document.querySelector(".nav-list");
    parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".nav-items");
      if (!target) return;
      this.#changeCurrentView(target);
    });
  }

  handleNavMainOptionClick() {
    const parentEl = document.querySelector(".main-options-container");
    parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".main-options-box-text-btn");
      if (!target) return;
      this.#changeCurrentView(
        document.querySelector(`.${target.dataset.section}`)
      );
    });
  }
}

export default new View();
