import { auth } from "@/auth";
import { LoginForm } from "@/components/authComponents/LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    return <div>already authenticated</div>;
  }
  return (
    <main className="flex h-full w-full items-center justify-center bg-slate-900">
      <LoginForm />
    </main>
  );
}
