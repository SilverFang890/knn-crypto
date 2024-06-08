<script>
    import { onMount } from 'svelte';
    import { base } from "$app/paths";
    import axios from 'axios';

    export let notebook;

    let notebookHTML = '';

    onMount(async () => {
        const response = await axios.get(`${base}/${notebook}`);
        notebookHTML = response.data;
    });
</script>

{#if notebookHTML}
    <div class="notebook-container">
        {@html notebookHTML}
    </div>
{:else}
    <p>Loading...</p>
{/if}

<style>
    .notebook-container {
        height: 85vh;
        overflow-y: scroll;

        margin: 0 -5vw 0 -2vw;
        padding: 1vw 1vw 1vw 0;
        box-shadow: 0 0 1.5vw #ccc;

        background-color: #fcfcfc;
    }
</style>