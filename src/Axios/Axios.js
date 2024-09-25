import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AxiosExample = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/budget'); // Replace with your API endpoint
        console.log(response.data); // Log the response to inspect its structure
        setBudgetData(response.data.myBudget); // Set budget data
        setBarChartData(response.data.barChartData); // Set bar chart data
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>My Budget</h1>
      <ul>
        {Array.isArray(budgetData) ? (
          budgetData.map(item => (
            <li key={item.title}>
              {item.title}: ${item.budget} {/* Display title and budget */}
            </li>
          ))
        ) : (
          <li>No budget data available</li>
        )}
      </ul>

      <h2>Bar Chart Data</h2>
      <ul>
        {Array.isArray(barChartData) ? (
          barChartData.map(item => (
            <li key={item.name}>
              {item.name}: {item.value} {/* Display name and value */}
            </li>
          ))
        ) : (
          <li>No bar chart data available</li>
        )}
      </ul>
    </div>
  );
};

export default AxiosExample;
