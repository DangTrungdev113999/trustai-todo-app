export function LoginPage() {
  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
