<script>
// @ts-nocheck
    import Scroller from "@sveltejs/svelte-scroller";
    let count, index, offset, progress;
    let top = 0; 
    let threshold = 0.5;
    let bottom = 1;

</script>

<Scroller
    {top}
    {threshold}
    {bottom}
    bind:count
    bind:index
    bind:offset
    bind:progress
>
    <nav slot="background">
        <h1>Visualizing Classification: <br> K-Nearest-Neighbors</h1>
        <progress 
            value={progress || 0}
            style="width: 21vw; margin: 0 0.5vw;"
        />
        <ul>
            {#if index == 0}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                What is KNN?
            </li>
            {:else if index > 0}
            <li style="transform: translateY(-37vh);">
                What is KNN?
            </li>
            {/if}

            {#if index == 1}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                Modeling
            </li>
            {:else if index > 1}
            <li style="transform: translateY(-37vh);">
                Modeling
            </li>
            {:else}
            <li>
                Modeling
            </li>
            {/if}

            {#if index == 2}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                Cryptocurrency Classes
            </li>
            {:else if index > 2}
            <li style="transform: translateY(-37vh);">
                Cryptocurrency Classes
            </li>
            {:else}
            <li>
                Cryptocurrency Classes
            </li>
            {/if}

            {#if index == 3}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                KNN in Action
            </li>
            {:else if index > 3}
            <li style="transform: translateY(-37vh);">
                KNN in Action
            </li>
            {:else}
            <li>
                KNN in Action
            </li>
            {/if}

            {#if index == 4}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                Demonstration
            </li>
            {:else}
            <li>
                Demonstration
            </li>
            {/if}
        </ul>
    </nav>
    <div slot="foreground">
        <section>
            <h1>What is KNN?</h1>
            <p>
                KNN, or K-Nearest-Neighbors, is a classification machine learning model.
            </p>
        </section>
        <section>
            <h1>Modeling</h1>
        </section>
        <section>
            <h1>Cryptocurrency Classes</h1>
        </section>
        <section>
            <h1>KNN In Action</h1>
        </section>
        <section>
            <h1>Demonstration</h1>
        </section>
    </div>
</Scroller>

<style>
    [slot="background"] {
        height: 100vh;
        width: 22vw;
        padding: 1vh 1vw;
        background-color: #ddfdfd;
    }

    h1 {
        font-size: 1.95vw;
    }

    ul {
        display: flex;
        flex-direction: column;

        list-style-type: circle;
        padding: 0 auto;
        margin: 35vh 0 0 0;
    }

    ul li {
        margin: 6vh 0 0 0;

        font-size: 1.3vw;
    }

    /* .one {
        transform: translateY(-10px);
    } */

    [slot="foreground"] {
        margin-left: 24vw;
    }

    section {
        height: 110vh;
        padding: 1vw;
        margin: 0 0 1vh 0;
        outline: 2vh solid #ddfdfd;
    }
</style>