<script>
    import { fade } from "svelte/transition";
    import { preservationContent } from "../data/content.js";
    import {
        activeError,
        simulateError,
        clearError,
    } from "../stores/preservationStore.js";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();
    const digitalVersion = [
        {
            line: "So long as the magnetic flux on this disk has not been disturbed,",
            error: "ERROR: Magnetic flux degradation detected",
        },
        {
            line: "and so long as humans retain the appropriate size and speed disk drives,",
            error: "ERROR: Compatible drive not found",
        },
        {
            line: "and so long as they have hardware controllers and software device drivers",
            error: "ERROR: Device driver incompatible",
        },
        {
            line: "capable of reading the bits from this disk,",
            error: "ERROR: Unable to read bit stream",
        },
        {
            line: "and so long as they have access to the software that encoded the file structure",
            error: "ERROR: File structure unknown",
        },
        {
            line: "and character codes employed in the bit stream of this document,",
            error: "ERROR: Character encoding not recognized",
        },
        {
            line: "and so long as they can still find or recreate the computing environment",
            error: "ERROR: Environment variables missing",
        },
        {
            line: "necessary to run that software,",
            error: "ERROR: Runtime environment not found",
        },
        {
            line: "and so long as they can still breathe or see,",
            error: "System status: Human operator detected",
        },
        {
            line: "So long lives this,...",
            error: "FATAL ERROR: File not found",
        },
    ];

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    dispatch("sectionVisible", {
                        section: "digital",
                    });
                }
            });
        });

        const section = document.querySelector(".digital-version");
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    });

    let mouseX = 0;
    let mouseY = 0;

    function handleMouseMove(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
</script>

<section class="digital-version" data-note-id="digital-complexity">
    <h2 data-note-id="digital-rewrite">Digital: A Modern Translation</h2>
    <div class="digital-manuscript" data-note-id="digital-paradox">
        <div class="metadata-header">
            <div class="file-info">
                <span>File: sonnet18.txt</span>
                <span>Format: UTF-8</span>
                <span>Created: 1995</span>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="preservation-text">
                {#each digitalVersion as line, i}
                    <div
                        class="line-container"
                        on:mouseenter={() => simulateError(i)}
                        on:mouseleave={clearError}
                        on:mousemove={handleMouseMove}
                    >
                        <p class="line">{line.line}</p>
                        {#if $activeError === i}
                            <div
                                class="preservation-note"
                                transition:fade
                                style="left: {mouseX + 10}px; top: {mouseY +
                                    10}px;"
                            >
                                {line.error}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
        <div class="digital-watermark">01001100</div>
    </div>
</section>

<style>
    h2 {
        font-size: 1.8rem;
        font-weight: 300;
        margin-bottom: 2rem;
        color: var(--color-text);
        font-family: var(--font-primary);
    }

    .digital-manuscript {
        background: var(--color-surface);
        padding: 2rem; /* Reduced from 3rem */
        border-radius: 8px;
        position: relative;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        margin: 2rem 0;
        font-family: "Courier New", monospace;
        width: 100%;
    }

    .metadata-header {
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 0.5rem; /* Reduced from 1rem */
        margin-bottom: 1rem; /* Reduced from 2rem */
    }

    .file-info {
        display: flex;
        gap: 2rem;
        color: var(--color-text-secondary);
        font-size: 0.85rem; /* Slightly smaller */
    }

    .preservation-text {
        position: relative;
        z-index: 1;
        padding: 1rem; /* Reduced from 2rem */
    }

    .line-container {
        margin: 0.8rem 0; /* Reduced from 1.8rem */
        position: relative;
        padding: 0.25rem; /* Reduced from 0.5rem */
        border-radius: 4px;
        transition: background-color 0.2s ease;
        cursor: pointer;
    }

    .line {
        font-size: 1rem; /* Slightly smaller */
        line-height: 1.4; /* Reduced from 1.8 */
        color: var(--color-text);
        margin: 0;
    }

    .preservation-note {
        position: fixed;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        color: #fff;
        padding: 0.75rem;
        border-radius: 6px;
        font-size: 0.85rem;
        max-width: 220px;
        box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        z-index: 1000;
        pointer-events: none;
    }

    .digital-watermark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 5rem;
        color: rgba(0, 0, 0, 0.03);
        pointer-events: none;
        font-family: monospace;
    }

    .line-container:hover {
        background: rgba(0, 0, 0, 0.05);
    }
</style>
