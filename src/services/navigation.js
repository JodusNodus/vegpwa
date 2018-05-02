import createHistory from "history/createBrowserHistory";

export const history = createHistory({
  basename: "/vegpwa"
});

export const toSplash = () => history.replace("/splash");
export const toSignup = () => history.replace("/signup");
export const toHome = () => history.replace("/home");
export const toProduct = ean => history.push("/product/" + ean);
export const toCreateProduct = (step = 1) => history.replace("/create/" + step);
export const toFavorites = () => history.replace("/favorites");

export const goBack = () => history.goBack();
