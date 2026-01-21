import { useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  const { data, error, isLoading } = useQuery({
    queryFn: () =>
      fetch("http://localhost:2000/api/users/").then((res) => res.json()),
    queryKey: ["users"],
  });

  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>error</h1>;

  return (
    <div>{data.user.length > 0 && data.user.map((users) => <h1>{users.name}</h1>)}</div>
  );
}

export default App;
