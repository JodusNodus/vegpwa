import { VEGAPI_URL } from "../constants";

async function req(path = "/", method = "GET", body) {
  const options = {
    method,
    credentials: "include",
    mode: "cors",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (body) {
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

export async function updateLocation({ lat, lng }) {
  await req("/api/location", "POST", { lat, lng });
}
