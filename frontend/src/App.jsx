import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { TestUser } from "./TestUser";

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['User'],
    queryFn: () =>
      fetch("http://localhost:2000/api/users/").then((res) => res.json()),
  });

  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>error..</h1>;

  return (
    <>
    <TestUser />
     <div>{data.user.map((users) => <h1>{users.name}</h1>)}</div>
    </>
   
  );
}

export default App;
