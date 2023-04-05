import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import Tire2Data from './../resources/tire2jobsData.json';

interface Company {
  org_name: string;
  town: { City: string };
  county: string;
  type_and_rating: string;
  route: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const companiesPerPage = 10;

  const filteredData = (Tire2Data as Company[]).filter((company) => {
    const nameMatch = company.org_name.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = company.town.City.toLowerCase().includes(locationQuery.toLowerCase());
    return nameMatch && locationMatch;
  });

  const pageCount = Math.ceil(filteredData.length / companiesPerPage);
  const startIndex = (currentPage - 1) * companiesPerPage;
  const endIndex = startIndex + companiesPerPage;
  const currentCompanies = filteredData.slice(startIndex, endIndex);

  const handleSearchChange = (event : any) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (event: any) => {
    setLocationQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search companies"
          className={styles.searchInput}
        />
      </div>
      <div>
        <input
          type="text"
          value={locationQuery}
          onChange={handleLocationChange}
          placeholder="Filter by location"
          className={styles.searchInput}
        />
      </div>
      <div className={styles.companyList}>
        {currentCompanies.map((company, index) => (
          <div key={startIndex + index} className={styles.companyItem}>
            <h1>{company.org_name}</h1>
            <p>{company.town.City}</p>
            <p>{company.county}</p>
            <p>{company.type_and_rating}</p>
            <p>{company.route}</p>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? styles.activePage : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
