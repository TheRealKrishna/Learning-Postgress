"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignupMutation } from '../../features/auth/authApi';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await signup({ name, email, password }).unwrap();
      // On success, redirect to dashboard or login
      router.push('/login');
    } catch (err: any) {
      setError(err?.data?.error || err?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold bg-gradient-to-tr from-purple-600 to-cyan-400 shadow-xl">PG</div>
          <h2 className="mt-6 text-3xl font-extrabold">Create your account</h2>
          <p className="mt-3 text-slate-300">Sign up to manage your personal data. Everything you create is private to your account.</p>

          <div className="mt-6 glass p-4 rounded-2xl">
            <div className="text-sm text-slate-200 font-semibold">Why sign up?</div>
            <ul className="mt-2 text-slate-300 text-sm list-disc list-inside">
              <li>Store your items and manage them.</li>
              <li>Experiment with SQL and migrations safely.</li>
              <li>Access Prisma Studio to inspect your data.</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl">
          {error && <div className="mb-4 text-sm text-red-300">{error}</div>}
          <label className="block text-sm font-medium">Full name</label>
          <input className="mt-2 mb-4 w-full p-3 rounded-lg bg-transparent border border-white/5" value={name} onChange={(e)=>setName(e.target.value)} />

          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-2 mb-4 w-full p-3 rounded-lg bg-transparent border border-white/5" value={email} onChange={(e)=>setEmail(e.target.value)} />

          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="mt-2 mb-4 w-full p-3 rounded-lg bg-transparent border border-white/5" value={password} onChange={(e)=>setPassword(e.target.value)} />

          <label className="block text-sm font-medium">Confirm password</label>
          <input type="password" className="mt-2 mb-6 w-full p-3 rounded-lg bg-transparent border border-white/5" value={confirm} onChange={(e)=>setConfirm(e.target.value)} />

          <div className="flex items-center gap-3">
            <button className="btn-primary" type="submit" disabled={isLoading}>{isLoading ? 'Creating…' : 'Create account'}</button>
            <button type="button" className="btn-ghost" onClick={()=>router.push('/login')}>Already have an account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
