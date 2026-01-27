import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../input";
import { Button } from "../button";
import { replace, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFoarmValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        "http://localhost:2000/api/user/",
        userData,
      );
      console.log("response data", response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("success data", data);
      // navigate("/dashboard", replace);
    },
    onError: (error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during registration");
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoarmValue({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formValues.name || !formValues.email || !formValues.password) {
      setError("All fields are required");
      return;
    }
    if (formValues.password !== formValues.confirmPassword) {
      return setError("Password do not match");
    }

    // TODO: mutation
    registerMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to register
        </CardDescription>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-2 pt-0">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md text-center">
                  {error}
                </div>
              )}
              <div className="text-sm font-medium text-left">Full Name</div>
              <Input
                name="name"
                placeholder="john Doe"
                required
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 pt-0">
              <div className="text-sm font-medium text-left">Eamil</div>
              <Input
                name="email"
                placeholder="email@gmail.com"
                required
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 pt-0">
              <div className="text-sm font-medium text-left">password</div>
              <Input
                name="password"
                type={"password"}
                placeholder="******"
                required
                value={formValues.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 pt-0 mb-2">
              <div className="text-sm font-medium text-left">
                Confirm password
              </div>
              <Input
                type={"password"}
                name="confirmPassword"
                placeholder="******"
                required
                value={formValues.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-4">
              <Button type="submit" className={"w-full cursor-pointer"}>
                {registerMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader /> Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </CardContent>
          <div>
            <CardFooter className={"flex justify-center pt-0"}>
              <div className="text-center text-sm">
                already have an account ?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="text-primary hover:underline cursor-pointer"
                >
                  Sign in
                </a>
              </div>
            </CardFooter>
          </div>
        </form>
      </CardHeader>
    </Card>
  );
};
