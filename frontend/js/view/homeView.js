class HomeView {
  #activeSection = document.querySelector(".nav-items--active");

  constructor() {
    this.handelNavClick();
  }

  handelNavClick() {
    const parentEl = document.querySelector(".nav-list");
    parentEl.addEventListener("click", (e) => {
      const target = e.target.parentElement;
      console.log(target);
    });
  }
}

export default new HomeView();
