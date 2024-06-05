<script>
    import { onMount } from 'svelte';
    import axios from 'axios';

    let notebookHTML = '';

    onMount(async () => {
    const response = await axios.get('/classifier_notebook.html');
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
    overflow-x: auto;
  }
</style>