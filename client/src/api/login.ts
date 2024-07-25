import { LoginInputs } from "../types/Login";

export const login = async ({
  password,
  username,
}: LoginInputs): Promise<{ username: string }> => {
  const { VITE_SERVER_HOST, VITE_SERVER_PORT } = import.meta.env;

  return new Promise<{ username: string }>((resolve, reject) => {
    fetch(`http://${VITE_SERVER_HOST}:${VITE_SERVER_PORT}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode === 401) {
          throw new Error(data.message);
        }
        localStorage.setItem("token", data.access_token);
        resolve({ username });
      })
      .catch((err) => reject(new Error(err.message)));
  });
};
