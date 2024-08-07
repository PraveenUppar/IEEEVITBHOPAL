class HomeView {
  #activeSection = document.querySelector(".nav-items--active");

  constructor() {
    this.handelNavClick();
    this.handelMainOptionClick();
    this.handleLoginBtnClick();
    this.handelFormExitClick(document.getElementById("sign-in-form"));
    this.handelAcademicHelpclick();
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
      this.removeLoginForm();
      parentEl.classList.add("hidden");
    });
  }

  renderLoginForm(type) {
    document.getElementById("sign-in-form").classList.remove("hidden");
    const formParent = document.querySelector(".main-form-box");
    const html = `
            <form action="#" class="form">
              <p class="main-form-heading">
                ${type == "btn-sign-in" ? "Sign In" : "Register"}
              </p>
              <div class="form-box ${type == "btn-sign-in" ? "hidden" : ""}">
                <label for="name"
                  ><i class="ph-fill ph-user-circle form-icon"></i
                ></label>
                <input
                  type="text"
                  id="name"
                  class="form-input"
                  placeholder="Full name"
                  required
                />
                <label for="name" class="form-label-text">Full name</label>
                <i class="ph-fill ph-warning form-icon-sml form-warning"></i>
              </div>
              <div class="form-box">
                <label for="email">
                  <i class="ph-fill ph-envelope form-icon"></i>
                </label>
                <input
                  type="email"
                  id="email"
                  class="form-input"
                  placeholder="E-mail"
                  required
                />
                <label for="email" class="form-label-text">E-mail</label>
                <i class="ph-fill ph-warning form-icon-sml form-warning"></i>
              </div>
              <div class="form-box margin-bottom-med">
                <label for="password">
                  <i class="ph-fill ph-lock-key-open form-icon"></i>
                </label>
                <input
                  type="Password"
                  id="password"
                  class="form-input"
                  placeholder="Password"
                  required
                />
                <label for="password" class="form-label-text">Password</label>
                <i class="ph-fill ph-warning form-icon-sml form-warning"></i>
              </div>
              <button class="btn form-btn">Sign Up</button>
            </form>
            <button class="main-form-cancel-btn btn">
              <i class="ph ph-x"></i>
            </button>
    `;
    formParent.insertAdjacentHTML("afterbegin", html);
    formParent.classList.remove("hidden");
  }

  removeLoginForm() {
    document.getElementById("sign-in-form").classList.add("hidden");
    const formParent = document.querySelector(".main-form-box");
    formParent.innerHTML = "";
    formParent.classList.add("hidden");
  }

  handleLoginBtnClick() {
    const parentEl = document.querySelector(".nav-extras");
    parentEl.addEventListener("click", (e) => {
      const target = e.target.closest(".nav-extras-btn");
      if (!target) return;
      this.renderLoginForm(target.dataset.btnType);
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
}

export default new HomeView();
