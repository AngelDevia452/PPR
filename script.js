const { useState } = React;

const App = () => {
  const [city, setCity] = useState('');
  const [cityInfo, setCityInfo] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    const cityName = city;
    // 1. Create a variable to store the result, initially null
    let found = null;

    // 2. Use a for...of loop to traverse (go through) the list
    for (let currentCity of cityList) {
      // 3. Selection (if statement) to check if the name matches
      if (currentCity.name.toLowerCase() === cityName.toLowerCase()) {
        found = currentCity;
      }
    }

    // 4. Update state based on what we found
    if (found) {
      setCityInfo(found);
      setError('');
    } else {
      setCityInfo(null);
      setError(`No information found for "${cityName}". Here are some valid options:`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app-container">
      <h1>Massachusetts City Search</h1>
      
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a city name..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <div className="city-list">
            {cityList.map(cityItem => (
              <button
                key={cityItem.name}
                className="city-option"
                onClick={() => {
                  setCity(cityItem.name);
                  setCityInfo(cityItem);
                  setError('');
                }}
              >
                {cityItem.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {cityInfo && (
        <div className="city-info">
          <h2>{cityInfo.name}</h2>
          <img src={cityInfo.image} alt={cityInfo.name} className="city-image" />
          <p><strong>Location:</strong> {cityInfo.location}</p>
          <p><strong>Description:</strong> {cityInfo.description}</p>
          {cityInfo.attractions && (
            <div className="attractions">
              <strong>Attractions:</strong>
              <ul>
                {cityInfo.attractions.map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const cityList = [
  {
    name: "Boston",
    location: "42.3601° N, 71.0589° W",
    description: "Boston is the capital and largest city of Massachusetts. People here are known for their rich history, intellectual culture, and passion for sports.",
    image: "https://media.istockphoto.com/id/469769544/photo/sailing-in-boston.jpg?s=612x612&w=0&k=20&c=A5UjbfraYncMpb77w1ShUH1CiyWB-LEvWU3Nq0nV9fc="
  },
  {
    name: "Cambridge",
    location: "42.3736° N, 71.1097° W",
    description: "Cambridge is home to two of the world's top universities, Harvard and MIT. The people here are highly educated and engaged in innovation.",
    image: "https://media.istockphoto.com/id/131542008/photo/harvard-university.jpg?s=612x612&w=0&k=20&c=qMqWUMuSk1yYazi9Myrjnj6V_mUmfEgPLRNPWfAImHA="
  },
  {
    name: "Springfield",
    location: "42.1015° N, 72.5898° W",
    description: "Springfield is known for being the birthplace of basketball. The residents are friendly and have a strong sense of community.",
    image: "https://media.istockphoto.com/id/1370583156/photo/downtown-springfield-massachusetts-from-west-springfield-with-connecticut-river-aerial.jpg?s=612x612&w=0&k=20&c=MDXoR-axwY9p2Kjahw6U_BXfd8v8yI4cRuSudjDyJ8w="
  },
  {
    name: "Acton",
    location: "42.4958° N, 71.4429° W",
    description: "Acton is known for its excellent public schools and family-friendly atmosphere.",
    image: "https://media.istockphoto.com/id/2189692400/photo/autumn-city-in-the-evening.jpg?s=612x612&w=0&k=20&c=zFmDrOA7PRjCd7RDK5ykLGC8BlJsDPWG7I3qKp3hQi4="
  },
  {
    name: "Arlington",
    location: "42.4153° N, 71.1523° W",
    description: "Arlington is a suburban community with a rich history dating back to the American Revolution.",
    image: "https://media.istockphoto.com/id/1227400032/photo/view-of-arlington-street-church-from-boston-public-garden-public-garden-is-a-large-park-in.jpg?s=612x612&w=0&k=20&c=IYI8Bep-ZkXchaCY_Q6QV-QFI3veDL2xOIXRYc1vbw4="
  },
  {
    name: "Ashland",
    location: "42.2808° N, 71.5205° W",
    description: "Ashland offers a small-town feel with easy access to Boston.",
    image: "https://media.istockphoto.com/id/1321207142/photo/chequamegon-bay-and-the-ashland-marina-on-lake-superior-during-a-summer-twilight.jpg?s=612x612&w=0&k=20&c=use88MDmh6se08VsxrQfKaDh9Hpcwm8fPX2ZWplNyhM="
  },
  {
    name: "Lowell",
    location: "42.6397° N, 71.3145° W",
    description: "Lowell is a city in northeastern Massachusetts, located at the junction of the Merrimack and Concord rivers. It became a major center for textile manufacturing during the Industrial Revolution.",
    attractions: [
      "Lowell National Historical Park",
      "Boott Cotton Mills Museum",
      "Merrimack Repertory Theatre",
      "New England Quilt Museum"
    ],
    image: "https://media.istockphoto.com/id/508627387/photo/autumn-in-lowell.jpg?s=612x612&w=0&k=20&c=aiwLuzmL2P0ijTzPDdACCiVefHuCEif0UGw8HOtGOuc="
  }
];

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);