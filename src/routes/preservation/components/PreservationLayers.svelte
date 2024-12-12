<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher, onMount } from "svelte";
    import { writable } from "svelte/store";

    const dispatch = createEventDispatcher();

    let layerStates = writable([
        {
            id: "hardware",
            title: "Hardware Layer",
            status: "active",
            message: "Validating physical media access...",
            errorMessage:
                "Critical: Hardware interface incompatibility detected",
            description:
                "The physical infrastructure required for digital preservation encompasses not just storage media, but entire systems of compatible hardware. As Rothenberg demonstrates through examples like NASA's lost data archives, even minor hardware incompatibilities can render content inaccessible.",
        },
        {
            id: "software",
            title: "Software Environment",
            status: "active",
            message: "Initializing runtime environment...",
            errorMessage: "Critical: Software dependency resolution failed",
            description:
                'As Rothenberg notes, digital documents are "held cryptic hostage to their own encoding" through software dependencies. These dependencies may not survive technological change, creating barriers to long-term access.',
        },
        {
            id: "encoding",
            title: "Data Encoding",
            status: "active",
            message: "Analyzing data structure integrity...",
            errorMessage: "Critical: Unknown encoding schema",
            description:
                "The encoding of digital information, as Kirschenbaum argues, introduces levels of complexity absent in traditional media. Each encoding decision creates additional vectors for potential inaccessibility.",
        },
    ]);

    let activeStep = 0;
    let isSimulating = false;
    let buttonText = "Initialize Access Sequence";

    async function simulateAccess() {
        isSimulating = true;
        buttonText = "Processing...";
        activeStep = 0;
        let accessSuccessful = true;

        for (let i = 0; i < $layerStates.length; i++) {
            activeStep = i;
            await new Promise((resolve) => setTimeout(resolve, 1500));

            if ($layerStates[i].status === "failed") {
                accessSuccessful = false;
                break;
            }
        }

        buttonText = accessSuccessful ? "Access Complete" : "Access Failed";

        setTimeout(() => {
            buttonText = "Initialize Access Sequence";
            isSimulating = false;
        }, 2000);
    }

    function toggleLayer(id) {
        layerStates.update((layers) => {
            return layers.map((layer) => {
                if (layer.id === id) {
                    return {
                        ...layer,
                        status: layer.status === "active" ? "failed" : "active",
                    };
                }
                return layer;
            });
        });
    }

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    dispatch("sectionVisible", {
                        section: "layers",
                    });
                }
            });
        });

        const section = document.querySelector(".preservation-layers");
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    });
</script>

<section class="preservation-layers">
    <h2>The Layers of Digital Preservation</h2>

    <p class="section-intro">
        Rothenberg's analysis of digital preservation reveals how accessing
        preserved content requires navigating multiple technological
        dependencies. Each layer represents a potential point of failure in the
        preservation chain.
    </p>

    <div class="visualization-container">
        <div class="layer-path">
            {#each $layerStates as layer, i}
                <div
                    class="layer-node"
                    class:active={i === activeStep}
                    class:passed={i < activeStep}
                    class:failed={layer.status === "failed"}
                    on:click={() => toggleLayer(layer.id)}
                    data-note-id={i === 0 ? "layers-process" : layer.id}
                >
                    <div class="layer-content">
                        <div class="layer-header">
                            <h3>{layer.title}</h3>
                            <div class="layer-status">
                                {#if layer.status === "failed"}
                                    <span class="status-indicator failed"
                                    ></span>
                                    Layer Disabled
                                {:else}
                                    <span class="status-indicator active"
                                    ></span>
                                    Layer Active
                                {/if}
                            </div>
                        </div>

                        <p class="layer-description">{layer.description}</p>

                        {#if i === activeStep && isSimulating}
                            <div
                                class="process-status"
                                transition:fade={{ duration: 200 }}
                            >
                                {layer.status === "active"
                                    ? layer.message
                                    : layer.errorMessage}
                            </div>
                        {/if}
                    </div>

                    {#if i < $layerStates.length - 1}
                        <div
                            class="connector"
                            class:active={i < activeStep}
                        ></div>
                    {/if}
                </div>
            {/each}
        </div>

        <button
            class="access-button"
            class:processing={isSimulating}
            class:success={buttonText === "Access Complete"}
            class:failed={buttonText === "Access Failed"}
            on:click={simulateAccess}
            disabled={isSimulating}
        >
            <span>{buttonText}</span>
        </button>
    </div>
</section>

<style>
    .preservation-layers {
        margin: 4rem 0;
        padding: 0 2rem;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 300;
        margin-bottom: 2rem;
        color: var(--color-text);
        font-family: var(--font-primary);
    }

    p {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--color-text);
    }

    .section-intro {
        max-width: 800px;
        margin: 2rem 0 4rem;
        line-height: 1.6;
        color: var(--color-text);
    }

    .visualization-container {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .access-button {
        background: var(--color-surface);
        color: var(--color-text);
        border: 2px solid transparent;
        padding: 1rem 2rem;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 4rem;
        min-width: 300px;
    }

    .access-button:not(:disabled):hover {
        border-color: var(--color-primary);
    }

    .access-button.processing {
        border-color: var(--color-text);
        animation: pulse 1.5s infinite;
    }

    .access-button.success {
        border-color: var(--color-success);
    }

    .access-button.failed {
        border-color: var(--color-error);
    }

    @keyframes pulse {
        0% {
            border-color: var(--color-text);
        }
        50% {
            border-color: transparent;
        }
        100% {
            border-color: var(--color-text);
        }
    }

    .layer-path {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .layer-node {
        width: 100%;
        min-height: 120px;
        position: relative;
        cursor: pointer;
    }

    .layer-content {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-left: 4px solid var(--color-primary);
        border-radius: 4px;
        padding: 1.5rem;
        transition: all 0.2s ease;
    }

    .layer-node:hover .layer-content {
        transform: translateX(8px);
    }

    .layer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .layer-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
        font-family: var(--font-mono);
        color: var(--color-text-secondary);
    }

    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status-indicator.active {
        background: var(--color-success);
    }

    .status-indicator.failed {
        background: var(--color-error);
    }

    h3 {
        margin: 0;
        font-size: 1.1rem;
        color: var(--color-text);
    }

    .layer-description {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .process-status {
        margin-top: 1rem;
        padding: 0.75rem;
        background: var(--color-background);
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 0.85rem;
        color: var(--color-text-secondary);
    }

    .connector {
        position: absolute;
        left: 50%;
        bottom: -3rem;
        transform: translateX(-50%);
        width: 2px;
        height: 2rem;
        background: var(--color-border);
        transition: background-color 0.2s ease;
    }

    .connector.active {
        background: var(--color-primary);
    }
</style>
