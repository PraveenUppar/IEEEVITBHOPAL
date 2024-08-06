class HomeView {
  #activeSection = document.querySelector(".nav-items--active");

  constructor() {
    this.handelNavClick();
    this.handelMainOptionClick();
  }

  #changeActiveSection(target) {
    this.#activeSection.classList.remove("nav-items--active");
    document
      .getElementById(this.#activeSection.dataset.section)
      .classList.add("hidden");

    this.#activeSection = target;

    this.#activeSection.classList.add("nav-items--active");
    document
      .getElementById(this.#activeSection.dataset.section)
      .classList.remove("hidden");
  }

  handelNavClick() {
    const parentEl = document.querySelector(".nav-list");
    parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".nav-items");
      if (!target) return;
      this.#changeActiveSection(target);
    });
  }

  handelMainOptionClick() {
    const parentEl = document.querySelector(".main-options-container");
    parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".main-options-box-text-btn");
      if (!target) return;
      this.#changeActiveSection(
        document.querySelector(`.${target.dataset.section}`)
      );
    });
  }
}

export default new HomeView();
