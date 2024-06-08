<script>
// @ts-nocheck

    import Scroller from "@sveltejs/svelte-scroller";
    let count, index, offset, progress;
    let top = 0; 
    let threshold = 0.5;
    let bottom = 1;

    import { base } from "$app/paths";
    import CoinGraph from "./CoinGraph.svelte";
    import ClassifierNotebook from "./Notebook.svelte";

</script>

<svelte:head>
    <title>Visualizing KNN</title>
</svelte:head>

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
                Building the Model
            </li>
            {:else if index > 2}
            <li style="transform: translateY(-37vh);">
                Building the Model
            </li>
            {:else}
            <li>
                Building the Model
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
            <div class="section-content">
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
                <p>
                    Equipped with new visualization techniques from DSC 106 with Jard Wilber, I will be revisiting KNN
                    and build a visualization on real cryptocurrency historical price data from the past year.
                </p>
            </div>
        </section>
        <section>
            <h1>II. Cryptocurrency Classes</h1>
            <div class="section-content">
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
                <CoinGraph />
                <p>
                    Can you guess which category each of the coins belong to? Even with the help of the graph above, 
                    it's hard to tell what sets the categories apart. A KNN model would calculate the distance between
                    distinctive features of a coin and classify them based on their neighbors. Let's build a KNN 
                    classification model that will classify coins as either <b>Layer 1</b> or <b>Meme</b>.
                </p>
            </div>
        </section>
        <section>
            <h1>III. Building the Model</h1>
            <div class="section-content">
                <p>
                    For simplicity, we'll be building our model using the <code>scikit-learn</code> Python machine learning
                    library on Jupyter Notebook. Building a prediction model can quickly get messy with the preprocessing,
                    feature engineering, and training. We will streamline the process by building a model pipeline that'll
                    take the raw data and complete all these steps at once.
                </p>
                <ul>
                    <h4>Model Pipeline: Preprocessing</h4>
                    To build an effective model, we must first preprocess the raw historical price data to ensure it's suitable 
                    for analysis and model training. <br>
                    <br>
                    <li>
                        <b>Standardizing</b><br>
                        One trait of our data is the large differences between the price range of coins 
                        (think Bitcoin vs Dogecoin). This will heavily skew our data to make predictions based on the raw price 
                        of the coins. While this might be helpful, there are many <b>meme</b> coins with higher prices than 
                        <b>layer1</b> coins, and vice versa. In addition, standarized price data can be compared directly, which 
                        give us the ability to anaylze price trends and patterns.
                    </li>
                    <br>
                    <li>
                        <b>Engineering the <i>Relative Strength Index (RSI)</i> Feature</b><br>
                        The Relative Strength Index (RSI) is a popular technical indicator used in financial analysis to measure 
                        the speed and change of price movements. Including this as a feature in our model will create predictions
                        based on not only instantaneous price points, but also the movement of it.
                    </li>
                </ul>
                <p>
                    After the data is ready for analysis, the pipeline will lastly fit and train the KNN model. Take a look below
                    to see how I built the model pipeline and how I implemented the custom preprocessor to calculate the RSI feature.
                </p>
                <ClassifierNotebook notebook='baseline_classifier.html'/>
            </div>
        </section>
        <section>
            <h1>IV. Model Tuning</h1>
            <div class="section-content">
                <p>
                    Our baseline KNN classification model has an average accuracy of 80% when k-fold cross validation is performed.
                    That's not bad at all, considering our baseline model has some limitations:
                </p>
                <ul>
                    <li>
                        <b>Dataset Size</b><br>
                        Our dataset consists of only 20 coins, 10 of each <i>layer1</i> and <i>meme</i> coins, which our model trains
                        with an even smaller subset of. This may cause our model to overfit our dataset and fail to generalize to the
                        population of cryptocurrency in the <i>layer1</i> and <i>meme</i> categories. <br>
                        <br>
                        <span style="font-size: 1.3vw; font-style: italic;">
                            (A consideration for this limitation is that CoinGecko's API restricts free users to only request the past
                            365 days of price data with a limited amount of requests per month and per minute.)
                        </span>
                    </li>
                    <br>
                    <li>
                        <b>Many Hyperparameters</b><br>
                        A significant feature of the KNN model is the <b><i>K</i></b> hyperparameter. The model calculates a quantative distance
                        between objects, in our case coins, and uses the <b><i>K</i></b> most similar coins to predict its category. Depending on
                        the nature of the data, different values of <b><i>K</i></b> are most effective.<br>
                        <br>
                        Another hyperparameter is the <code>window</code> parameter that is used to create the RSI values. A shorter window
                        would make the RSI more sensitive to sudden changes while a longer window would make the RSI more robust. In the 
                        cryptocurrency market, prices tend to jump around very often in a short period of time. Our model can benefit from
                        choosing an effective <code>window</code> value.
                    </li>
                </ul>
                <p>
                    To improve the baseline model, I will add 10 more coins to the dataset. In addition, we can use sklearn's <code>GridSearchCV</code> 
                    to find the most effective combination of hyperparameters by simulating k-fold cross-validation on our model while repeatedly 
                    refitting our model with different combinations of hyperparameters.
                </p>
                <ClassifierNotebook notebook='final_classifier.html'/>
            </div>
        </section>
        <section style="height: 70vw;">
            <h1>V. Demonstration</h1>
            <div class="section-content">

            </div>
        </section>
    </div>
</Scroller>

<style>
    [slot="background"] {
        height: 100vh;
        width: 22vw;
        padding: 1vh 1vw;
        background-color: #ADD3E7;
    }

    nav ol {
        display: flex;
        flex-direction: column;

        list-style-type: upper-roman;
        padding: 0 auto;
        margin: 35vh 0 0 0;
    }

    nav ol li {
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

    .section-content {
        margin: 1vw 8vw 1vw 5vw;
    }

    h1 {
        font-size: 2.5vw;
    }

    p {
        text-indent: 2.5vw;
        font-size: 1.5vw;
        line-height: 1.9vw;
    }

    ul { 
        list-style-position: inside;
        font-size: 1.5vw;
        line-height: 1.8vw;
    }

    code {
        font-size: 1.2vw;
        background-color: #e4e4e4;
        padding: 4px;
        border-radius: 5px;
    }

    img {
        width: 56%;

        margin: 1vw 22%;
    }
</style>