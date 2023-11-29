export function UserPlantsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateUserPlant(params, () => event.target.reset());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Image URL: <input name="img_url" type="text" />
        </div>
        <div>
          Type: <input name="type_id" type="number" />
        </div>
        <div>
          Zone: <input name="zone_id" type="number" />
        </div>
        <button type="submit">Create Plant</button>
      </form>
    </div>
  );
}
