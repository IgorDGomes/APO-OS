export function PassForm() {
  return (
    <form action={"/api/login/pass"} method="post" className="w-full">
      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="off"
        className="text-white placeholder:text-white/70 px-2 py-1 rounded-lg outline-none w-full bg-transparent border border-white/30"
      />
    </form>
  );
}
