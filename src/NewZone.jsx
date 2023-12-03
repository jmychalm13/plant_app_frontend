import axios from "axios";

export function NewType() {
  <div>
    <h1>Add New Zone</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="zone_name">Add Zone Name</label>
      <input type="text" name="type_name" />
      <button type="submit">Add Zone</button>
    </form>
  </div>;
}
