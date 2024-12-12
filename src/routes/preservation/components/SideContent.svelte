<script>
    import { fade } from "svelte/transition";
    import { preservationContent } from "../data/content.js";
    import { onMount } from "svelte";

    const allNotes = preservationContent.sideNotes;
    let notePositions = {};
    const NOTE_HEIGHT = 200; // Base height of each note
    const NOTE_BUFFER = 80; // Additional spacing between notes

    function calculateNotePositions() {
        let currentPosition = 0;

        allNotes.forEach((note) => {
            const referenceElement = document.querySelector(
                `[data-note-id="${note.id}"]`,
            );
            if (referenceElement) {
                const rect = referenceElement.getBoundingClientRect();
                const scrollTop = window.scrollY;
                const proposedPosition = rect.top + scrollTop;

                // Ensure minimum spacing between notes
                if (currentPosition > 0) {
                    currentPosition = Math.max(
                        currentPosition + NOTE_HEIGHT + NOTE_BUFFER,
                        proposedPosition,
                    );
                } else {
                    currentPosition = proposedPosition;
                }

                notePositions[note.id] = currentPosition;
                currentPosition = currentPosition; // Update for next note
            }
        });
        notePositions = { ...notePositions };
    }

    onMount(() => {
        calculateNotePositions();

        // Debounce the scroll handler
        let scrollTimeout;
        const handleScroll = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(calculateNotePositions, 10);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", calculateNotePositions);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", calculateNotePositions);
        };
    });
</script>

<div class="side-content">
    {#each allNotes as note}
        <div class="side-note" style="top: {notePositions[note.id]}px">
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <cite>{note.source}</cite>
        </div>
    {/each}
</div>

<style>
    .side-content {
        position: relative;
        width: 300px;
        min-height: 100%;
    }

    .side-note {
        position: absolute;
        left: 1.5rem;
        right: 1.5rem;
        background: var(--color-surface);
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px var(--color-shadow);
        transition: top 0.3s ease;
    }

    .side-note h4 {
        margin: 0 0 0.5rem 0;
        color: var(--color-primary);
        font-size: 1.1rem;
    }

    .side-note p {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .side-note cite {
        display: block;
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        font-style: italic;
        margin-top: 0.5rem;
    }
</style>
