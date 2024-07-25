import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api/get-me";
import "./App.scss";
import { Header, Main } from "./components/layout";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { onChangeAuth, onChangeUsername } = useAuth();

  const { isLoading } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const username = await getMe();
      onChangeAuth(true);
      onChangeUsername(username);
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
