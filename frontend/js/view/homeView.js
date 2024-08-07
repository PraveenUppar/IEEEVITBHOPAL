class HomeView {
  #activeSection = document.querySelector(".nav-items--active");

  constructor() {
    this.handelNavClick();
    this.handelMainOptionClick();
    this.handelRegisterBtnclick();
    this.handelAcademicHelpclick();
    this.handelFormExitClick(document.getElementById("register-form"));
    this.handelFormExitClick(document.getElementById("sign-in-form"));
    this.handelFormExitClick(document.getElementById("post-test-paper"));
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

  handelFormExitClick(parentEl) {
    parentEl.addEventListener("click", (e) => {
      const btnTarget = e.target.closest(".main-form-cancel-btn");
      if (!btnTarget) return;
      parentEl.classList.add("hidden");
    });
  }

  handelAcademicHelpclick() {
    const parentEl = document.querySelector(".academic-cta-field");
    parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".post-btn");
      if (!target) return;
      document.getElementById("post-test-paper").classList.remove("hidden");
    });
  }

  handelRegisterBtnclick() {
    const parentEl = document.querySelector(".nav-extras");
    parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".nav-extras-btn");
      if (!target) return;
      document
        .getElementById(target.dataset.btnType)
        .classList.remove("hidden");
    });
  }

  handleSubmitEvent(parentFormID, handler) {
    const parentel = document.getElementById(parentFormID);
    parentel.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
      this.clearRegisterForm();
      parentel.classList.add("hidden");
    });
  }

  getRegisterFormData() {
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const access = "user";
    return {
      name: name,
      email: email,
      password: password,
      access: "user",
    };
  }

  clearRegisterForm() {
    document.getElementById("register-name").value = "";
    document.getElementById("register-email").value = "";
    document.getElementById("register-password").value = "";
  }

  getSignInFormData() {
    const email = document.getElementById("sign-in-email").value;
    const password = document.getElementById("sign-in-password").value;
    return {
      email: email,
      password: password,
    };
  }

  hideloginBtn() {
    document.getElementById("register-btn").classList.add("hidden");
    document.getElementById("sign-in-btn").classList.add("hidden");
  }

  hideLogoutBtn() {
    document.getElementById("logout").classList.add("hidden");
  }
  showLogoutBtn() {
    document.getElementById("logout").classList.remove("hidden");
  }
}

export default new HomeView();
