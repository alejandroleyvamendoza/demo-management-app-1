import { Suspense } from "react";
import LoginForm from "../ui/login-form";
import AuthForm from "../ui/login-form";

export default function Home() {
  return (
    <Suspense>
      <AuthForm type="login" />
    </Suspense>
  );
}
