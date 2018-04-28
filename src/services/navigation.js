import createHistory from "history/createBrowserHistory";

export const history = createHistory();

export const toSplash = () => history.replace("/splash");
export const toSignup = () => history.replace("/signup");
export const toHome = () => history.replace("/home");
export const toProduct = ean => history.push("/product/" + ean);
export const goBack = () => history.goBack();
