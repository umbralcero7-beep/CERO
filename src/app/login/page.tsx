import { AuthForm } from "@/components/auth/auth-form";
import { Bot } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
            <div className="flex flex-col items-center justify-center text-center mb-8">
                <Bot className="w-12 h-12 text-primary mb-4" />
                <h1 className="text-3xl font-bold font-headline text-foreground">
                    Bienvenido a Umbral
                </h1>
                <p className="text-muted-foreground mt-2">
                    Tu compañero para el bienestar.
                </p>
            </div>
            <AuthForm />
        </div>
    </div>
  );
}
