import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

async function CreateUser(newUser) {
  const response = await fetch("http://localhost:2000/api/user/", { 
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser)
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
    alert('hello')
  };
  return (
    <div>
      <input type="text" onChange={(e) => setUser(e.target.value)} /> <br />
      <input type="email" onChange={(e) => setEmail(e.target.value)} /> <br />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAdd}>Add New User</button>
    </div>
  );
};
