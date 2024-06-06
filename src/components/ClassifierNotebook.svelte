<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import axios from 'axios';

    let notebookHTML = '';

    if (browser) {
        onMount(async () => {
        const response = await axios.get('/classifier_notebook.html');
        notebookHTML = response.data;
        });
    }
</script>

{#if notebookHTML}
    {#if browser}
        <div class="notebook-container">
            {@html notebookHTML}
        </div>
    {/if}
{:else}
    <p>Loading...</p>
{/if}

<style>
    .notebook-container {
        overflow-x: auto;
    }
</style>