import { useState, useEffect } from 'react';
import axios from 'axios';
import purePajinate from '../components/purePajinate';
import CountryCard from './CountryCard';
import { useWindowSize } from '../hooks/useWindowSize';
import '../styles.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [paginationInstance, setPaginationInstance] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        // Sort countries alphabetically
        const sortedCountries = response.data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    // Initialize pagination after countries are loaded and DOM is ready
    if (!loading && countries.length > 0) {
      const initPagination = () => {
        // Configure pagination based on window size
        let itemsPerPage = 20; // Default
        let pageLinksToDisplay = 5; // Default
        let startPage = 1;

        if (windowSize.width > 1600) {
          itemsPerPage = 20;
          pageLinksToDisplay = 5;
        } else if (windowSize.width > 1230) {
          itemsPerPage = 15;
          pageLinksToDisplay = 5;
        } else if (windowSize.width > 980) {
          itemsPerPage = 12;
          pageLinksToDisplay = 5;
        } else if (windowSize.width > 750) {
          itemsPerPage = 9;
          pageLinksToDisplay = 4;
        } else if (windowSize.width > 510) {
          itemsPerPage = 6;
          pageLinksToDisplay = 3;
        } else {
          itemsPerPage = 4;
          pageLinksToDisplay = 1;
        }

        // Initialize pagination
        const gallery = new purePajinate({
          containerSelector: '.countries-grid',
          itemSelector: '.country-card-wrapper',
          navigationSelector: '.pagination',
          itemsPerPage: itemsPerPage,
          pageLinksToDisplay: pageLinksToDisplay,
          startPage: startPage,
          showFirstLast: true,
          navLabelPrev: '&nbsp;&nbsp;&nbsp;',
          navLabelNext: '&nbsp;&nbsp;&nbsp;',
          navLabelFirst: '&nbsp;&nbsp;&nbsp;',
          navLabelLast: '&nbsp;&nbsp;&nbsp;',
        });

        setPaginationInstance(gallery);
      };

      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(initPagination, 100);
    }
  }, [loading, countries, windowSize]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    try {
      setLoading(true);
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${searchTerm}`
      );
      setCountries(response.data);
    } catch (error) {
      alert('Country not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <span>Loading countries...</span>
    </div>
  );

  return (
    // <div>
    <div id="about"> 
      <div className="search-container">
        <div className="container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for a country..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="search-button"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      
      <div className="container">
        <div className="countries-grid">
          {countries.map((country) => (
            <div key={country.cca3} className="country-card-wrapper">
              <CountryCard country={country} />
            </div>
          ))}
        </div>
        <div className="pagination"></div>
      </div>
    </div>
  );
};

export default Home;