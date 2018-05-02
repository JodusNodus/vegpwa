import { VEGAPI_URL } from "../constants";

async function req(path = "/", method = "GET", body) {
  const options = {
    method,
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
    headers: {
      Accept: "application/json"
    }
  };
  if (body instanceof FormData) {
    //options.headers["Content-Type"] = "multipart/form-data";
    options.body = body;
  } else {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }
  const url = VEGAPI_URL + path;
  const resp = await fetch(url, options);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  try {
    return await resp.json();
  } catch (error) {
    return null;
  }
}

export async function signup(signupForm) {
  try {
    const { user } = await req("/signup", "POST", signupForm);
    return user;
  } catch (error) {
    return null;
  }
}

export async function login(loginForm) {
  try {
    const { user } = await req("/login", "POST", loginForm);
    return user;
  } catch (error) {
    return null;
  }
}

export async function updateLocation({ lat, lng }) {
  await req("/api/location", "POST", { lat, lng });
}

const querify = function(obj) {
  const str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export async function fetchProducts(options) {
  const query = querify(options);
  return await req("/api/products?" + query);
}

export async function fetchProduct(ean) {
  return await req("/api/products/" + ean);
}

export async function rateProduct(ean, rating) {
  await req("/api/products/" + ean + "/rate", "POST", {
    rating
  });
}

export async function markProductInvalid(ean) {
  await req("/api/products/" + ean, "DELETE");
}

export async function fetchSupermarkets() {
  return await req("/api/supermarkets");
}

export async function fetchLabels() {
  return await req("/api/labels");
}

export async function fetchBrands() {
  return await req("/api/brands");
}

export async function uploadProductPicture(ean, file) {
  const form = new FormData();
  form.append("ean", ean);
  form.append("picture", file);
  return await req("/api/products/picture", "POST", form);
}

export async function createProduct(product) {
  await req("/api/products", "POST", product);
}
