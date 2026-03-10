import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const { session, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  if (loading) return null;
  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!keepLoggedIn) {
      // Switch to sessionStorage so session clears on tab close
      await supabase.auth.setSession({ access_token: '', refresh_token: '' }).catch(() => {});
    }

    const { error } = await signIn(email, password);
    if (error) setError(error.message);

    if (!keepLoggedIn && !error) {
      // Move session from localStorage to sessionStorage
      const keys = Object.keys(localStorage).filter(k => k.startsWith('sb-'));
      keys.forEach(k => {
        const val = localStorage.getItem(k);
        if (val) {
          sessionStorage.setItem(k, val);
          localStorage.removeItem(k);
        }
      });
    }

    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-foreground mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center gap-2">
            <Checkbox
              id="keepLoggedIn"
              checked={keepLoggedIn}
              onCheckedChange={(checked) => setKeepLoggedIn(checked === true)}
            />
            <label htmlFor="keepLoggedIn" className="text-sm text-muted-foreground cursor-pointer select-none">
              Keep me logged in
            </label>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
