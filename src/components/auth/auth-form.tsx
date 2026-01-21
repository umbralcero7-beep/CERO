"use client";

import { useState } from "react";
import { useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { useTranslation } from "../providers/language-provider";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleAuth = async (isSignUp: boolean) => {
    setLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, {
          id: user.uid,
          email: user.email,
          createdAt: new Date().toISOString(),
          role: 'free'
        });

        router.push("/onboarding");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
      }
    } catch (error) {
      let errorMessage = t('auth.error.generic');
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = t('auth.error.emailInUse');
            break;
          case "auth/user-not-found":
          case "auth/invalid-credential":
            errorMessage = t('auth.error.invalidCredentials');
            break;
          case "auth/invalid-email":
            errorMessage = t('auth.error.invalidEmail');
            break;
          case "auth/weak-password":
            errorMessage = t('auth.error.weakPassword');
            break;
          default:
            errorMessage = t('auth.error.generic');
        }
      }
      toast({
        variant: "destructive",
        title: t('auth.error.title'),
        description: errorMessage,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: t('passwordReset.emailRequired.title'),
        description: t('passwordReset.emailRequired'),
      });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: t('passwordReset.success.title'),
        description: t('passwordReset.success.description'),
      });
    } catch (error) {
      let errorMessage = t('auth.error.generic');
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = t('auth.error.invalidEmail');
            break;
          case 'auth/user-not-found':
            errorMessage = t('passwordReset.error.userNotFound');
            break;
          default:
            errorMessage = "Error: " + error.message;
            break;
        }
      }
      toast({
        variant: "destructive",
        title: t('passwordReset.error.title'),
        description: errorMessage,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">{t('auth.tabs.login')}</TabsTrigger>
        <TabsTrigger value="signup">{t('auth.tabs.signup')}</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>{t('auth.login.title')}</CardTitle>
            <CardDescription>
              {t('auth.login.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">{t('auth.emailLabel')}</Label>
              <Input
                id="login-email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">{t('auth.passwordLabel')}</Label>
                <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground" onClick={handlePasswordReset} disabled={loading}>
                  {t('auth.forgotPassword')}
                </Button>
              </div>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleAuth(false)}
              disabled={loading}
            >
              {loading ? t('auth.login.loadingButton') : t('auth.login.button')}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>{t('auth.signup.title')}</CardTitle>
            <CardDescription>
              {t('auth.signup.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email">{t('auth.emailLabel')}</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">{t('auth.passwordLabel')}</Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleAuth(true)}
              disabled={loading}
            >
              {loading ? t('auth.signup.loadingButton') : t('auth.signup.button')}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
