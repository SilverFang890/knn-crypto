<script>
// @ts-nocheck

    import * as d3 from 'd3';
    import { onDestroy, onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import graph_coins from './data/graph_coins.json';
    import demo_coins from './data/demo_coins.json';
    import { browser } from '$app/environment';
    
    export let coin;
    let data = graph_coins;
    let formattedData = [];
    const selectedColumns = writable({});
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Store column colors
    let columnColors = {};

    // Set initial dimensions
    let width;
    let height;
    const margin = { top: 0, right: 0, bottom: 40, left: 60 };
    let tooltip;
    
    if (browser) {
        // Initialize selectedColumns store and format data
        onMount(() => {
            const initialSelection = {};
            Object.keys(data).forEach((key, index) => {
                initialSelection[key] = true;
                columnColors[key] = colorScale(key);
            });
            selectedColumns.set(initialSelection);

            formatData();
            updateDimensions();
            createChart();

            // Add event listener for window resize
            window.addEventListener('resize', handleResize);
        });

        // Remove event listener on component destroy
        onDestroy(() => {
            window.removeEventListener('resize', handleResize);
        });
    }

    function updateDimensions() {
        width = window.innerWidth * 0.46;
        height = window.innerWidth * 0.4;

        d3.select('#chart svg')
            .attr('width', width)
            .attr('height', height);
    }

    function handleResize() {
        updateDimensions();
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

        svg.append('text')
            .attr('class', 'x-axis-label')
            .attr('text-anchor', 'end')
            .text('Date');

        svg.append('text')
            .attr('class', 'y-axis-label')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-90)')
            .text('Price ($)');


        tooltip = d3.select('#chart')
            .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0)
                .style('position', 'absolute')
                .style('text-align', 'center')
                .style('width', 'fit-content')
                .style('height', 'fit-content')
                .style('padding', '0.6vw')
                .style('font', '1.2vw sans-serif')
                .style('color', 'white')
                .style('border', '0px')
                .style('border-radius', '5px')
                .style('pointer-events', 'none');
    }
    
    function updateChart(selected) {
        if (Object.keys(data).length === 0) {
            return;
        }

        const svg = d3.select('#chart svg g');
        const t = svg.transition().duration(750);
    
        const x = d3.scaleTime().range([0, width - margin.left - margin.right]);
        const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
    
        const line = d3.line()
            .defined(d => d.value != null) // Filter out invalid points
            .x(d => x(d.date))
            .y(d => y(d.value));
    
        const visibleData = formattedData.filter(d => selected[d.name]);
        const allValues = visibleData.flatMap(d => d.values.filter(v => v.value != null));
    
        if (allValues.length > 0) {
            x.domain(d3.extent(allValues, d => d.date));
            y.domain([0, d3.max(allValues, d => d.value)]);
        } else {
            x.domain([new Date(), new Date()]);
            y.domain([0, 1]);
        }

        svg.select('.x-axis')
            .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
            .transition(t)
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b')));

        svg.select('.y-axis')
            .transition(t)
            .call(d3.axisLeft(y));

        svg.select('.x-axis-label')
            .attr('x', (width - margin.left - margin.right) / 2)
            .attr('y', height - 5)
            .attr('font-size', '1.3vw');

        svg.select('.y-axis-label')
            .attr('x', -((height - margin.top - margin.bottom) / 2))
            .attr('y',  -45)
            .attr('font-size', '1.3vw');
    
        const lines = svg.selectAll('.line')
            .data(visibleData, d => d.name);

        lines.exit()
            .transition(t)
            .attr('d', d => line([]))
            .remove();
    
        lines.enter()
            .append('path')
            .attr('class', 'line')
            .attr('d', d => line(d.values))
            .style('stroke-width', '2.5px')
            .style('stroke', d => colorScale(d.name))
            .style('fill', 'none')
            .merge(lines)
            .transition(t)
            .attr('d', d => line(d.values))
            .style('stroke', d => colorScale(d.name))
            .style('fill', 'none');

        // Add tooltip interactions after merging
        svg.selectAll('.line')
            .on('mouseover', function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`${d.name}`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px')
                    .style('background', colorScale(d.name))
                    .style('z-index', 1);
            })
            .on('mousemove', function(event) {
                tooltip.style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px')
                    .style('background', colorScale(d.name))
                    .style('z-index', 1);
            })
            .on('mouseout', function(d) {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });
    }
</script>

<div id="chart-container">
    <div id="chart"></div>
    <div>
        {#if browser}
            <div id="select">
                {#each Object.entries($selectedColumns) as [column, selected]}
                    <label>
                        <input type="checkbox" bind:checked={$selectedColumns[column]} />
                        <span class="checkbox" style="background-color: {selected ? columnColors[column] : '#ddd'};"></span>
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

        margin: 2vw -0.8vw 0 -2vw;
    }

    #select {
        display: flex;
        flex-direction: column;

        margin-left: 2vw;
    }

    label {
        display: block;
        position: relative;

        width: 20vw;
        padding: 0.2vw 0 0.2vw 1.8vw;

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
        top: 0.2vw;
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
    