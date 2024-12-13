<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { showGrid } from "$lib/stores";
    import { fade } from "svelte/transition";

    const quote = "What is a book?";
    let displayText = quote;
    let binaryGrid = [];

    function textToBinary(text) {
        return text.split("").map((char, index) => ({
            id: index,
            char: char,
            binary: char.charCodeAt(0).toString(2).padStart(8, "0").split(""),
            changed: false,
            pulseColor: null,
        }));
    }

    function flipBit(charIndex, bitIndex) {
        const char = binaryGrid[charIndex];
        char.binary[bitIndex] = char.binary[bitIndex] === "0" ? "1" : "0";
        char.changed = true;
        char.pulseColor = `hsl(${Math.random() * 360}, 70%, 60%)`;

        try {
            const newChar = String.fromCharCode(
                parseInt(char.binary.join(""), 2),
            );
            displayText =
                displayText.substring(0, charIndex) +
                newChar +
                displayText.substring(charIndex + 1);
        } catch {
            displayText =
                displayText.substring(0, charIndex) +
                "�" +
                displayText.substring(charIndex + 1);
        }

        setTimeout(() => {
            char.pulseColor = null;
            binaryGrid = [...binaryGrid];
        }, 1000);

        binaryGrid = [...binaryGrid];
    }

    onMount(() => {
        binaryGrid = textToBinary(quote);
    });
</script>

<section class="academic-section">
    <h1 data-note-id="digital-decay">Digital Decay</h1>

    <p class="lead">
        Though digital technology promises perfect reproduction and eternal
        preservation, it introduces new vulnerabilities that can render content
        inaccessible. The layers of hardware, software, and interfaces upon
        which digital media rely can fail, highlighting the paradox at the heart
        of digital preservation.
    </p>

    <!-- Visualization (unchanged) -->
    <div class="demonstration-container">
        <div class="text-display">
            {#each displayText.split("") as char, i}
                <span
                    class="character"
                    class:changed={binaryGrid[i]?.changed}
                    style="color: {binaryGrid[i]?.pulseColor || 'inherit'}"
                >
                    {char}
                </span>
            {/each}
        </div>

        <div class="binary-grid">
            {#each binaryGrid as char, charIndex}
                <div class="char-bits">
                    {#each char.binary as bit, bitIndex}
                        <button
                            class="bit"
                            class:changed={char.changed}
                            style="color: {char.pulseColor || 'inherit'}"
                            on:click={() => flipBit(charIndex, bitIndex)}
                        >
                            {bit}
                        </button>
                    {/each}
                </div>
            {/each}
        </div>
    </div>

    <div class="subtext">
        Click any binary digit (0 or 1) to see how altering a single bit can
        corrupt digital text.
    </div>

    <div class="content-block">
        <p>
            While digital content feels intangible, it is grounded in physical
            media that require specific technologies to access. As Kirschenbaum
            explores through works like Agrippa, the materiality of digital
            objects means they are both easily replicated and uniquely fragile.
            Each character above is represented by eight bits; changing just one
            can corrupt the character entirely. This demonstrates how digital
            texts are vulnerable at their most basic level.
        </p>

        <blockquote>
            Old bit streams never die—they just become unreadable.
            <footer>- Rothenberg</footer>
        </blockquote>

        <p>
            Rothenberg highlights the fragility of digital media through this
            fundamental paradox. The dependencies on hardware, software, and
            file formats create what he terms "layers of potential failure."
            Over time, storage media degrade, software becomes obsolete, and
            interfaces evolve, making access to digital content increasingly
            precarious. As Kirschenbaum argues, this demonstrates how the very
            mechanisms intended to preserve digital information can lead to its
            inaccessibility.
        </p>
    </div>

    <div class="navigation-button-container">
        <button
            class="navigation-button"
            on:click={() => {
                showGrid.set(true);
                goto("/", { replaceState: true });
            }}
        >
            ← Back
        </button>
    </div>
</section>

<style>
    .academic-section {
        margin: 4rem auto;
        max-width: 800px;
        padding: 0 1rem;
    }

    h1 {
        font-size: 2.5rem;
        font-weight: 300;
        margin-bottom: 2rem;
        font-family: var(--font-primary);
        text-align: center;
    }

    .lead {
        font-size: 1.3rem;
        line-height: 1.6;
        color: var(--color-text-secondary);
        margin-bottom: 2rem;
    }

    blockquote {
        border-left: 3px solid #666;
        padding-left: 1.5rem;
        margin: 1.5rem 0;
        font-style: italic;
        color: #666;
        text-align: center;
    }

    blockquote footer {
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }

    .demonstration-container {
        background: var(--color-surface);
        padding: 3rem;
        border-radius: 8px;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        margin: 4rem auto;
        max-width: 800px;
    }

    .text-display {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 3rem;
        min-height: 3rem;
        font-family: var(--font-mono);
        color: var(--color-text);
        word-break: break-word;
    }

    .character {
        display: inline-block;
        transition: all 0.3s ease;
        padding: 0 2px;
    }

    .character.changed {
        transform: scale(1.1);
    }

    .binary-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }

    .char-bits {
        display: flex;
        gap: 3px;
        padding: 0.5rem;
        background: var(--color-background);
        border-radius: 6px;
    }

    .bit {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-mono);
        font-size: 1rem;
        background: none;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--color-text-secondary);
    }

    .bit:hover {
        color: var(--color-primary);
        transform: scale(1.1);
        border-color: var(--color-primary);
    }

    .subtext {
        text-align: center;
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        margin: 1rem auto 2rem;
        max-width: 600px;
    }

    .content-block {
        margin: 2rem auto;
        max-width: 700px; /* Constrain the width */
        text-align: left;
    }

    .content-block p {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--color-text);
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .demonstration-container {
            padding: 2rem;
        }

        .text-display {
            font-size: 1.5rem;
        }

        .bit {
            width: 24px;
            height: 24px;
            font-size: 0.9rem;
        }
    }
    .navigation-button-container {
        padding: 1rem;
        text-align: center;
        margin: 2rem auto;
    }

    .navigation-button {
        background: var(--color-background);
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .navigation-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
</style>
