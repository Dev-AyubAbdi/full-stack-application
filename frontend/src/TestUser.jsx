import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

async function CreateUser(newUser) {
  const response = await fetch("http://localhost:2000/api/user/", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error("failed to create new user");
  return response.json();
}
export const TestUser = () => {
  
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryCleint = useQueryClient();

  const mutation = useMutation({
    mutationFn: CreateUser,
    onSuccess: () => {
      queryCleint.invalidateQueries({
        queryKey: ["User"],
      });
    },
  });

  const handleAdd = () => {
    mutation.mutate({ name: user, email, password });
  };
  return (
    <div>
      <Input require type="text"  onChange={(e) => setUser(e.target.value)}  /> <br />
      <Input type="email" onChange={(e) => setEmail(e.target.value)} /> <br />
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      <Input type="text" />
      <Button onClick={handleAdd}>add New User</Button>
    </div>
  );
};
