<script>
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
                    >
                        <p class="line">{line.line}</p>
                        <p
                            class="error-message"
                            class:active={$activeError === i}
                        >
                            {line.error}
                        </p>
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
        padding: 2rem;
        border-radius: 8px;
        position: relative;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        margin: 2rem 0;
        font-family: "Courier New", monospace;
        width: 100%;
    }

    .metadata-header {
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
    }

    .file-info {
        display: flex;
        gap: 2rem;
        color: var(--color-text-secondary);
        font-size: 0.85rem;
    }

    .preservation-text {
        position: relative;
        z-index: 1;
        padding: 1rem;
    }

    .line-container {
        margin: 0.8rem 0;
        position: relative;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }

    .line-container:hover {
        background-color: rgba(255, 0, 0, 0.05);
    }

    .line {
        font-size: 1rem;
        line-height: 1.4;
        color: var(--color-text);
        margin: 0;
    }

    .error-message {
        font-size: 0.85rem;
        color: #ff3e3e;
        margin: 0;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .error-message.active {
        max-height: 2em;
        opacity: 1;
        margin-top: 0.5rem;
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
</style>
