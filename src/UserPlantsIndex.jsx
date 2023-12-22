export function UserPlantsIndex(props) {
  console.log(props);
  const placeholderImage = "https://i.etsystatic.com/34924524/r/il/cd7edd/4340316619/il_570xN.4340316619_mprg.jpg";
  return (
    <div className="container text-center">
      <h1>All Plants</h1>
      <div className="row g-5">
        {props.plants.map((plant) => (
          <div className="col-sm-4" key={plant.id}>
            <div className="card h-100">
              <img src={plant.img_url ? plant.img_url : placeholderImage} alt="plant image" className="card-img-top" />
              <div className="card-body">
                <h5>{plant.name}</h5>
                <p>
                  <strong>Type: </strong>
                  {plant.type_name}
                </p>
                <p>
                  <strong>Zone: </strong>
                  {plant.zone_name}
                </p>
                <div>
                  <strong>Watering Schedules: </strong>
                  {plant.watering_schedules.map((schedule) => (
                    <p key={schedule.id}>{schedule.schedule}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
