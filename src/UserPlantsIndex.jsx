export function UserPlantsIndex(props) {
  return (
    <div>
      <h1>All Plants</h1>
      {props.plants.map((plant) => (
        <div key={plant.id}>
          <h2>{plant.name}</h2>
          <p>{plant.zone_name}</p>
          <p>{plant.type_name}</p>
        </div>
      ))}
    </div>
  );
}
