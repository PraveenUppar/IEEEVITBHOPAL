import HomeView from "./view/homeView.js";
import { sendRegisterData, sendLoginData } from "./model.js";

const name = "Tejasva";
const email = "Tejasva@gmail.com";
const password = "Tejasva_087";

let data;
const init = function () {
  HomeView.handleSubmitEvent("register-form", () => {
    const data = HomeView.getRegisterFormData();
    sendRegisterData(data);
  });
  HomeView.handleSubmitEvent("sign-in-form", () => {
    const data = HomeView.getSignInFormData();
    sendLoginData(data);
  });
};

init();
