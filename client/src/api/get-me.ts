export const getMe = async (): Promise<string> => {
  const { VITE_SERVER_HOST, VITE_SERVER_PORT } = import.meta.env;

  return new Promise<string>((resolve, reject) => {
    fetch(`http://${VITE_SERVER_HOST}:${VITE_SERVER_PORT}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode === 401) {
          throw new Error(data.message);
        }

        resolve(data.username);
      })
      .catch((err) => reject(new Error(err.message)));
  });
};
