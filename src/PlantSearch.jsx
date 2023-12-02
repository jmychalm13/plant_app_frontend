import axios from "axios";

export function PlantSearch() {
  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData(event.target);
    axios.post("http://localhost:3000/details.json", formData).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="input-group">
      <form onSubmit={handleSubmit} className="form-outline">
        <input type="search" id="form1" className="form-control" name="name" />
        <label className="form-label" htmlFor="form1">
          Search
        </label>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
