import { VEGAPI_URL } from "../constants";

const timeout = (ms = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

async function retryReq(args = [], attemps = 2) {
  let res;
  for (let i = 0; i < attemps; i++) {
    try {
      res = await req.apply(null, args);
      break;
    } catch (err) {
      if (typeof err === "number") {
        throw err;
        break;
      }
      await timeout(1000 * (i + 1));
    }
  }
  return res;
}

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
    throw resp.status;
  }
  try {
    return await resp.json();
  } catch (error) {
    return null;
  }
}

export async function signup(signupForm) {
  try {
    const { user } = await retryReq(["/signup", "POST", signupForm], 4);
    return user;
  } catch (error) {
    return null;
  }
}

export async function login(loginForm) {
  try {
    const { user } = await retryReq(["/login", "POST", loginForm], 4);
    return user;
  } catch (error) {
    return null;
  }
}

export async function updateLocation(coords) {
  await retryReq(["/api/location", "POST", coords], 4);
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
  return await retryReq(["/api/products?" + query]);
}

export async function fetchProduct(ean) {
  return await retryReq(["/api/products/" + ean]);
}

export async function rateProduct(ean, rating) {
  await retryReq(
    [
      "/api/products/" + ean + "/rate",
      "POST",
      {
        rating
      }
    ],
    2
  );
}

export async function markProductInvalid(ean) {
  await retryReq(["/api/products/" + ean, "DELETE"]);
}

export async function fetchSupermarkets() {
  return await retryReq(["/api/supermarkets"]);
}

export async function fetchLabels() {
  return await retryReq(["/api/labels"]);
}

export async function fetchBrands() {
  return await retryReq(["/api/brands"]);
}

export async function uploadProductPicture(ean, file) {
  const form = new FormData();
  form.append("ean", ean);
  form.append("picture", file);
  return await retryReq(["/api/products/picture", "POST", form]);
}

export async function createProduct(product) {
  await retryReq(["/api/products", "POST", product]);
}
