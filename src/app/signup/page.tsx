import AuthForm from "../ui/login-form";
import SignupForm from "../ui/signup-form";
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <AuthForm type="signup" />
    </Suspense>
  );
}
