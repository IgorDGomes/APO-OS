export function UserForm() {
  return (
    <form action={"/api/login/user"} method="post" className="w-full">
      <input
        type="text"
        name="username"
        placeholder="Username"
        autoComplete="off"
        className="text-white placeholder:text-white/70 px-2 py-1 rounded-lg outline-none w-full bg-transparent border border-white/30"
      />
    </form>
  );
}
