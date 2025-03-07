import AuthForm from "../ui/authForm";
import SignupForm from "../ui/signup-form";
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <AuthForm type="signup" />
    </Suspense>
  );
}
