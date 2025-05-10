import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DetailPage = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error('Error fetching country:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [countryCode]);

  if (loading) return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <span>Loading country data...</span>
    </div>
  );

  // Format currencies
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol || 'N/A'})`).join(', ')
    : 'N/A';

  // Format languages
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <div className="container">
      <Link to="/" className="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>
      
      <div className="detail-container">
        <img
          src={country.flags.svg || country.flags.png}
          alt={country.name.common}
          className="detail-flag"
        />
        
        <div className="detail-content">
          <h1 className="detail-title">{country.name.official}</h1>
          
          <div className="detail-info">
            <div className="info-group">
              <div className="info-item">
                <span className="info-label">Native Name</span>
                <span className="info-value">
                  {country.name.nativeName 
                    ? Object.values(country.name.nativeName)[0].official 
                    : country.name.official}
                </span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Population</span>
                <span className="info-value">{country.population.toLocaleString()}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Region</span>
                <span className="info-value">{country.region || 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Sub Region</span>
                <span className="info-value">{country.subregion || 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Capital</span>
                <span className="info-value">{country.capital?.[0] || 'N/A'}</span>
              </div>
            </div>
            
            <div className="info-group">
              <div className="info-item">
                <span className="info-label">Top Level Domain</span>
                <span className="info-value">{country.tld?.join(', ') || 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Currencies</span>
                <span className="info-value">{currencies}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Languages</span>
                <span className="info-value">{languages}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Area</span>
                <span className="info-value">{country.area?.toLocaleString() || 'N/A'} km²</span>
              </div>
            </div>
          </div>
          
          <div className="history-section">
            <h2 className="section-title">Brief History</h2>
            <p>
              {country.name.common} is located in {country.region} {country.subregion ? `(${country.subregion})` : ''}.
              {country.capital?.[0] 
                ? ` Its capital city is ${country.capital[0]}.` 
                : ' It does not have a designated capital city.'} 
              With a population of {country.population.toLocaleString()} people, 
              it covers an area of {country.area?.toLocaleString() || 'N/A'} square kilometers.
              {/* Add more historical content here */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;