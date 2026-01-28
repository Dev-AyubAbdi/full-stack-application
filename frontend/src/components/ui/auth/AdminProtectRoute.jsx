import api from "@/lib/api/apiClient";
import useAuthStore from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";

export const AdminProtectRoute = ({ children }) => {
  const { user, setAuth, clearAuth, token } = useAuthStore();

  const location = useLocation();

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) {
        throw new Error("Invalid token");
      }
      return response.data;
    },
    enabled: !!token,
    retry: 1,
  });
  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  //   error case
  useEffect(() => {
    if (isError && data) {
      clearAuth();
    }
  }, [isError, error, data, clearAuth]);
  // success case
  useEffect(() => {
    setAuth(data, token);
  }, [isSuccess, data, setAuth, token]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  //   if (!user) {
  //     return <Navigate to={"/login"} state={{ from: location }} replace />;
  //   }

  if (user?.role != "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  console.log("userInfo", user);
  return children;
};
