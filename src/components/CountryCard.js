import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="country-card"
    >
      <img
        src={country.flags.png}
        alt={country.name.common}
        className="country-flag"
      />
      <div className="country-info">
        <h3 className="country-name">{country.name.common}</h3>
      </div>
    </Link>
  );
};

export default CountryCard;