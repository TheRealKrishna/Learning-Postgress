import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="blob">
        <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#g)" transform="translate(0,0) rotate(12 600 300)" />
        </svg>
      </div>

      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid hero-grid grid-cols-[1fr_420px] gap-10 items-center">
          <section>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold bg-linear-to-tr from-purple-600 to-cyan-400 shadow-xl">PG</div>
              <div>
                <div className="text-sm text-slate-300 font-semibold">My Postgres Lab</div>
                <div className="text-xs text-slate-400">Personal project — learning PostgreSQL while building</div>
              </div>
            </div>

            <h1 className="mt-8 text-4xl sm:text-5xl font-extrabold leading-tight">A personal Postgres lab — sign up and manage your data</h1>
            <p className="mt-4 text-slate-300 max-w-xl">This is my personal project for learning PostgreSQL. Create an account, sign in, and manage your own data (CRUD) — everything you do is stored in your account.</p>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/signup" className="btn-primary">Get Started — Signup</Link>
              <Link href="/login" className="btn-ghost">Sign in</Link>
            </div>

            <div className="mt-8 glass p-6 rounded-2xl max-w-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">What this is</div>
                  <div className="text-xs text-slate-300 mt-1">A personal lab where you can create an account and manage your own data — build features and learn SQL along the way.</div>
                </div>
                <div className="text-xs text-slate-200">Private by default</div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-cyan-400 mt-1" />
                  <div>
                    <div className="font-semibold">Account CRUD</div>
                    <div className="text-xs text-slate-300">Create, read, update and delete your personal items.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-cyan-400 mt-1" />
                  <div>
                    <div className="font-semibold">Prisma-powered</div>
                    <div className="text-xs text-slate-300">Type-safe client for database interactions.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-cyan-400 mt-1" />
                  <div>
                    <div className="font-semibold">Experiment & Learn</div>
                    <div className="text-xs text-slate-300">Try queries, migrations, and see how data changes in your account.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="relative">
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-linear-to-tr from-purple-500 to-cyan-400" />
                <div>
                  <div className="font-semibold">Demo User</div>
                  <div className="text-xs text-slate-300">you@example.com</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/3 text-center">
                  <div className="text-lg font-bold">12</div>
                  <div className="text-xs text-slate-300">Queries</div>
                </div>
                <div className="p-3 rounded-lg bg-white/3 text-center">
                  <div className="text-lg font-bold">3</div>
                  <div className="text-xs text-slate-300">Migrations</div>
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-300">Tip: open Prisma Studio with <code>npx prisma studio</code> to explore tables visually.</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
