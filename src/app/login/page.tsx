import { Suspense } from "react";
import LoginForm from "../ui/login-form";

export default async function Home() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
