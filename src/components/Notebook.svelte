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
        margin: 0 -6vw 0 -3vw;
        padding: 1.5vw 1vw 1.5vw 0;
        box-shadow: 0 0 1vw #ccc;

        background-color: #fcfcfc;
    }
</style>