<script>
// @ts-nocheck

    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    onMount(() => {
        drawChart();
    });

    function drawChart() {
        const svg = d3.select("#chart")
            .attr("width", 800)
            .attr("heigth", 500);

        const margin = { top: 20, right: 30, bottom: 30, left: 40};
        const width = svg.attr("width") - margin.left - margin.right;
        const height = svg.attr("height") - margin.top - margin.bottom;

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const parseDate = d3.timeParse("%m-%d-%Y");
        
    }
</script>

<svg>

</svg>

<style>

</style>