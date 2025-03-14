"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { useLazyMeQuery } from "@/store/api/authApi";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [me] = useLazyMeQuery();

  useEffect(() => {
    me()
      .unwrap()
      .then((user) => {
        dispatch(setCredentials({ access_token: "", user: user }));
        if (typeof window !== "undefined" && window.location.pathname === "/") {
          router.push("/collections");
        }
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          router.push("/");
        }
      });
  }, [dispatch, me, router]);

  return <>{children}</>;
};

export default AuthMiddleware;
