import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const parse = (s: string) => {
  const clean = s.startsWith("#") ? s.slice(1) : s.replace(/^\?/, "");
  return Object.fromEntries(
    clean
      .split("&")
      .map((p) => p.split("="))
      .filter((kv) => kv[0])
      .map(([k, v]) => [k, decodeURIComponent(v || "")]),
  );
};

export default function ResetPassword() {
  const [message, setMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash || "";
    const search = window.location.search || "";

    if (hash) {
      const params = parse(hash);
      const access_token = params["access_token"] as string | undefined;
      const refresh_token = params["refresh_token"] as string | undefined;
      if (access_token) {
        if (!supabase) {
          setMessage("Supabase not configured.");
          return;
        }
        (async () => {
          const auth = (supabase as any).auth;
          if (auth?.setSession) {
            await auth.setSession({ access_token, refresh_token });
            setMessage("Verification successful. Enter a new password below.");
          } else if (auth?.setAuth) {
            auth.setAuth(access_token);
            setMessage("Session set (legacy). Enter a new password below.");
          } else {
            setMessage("Unable to set session: unsupported client version.");
          }
        })();
      }
    } else if (search) {
      const params = parse(search);
      const token = params["token"] as string | undefined;
      if (token) {
        setMessage(
          "A recovery token was detected. Click Continue to finish verification.",
        );
      }
    }
  }, []);

  const continueVerify = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) return setMessage("No token found.");
    const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    if (!base) return setMessage("VITE_SUPABASE_URL not configured.");
    // Use a configured app URL if provided, otherwise fall back to current origin
    const appUrl =
      (import.meta.env.VITE_APP_URL as string) || window.location.origin;
    const redirect = `${appUrl.replace(/\/$/, "")}/reset-password`;
    // Send user to Supabase verify endpoint which will then redirect back with tokens in the fragment
    window.location.href = `${base.replace(/\/$/, "")}/auth/v1/verify?token=${encodeURIComponent(
      token,
    )}&type=recovery&redirect_to=${encodeURIComponent(redirect)}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (!supabase) throw new Error("Supabase not configured.");
      const auth = (supabase as any).auth;
      if (auth?.updateUser) {
        const { error } = await auth.updateUser({ password });
        if (error) throw error;
        setMessage("Password updated. You can now sign in.");
      } else {
        setMessage("Unable to update password: unsupported client version.");
      }
    } catch (err: any) {
      setMessage(err?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      {message && <div className="mb-4">{message}</div>}

      {new URLSearchParams(window.location.search).get("token") ? (
        <div>
          <p className="mb-4">
            You have a recovery token. Continue to complete verification.
          </p>
          <button className="btn" onClick={continueVerify}>
            Continue verification
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <label className="block mb-2">New password</label>
          <input
            type="password"
            minLength={6}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <div className="mt-4">
            <button className="btn" type="submit" disabled={loading}>
              Set password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
