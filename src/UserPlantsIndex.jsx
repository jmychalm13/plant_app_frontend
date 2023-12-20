export function UserPlantsIndex(props) {
  const placeholderImage = "https://i.etsystatic.com/34924524/r/il/cd7edd/4340316619/il_570xN.4340316619_mprg.jpg";
  return (
    <div>
      <h1>All Plants</h1>
      <div className="row g-5">
        {props.plants.map((plant) => (
          <div className="col-sm-4" key={plant.id}>
            <div className="card">
              <img src={plant.img_url ? plant.img_url : placeholderImage} alt="plant image" className="card-img-top" />
              <div className="card-body">
                <h5>{plant.name}</h5>
                <p>{plant.type_name}</p>
                <p>{plant.zone_name}</p>
                <p>{plant.type_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
