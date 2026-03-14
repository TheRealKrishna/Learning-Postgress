"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSignupMutation } from '@/features/auth/auth.api';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const [signup, { isLoading }] = useSignupMutation();

  const passwordChecks = useMemo(
    () => ({
      minLength: password.length >= 8,
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /\d/.test(password),
    }),
    [password]
  );

  const isPasswordStrong =
    passwordChecks.minLength && passwordChecks.hasLetter && passwordChecks.hasNumber;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!isPasswordStrong) {
      setFormError('Password must be at least 8 characters and include letters and numbers.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    try {
      const response = await signup({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      }).unwrap();

      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      router.push('/');
    } catch (error: unknown) {
      const fallbackMessage = 'Signup failed. Please try again.';
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const maybeData = (error as { data?: unknown }).data;
        if (typeof maybeData === 'object' && maybeData !== null && 'error' in maybeData) {
          const apiError = (maybeData as { error?: unknown }).error;
          if (typeof apiError === 'string') {
            setFormError(apiError);
            return;
          }
        }
      }
      setFormError(fallbackMessage);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.35),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.25),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.15),transparent_45%)]" />
      <main className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>My Postgres Lab</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              Create your account and start building your own CRUD world.
            </h1>
            <p className="max-w-xl text-slate-300">
              This app is your playground. Sign up, log in, and manage your own data while you learn PostgreSQL hands-on.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-slate-300">Auth</p>
              <p className="mt-2 font-semibold">JWT + Argon2</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-slate-300">Database</p>
              <p className="mt-2 font-semibold">Postgres + Prisma</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-slate-300">State</p>
              <p className="mt-2 font-semibold">Redux Toolkit Query</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <p className="mt-1 text-sm text-slate-300">Use your account to create and manage personal records.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Full Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/25"
                placeholder="Krishna Agarwal"
                autoComplete="name"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/25"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/25"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-900/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/25"
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
            </label>

            <ul className="space-y-1 rounded-xl border border-white/10 bg-slate-900/30 p-3 text-xs text-slate-300">
              <li className={passwordChecks.minLength ? 'text-emerald-300' : ''}>At least 8 characters</li>
              <li className={passwordChecks.hasLetter ? 'text-emerald-300' : ''}>Contains a letter</li>
              <li className={passwordChecks.hasNumber ? 'text-emerald-300' : ''}>Contains a number</li>
            </ul>

            {formError ? (
              <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{formError}</p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 px-5 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
