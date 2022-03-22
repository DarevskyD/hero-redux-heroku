const HeroesListItem = ({ name, description, element, onDelete }) => {
  let elementClassName;
  let elementUrl;

  switch (element) {
    case "fire":
      elementClassName = "danger";
      elementUrl = "d339b90f-5a89-4e42-aaa5-839140233df7";
      break;
    case "water":
      elementClassName = "primary";
      elementUrl = "d4a4de9c-8164-4c8c-8a6d-a639819997b2";
      break;
    case "wind":
      elementClassName = "info";
      elementUrl = "4a784718-903b-47b0-9ff7-fe6e07abfdba";
      break;
    case "earth":
      elementClassName = "secondary";
      elementUrl = "f33b6015-6091-465a-9187-d994dfc8c655";
      break;
    default:
      elementClassName = "warning";
  }

  const descr =
    description.length < 40
      ? description
      : description.length > 40
      ? `${description.slice(0, 40)}...`
      : null;

  return (
    <div
      className={`card rounded mb-4 shadow text-white bg-${elementClassName} border-${elementClassName}`}
      style={{ width: "11rem", height: "20rem" }}
    >
      <img
        src={`https://astro24.ru/Content/NewsImages/ContentImages/${elementUrl}.png`}
        className="card-img-top"
        alt="unknown hero"
      />

      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{descr}</p>
      </div>
      <span onClick={onDelete} className="position-absolute top-15 end-0">
        <button type="button" className="btn-close"></button>
      </span>
    </div>
  );
};

export default HeroesListItem;
