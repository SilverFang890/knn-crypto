<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { writable } from 'svelte/store';
  
    let data = {};
    let formattedData = [];
    const selectedColumns = writable({});
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Load data from the local JSON file
    onMount(async () => {
        try {
            const response = await fetch('/data/coin_data.json');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log('Fetched data:', jsonData);
            data = jsonData;
    
            // Initialize selectedColumns store
            const initialSelection = {};
            Object.keys(data).forEach((key, index) => {
            initialSelection[key] = true;
            colorScale.domain(Object.keys(data));
            });
            selectedColumns.set(initialSelection);
    
            formatData();
            createChart();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
  
    function formatData() {
        formattedData = Object.keys(data).map(column => {
            return {
            name: column,
            values: Object.keys(data[column]).map(ms => ({
                date: new Date(+ms),  // Convert milliseconds to Date object
                value: data[column][ms]
            }))
            };
        });
    }
  
    $: updateChart($selectedColumns);
  
    function createChart() {
        // Set the dimensions and margins of the graph
        const margin = { top: 40, right: 60, bottom: 40, left: 60 },
            width = 900 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;
    
        const svg = d3.select('#chart')
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
    
        svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height})`);
        svg.append('g').attr('class', 'y-axis');
    }
  
    function updateChart(selected) {
        if (Object.keys(data).length === 0) {
            return;
        }
  
        const margin = { top: 40, right: 60, bottom: 40, left: 60 },
            width = 900 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;
  
        const svg = d3.select('#chart svg g');
        svg.selectAll('.line').remove();
    
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
    
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));
    
        const visibleData = formattedData.filter(d => selected[d.name]);
        const allValues = visibleData.flatMap(d => d.values);
    
        if (allValues.length > 0) {
            x.domain(d3.extent(allValues, d => d.date));
            y.domain([0, d3.max(allValues, d => d.value)]);
        } else {
            x.domain([new Date(), new Date()]);
            y.domain([0, 1]);
        }
    
        svg.select('.x-axis').call(d3.axisBottom(x));
        svg.select('.y-axis').call(d3.axisLeft(y));
    
        svg.selectAll('.line')
            .data(visibleData)
            .enter()
            .append('path')
            .attr('class', 'line')
            .attr('d', d => line(d.values))
            .style('stroke-width', '2px')
            .style('stroke', d => colorScale(d.name))
            .style('fill', 'none');
    }
</script>
  
<div id="chart"></div>

<div>
    {#each Object.keys($selectedColumns) as column}
        <label>
            <input type="checkbox" bind:checked={$selectedColumns[column]} />
            {column}
        </label>
    {/each}
</div>  

<style>

</style>