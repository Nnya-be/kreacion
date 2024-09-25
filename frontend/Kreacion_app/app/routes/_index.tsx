import LandingPage from "./index";
import SignupPage from './signup';
import LoginPage from "./login";

export const routes = [
    { path: '/', component: LandingPage },
    { path: '/signup', component: SignupPage },
    { path: '/login', component: LoginPage },
  ];
  