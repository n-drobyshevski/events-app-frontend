import { API_URL } from "@/config/index";

export default async ({ email, password, username }) => {
  const response = { ok: false, error: "" };
  const res = await fetch(`${API_URL}/api/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      username: username,
      email: email,
    }),
  });

  const data = await res.json();

  if (data.error) {
    response.error = data.error.message;
  } else {
    response.ok = true;
  }
  return response;
};
