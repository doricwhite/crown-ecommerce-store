import "./categories.styles.scss";

const App = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
    },
    {
      id: 2,
      title: "Jackets",
    },
    {
      id: 3,
      title: "Sneakers",
    },
    {
      id: 4,
      title: "Womens",
    },
    {
      id: 5,
      title: "Mens",
    },
  ];

  return (
    /* CONTAINER */
    <div className="categories-container">
      {categories.map(({ title, id }) => {
        return (
          <div className="category-container " key={id}>
            {/* <img /> */}
            <div className="background-image" />
            <div className="category-body-container">
              <h2>{title}</h2>
              <p>Shop Now</p>
            </div>
          </div>
        );
      })}
      {/* CATEGORY CONTAINER #1  */}
    </div>
  );
};

export default App;
