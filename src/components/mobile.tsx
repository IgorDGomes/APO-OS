import { MonitorIcon } from "lucide-react";

export function Mobile() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 text-white">
      <section className="w-full max-w-md text-center">
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <MonitorIcon className="size-8 text-[#7beaf0]" />
        </div>

        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#7beaf0]">
          Screen too small
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          A bigger screen is needed
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-slate-400">
          This experience is designed for larger screens. Open it on a desktop
          or laptop to continue.
        </p>

        <div className="mt-8 rounded-xl border border-white/10 bg-[#7beaf0]/5 px-5 py-4">
          <p className="text-sm text-slate-300">
            Already on a computer?
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try maximizing your browser window.
          </p>
        </div>
      </section>
    </main>
  );
}
