<script>
// @ts-nocheck

    import Scroller from "@sveltejs/svelte-scroller";
    let count, index, offset, progress;
    let top = 0; 
    let threshold = 0.5;
    let bottom = 1;

    import { base } from "$app/paths";
    import CoinGraphs from "./CoinGraphs.svelte";

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
        <h1 style="font-size: 1.95vw;">Visualizing Classification: <br> K-Nearest-Neighbors</h1>
        <progress 
            value={progress || 0}
            style="width: 21vw; margin: 0 0.5vw;"
        />
        <ol>
            {#if index == 0}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                Classification With KNN
            </li>
            {:else if index > 0}
            <li style="transform: translateY(-37vh);">
                Classification With KNN
            </li>
            {/if}

            {#if index == 1}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                Cryptocurrency Classes
            </li>
            {:else if index > 1}
            <li style="transform: translateY(-37vh);">
                Cryptocurrency Classes
            </li>
            {:else}
            <li>
                Cryptocurrency Classes
            </li>
            {/if}

            {#if index == 2}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                KNN in Action
            </li>
            {:else if index > 2}
            <li style="transform: translateY(-37vh);">
                KNN in Action
            </li>
            {:else}
            <li>
                KNN in Action
            </li>
            {/if}

            {#if index == 3}
            <li style="transform: translateY(-{offset*37}vh); font-weight: 600; font-size: 1.6vw;">
                Model Tuning
            </li>
            {:else if index > 3}
            <li style="transform: translateY(-37vh);">
                Model Tuning
            </li>
            {:else}
            <li>
                Model Tuning
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
        </ol>
    </nav>
    <div slot="foreground">
        <section>
            <h1>I. Classification With KNN</h1>
            <p>
                When you hear a new song, you can deduce its genre from the genres of other similar songs you
                know. Similarly KNN takes a new data point and classifies it by comparing it to the classes of 
                <i>K</i> most similar data.
            </p>
            <img src="{base}/images/simple_knn.png" alt="simple knn example"/>
            <p>
                I have previously given a presentation on how machine learning and AI works where I chose to
                explain the KNN, K-Nearest-Neighbors, machine learning model. It's an interesting model
                that derives from the human neurological process of recognition and learning. I used a very 
                simple visualizer I found online with 20 points of 2 classes differentiated by color. Although 
                it did the job, it didn't visualize the true strength of machine learning, which is revealed 
                when applied on large datasets with nuanced associations.
            </p>
            <br>
            <p>
                Equipped with new visualization techniques from DSC 106 with Jard Wilber, I will be revisiting KNN
                and build a visualization on real cryptocurrency historical price data from the past year.
            </p>
            <br>
        </section>
        <section>
            <h1>II. Cryptocurrency Classes</h1>
            <p>
                After the boom of cryptocurrency and rise in popularity of NFTs and Meme Stocks/ Meme Coins,
                there is an ever increasing variety in unique crytocurrency categories. If you take a look
                at <a href="https://www.coingecko.com/en/categories" target="_blank" 
                style="color: forestgreen; text-decoration: none;">CoinGecko's Top Crypto Categories</a>, 
                you can see a plethora of cryptocurrency classes.
            </p>
            <p>
                Below is a graph representing historical price data of the <b>Layer 1</b>: <i>Bitcoin, Ethereum, 
                etc</i> – and <b>Meme</b>: <i>the infamous Dogecoin, Shiba-Inu, etc</i> – classes of cryptocurrency.
            </p>
            <CoinGraphs />
            <p>
                Can you guess which category each of the coins belong to? Even with the help of the graph above, 
                it's hard to tell what sets the categories apart. A KNN model would calculate the distance between
                distinctive features of a coin and classify them based on their neighbors. Let's build a KNN 
                classification model that will classify coins as either <b>Layer 1</b> or <b>Meme</b>.
            </p>
            <br>
        </section>
        <section style="height: 70vw;">
            <h1>III. KNN In Action</h1>
            <p>
                For simplicity, we'll be building our model using the <code>scikit-learn</code>
                Python machine learning library on Jupyter Notebook. 
            </p>
            <br>
        </section>
        <section style="height: 70vw;">
            <h1>IV. Model Tuning</h1>

            <br>
        </section>
        <section style="height: 70vw;">
            <h1>V. Demonstration</h1>

            <br>
        </section>
    </div>
</Scroller>

<style>
    [slot="background"] {
        height: 100vh;
        width: 22vw;
        padding: 1vh 1vw;
        /* background-color: #ddffff; */
        background-color: #ADD3E7;
    }

    ol {
        display: flex;
        flex-direction: column;

        list-style-type: upper-roman;
        padding: 0 auto;
        margin: 35vh 0 0 0;
    }

    ol li {
        margin: 6vh 0 0 0;

        font-size: 1.3vw;
    }

    [slot="foreground"] {
        margin-left: 24vw;
    }

    section {
        height: fit-content;
        padding: 1.5vw;
        margin: 0 0 1vh 0;
        outline: 2vh solid #ADD3E7;
    }

    h1 {
        font-size: 2.5vw;
    }

    p {
        margin: 1vw 10vw 1vw 5vw;

        text-indent: 2.5vw;
        font-size: 1.5vw;
        line-height: 2vw;
    }

    code {
        font-size: 1.2vw;
        background-color: #eee;
        padding: 4px;
        border-radius: 5px;
    }

    img {
        width: 33vw;

        margin: 1vw 20vw;
    }
</style>