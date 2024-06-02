<script>
// @ts-nocheck

    import * as d3 from 'd3';
    import { onDestroy, onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import coin_data from './data/coin_data.json';
    import { browser } from '$app/environment';
  
    let data = coin_data;
    let formattedData = [];
    const selectedColumns = writable({});
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Set initial dimensions
    let width;
    let height;
    const margin = { top: 20, right: 0, bottom: 20, left: 40 };
  
    if (browser) {
        // Initialize selectedColumns store and format data
        onMount(() => {
            const initialSelection = {};
            Object.keys(data).forEach((key, index) => {
                initialSelection[key] = true;
                colorScale.domain(Object.keys(data));
            });
            selectedColumns.set(initialSelection);

            formatData();
            updateDiemensions();
            createChart();

            // Add event listener for window resize
            window.addEventListener('resize', handleResize);
        });

        // Remove event listener on component destory
        onDestroy(() => {
            window.removeEventListener('resize', handleResize);
        });
    }

    function updateDiemensions() {
        width = window.innerWidth * 0.46;
        height = window.innerWidth * 0.4;

        d3.select('#chart svg')
            .attr('width', width)
            .attr('height', height);
    }

    function handleResize() {
        updateDiemensions();
        updateChart($selectedColumns);
    }
  
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
  
    $: if (browser) {
        updateChart($selectedColumns);
    }
  
    function createChart() {
        const svg = d3.select('#chart')
            .append('svg')
                .attr('width', width)
                .attr('height', height)
            .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
    
        svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height - margin.top - margin.bottom})`);
        svg.append('g').attr('class', 'y-axis');
    }
  
    function updateChart(selected) {
        if (Object.keys(data).length === 0) {
            return;
        }

        const svg = d3.select('#chart svg g');
        svg.selectAll('.line').remove();
    
        const x = d3.scaleTime().range([0, width - margin.left - margin.right]);
        const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
    
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

        svg.select('.x-axis')
            .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.select('.y-axis')
            .call(d3.axisLeft(y));
    
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

<div id="chart-container">
    <div id="chart"></div>
    <div>
        {#if browser}
            <div id="select">
                {#each Object.keys($selectedColumns) as column}
                    <label>
                        <input type="checkbox" bind:checked={$selectedColumns[column]} />
                        <span class="checkbox"></span>
                        {column}
                    </label>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    #chart-container {
        display: flex;
    }

    #chart {
        margin: 1vw 4vw 1vw 5vw;
    }

    #select {
        display: flex;
        flex-direction: column;

        padding: 1.5vw 0;
    }

    label {
        display: block;
        position: relative;

        padding: 0.2vw 1.8vw;

        font-size: 1.3vw;
    }

    input {
        position: absolute;
        height: 1.4vw;
        width: 1.4vw;
        opacity: 0;
    }

    .checkbox {
        position: absolute;
        top: 3px;
        left: 0;
        height: 1.4vw;
        width: 1.4vw;
        background-color: #ddd;
    }

    label:hover input ~ .checkbox {
        background-color: #bbb;
    }

    label input:checked ~ .checkbox {
        background-color: #2196F3;
    }

    .checkbox:after {
        content: "";
        position: absolute;
        display: none;
    }

    label input:checked ~ .checkbox:after {
        display: block;
    }

    label .checkbox:after {
        left: 0.43vw;
        top: 0.2vw;
        width: 0.3vw;
        height: 0.6vw;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>