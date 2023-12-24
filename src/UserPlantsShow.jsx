export function UserPlantsShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <h2>{props.plant.name}</h2>
      <h5>{props.plant.type_name}</h5>
      <h3>Edit Plant</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          Image: <input type="text" className="form-control" name="img_url" defaultValue={props.plant.img_url} />
        </div>
        <div className="form-group">
          Zone:
          {/* To Do: Figure out dropdowns in Modal */}
        </div>
      </form>
    </div>
  );
}
