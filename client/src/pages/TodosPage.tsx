export function TodosPage() {
  return (
    <div>
      <ul>
      </ul>
      <form>
        <label htmlFor="new-todo">New todo</label>
        <input id="new-todo" type="text" name="content" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
