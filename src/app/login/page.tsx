import { Suspense } from "react";
import LoginForm from "../ui/authForm";
import AuthForm from "../ui/authForm";

export default function Home() {
  return (
    <Suspense>
      <AuthForm type="login" />
    </Suspense>
  );
}
