<script>
    import { visitedSections } from "$lib/stores";
    import { goto } from "$app/navigation";

    $: visitedCount = Object.values($visitedSections).filter((v) => v).length;

    function handleConclusion() {
        goto("/conclusion");
    }
</script>

<div class="progress-chip">
    {#if visitedCount < 3}
        <!-- Progress Bar -->
        <div class="progress-track">
            <div
                class="progress-bar"
                style="width: {(visitedCount / 3) * 100}%"
            ></div>
        </div>
    {:else}
        <!-- Conclusion Button -->
        <button class="conclusion-button" on:click={handleConclusion}>
            Conclusion
        </button>
    {/if}
</div>

<style>
    .progress-chip {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
    }

    .progress-track {
        width: 200px;
        height: 14px;
        background: var(--color-border);
        border-radius: 7px;
        overflow: hidden;
        position: relative;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .progress-bar {
        height: 100%;
        background: var(--color-accent);
        border-radius: 7px;
        transition: width 0.5s ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
    }

    .conclusion-button {
        background: var(--color-background);
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .conclusion-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
</style>
