import { SignUpInputs } from "../types/SignUpInputs";

export const signUp = async ({
  password,
  confirmPassword,
  username,
}: SignUpInputs): Promise<string> => {
  const { VITE_SERVER_HOST, VITE_SERVER_PORT } = import.meta.env;

  return new Promise<string>((resolve, reject) => {
    if (password !== confirmPassword) {
      reject(new Error("Confirm password does not match with the password"));
    } else {
      fetch(`http://${VITE_SERVER_HOST}:${VITE_SERVER_PORT}/auth/signup`, {
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
          if (data.statusCode === 400) {
            reject(new Error(data.message));
          }
          localStorage.setItem("token", data.access_token);
          resolve(username);
        })
        .catch((err) => reject(new Error(err.message)));
    }
  });
};
