export function RegisterPage() {
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
      <button type="submit">Register</button>
    </form>
  );
}
