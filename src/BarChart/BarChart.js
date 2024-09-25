// BarChart.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from 'd3';

const BarChart = () => {
  useEffect(() => {
    getBarChartData();
  }, []);

  const createBarChart = (data) => {
    // Set dimensions and margins for bar chart
    const margin = { top: 20, right: 20, bottom: 60, left: 70 },
      width = 400 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    // Remove any existing SVG
    select('#bar-chart').selectAll('*').remove();

    // Create SVG container for bar chart
    const svg = select('#bar-chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set X and Y scales
    const x = scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.2);

    const y = scaleLinear()
      .domain([0, max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    // Append X axis
    const xAxisGroup = svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x));

    // X axis label
    svg.append('text')
      .attr('class', 'axis-label')
      .attr('x', width / 2)
      .attr('y', height + 30)
      .attr('text-anchor', 'middle')
      .text('Subjects');

    // Append Y axis
    const yAxisGroup = svg.append('g')
      .attr('class', 'y-axis')
      .call(axisLeft(y).ticks(5));

    // Add Y axis label
    svg.append('text')
      .attr('class', 'axis-label')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 40)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Marks');

    // Append bars
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#4e79a7');
  };

  const getBarChartData = () => {
    axios.get('http://localhost:4000/bar-chart-data') // Adjust the endpoint if needed
      .then((res) => {
        console.log(res.data);
        createBarChart(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div id="bar-chart" style={{ width: '400px', height: '200px' }}></div>
  );
};

export default BarChart;
