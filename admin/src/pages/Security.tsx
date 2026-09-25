import { useState, type FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (newPassword.length < 12) { setError("Use at least 12 characters for the new password."); return; }
    if (newPassword !== confirmPassword) { setError("The new passwords do not match."); return; }
    setBusy(true);
    try {
      await api.put("/auth/password", { currentPassword, newPassword });
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      toast.success("Password updated. Other sessions have been signed out.");
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message ?? "Could not update password." : "Could not update password.");
    } finally { setBusy(false); }
  }
  return <div className="max-w-2xl space-y-5"><div><h2 className="text-xl font-bold text-surface-900 dark:text-white">Security</h2><p className="mt-1 text-sm text-surface-500 dark:text-dark-400">Change the admin password used to access this dashboard.</p></div><Card><CardHeader><CardTitle>Change password</CardTitle><CardDescription>Use a unique password with at least 12 characters.</CardDescription></CardHeader><CardContent><form onSubmit={submit} className="space-y-4">
    <div className="space-y-2"><Label htmlFor="current-password">Current password</Label><Input id="current-password" type="password" autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required /></div>
    <div className="space-y-2"><Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" autoComplete="new-password" minLength={12} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></div>
    <div className="space-y-2"><Label htmlFor="confirm-password">Confirm new password</Label><Input id="confirm-password" type="password" autoComplete="new-password" minLength={12} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}<Button disabled={busy}>{busy ? "Updating…" : "Update password"}</Button>
  </form></CardContent></Card></div>;
}
