<script>
    import { scale } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { showGrid } from "$lib/stores";
    import Introduction from "./components/Introduction.svelte";
    import PrintVersion from "./components/PrintVersion.svelte";
    import DigitalVersion from "./components/DigitalVersion.svelte";
    import PreservationLayers from "./components/PreservationLayers.svelte";
    import SideContent from "./components/SideContent.svelte";
</script>

<div in:scale={{ duration: 400, start: 0.95 }} class="container">
    <div class="content-wrapper">
        <div class="main-content">
            <Introduction />
            <PrintVersion />
            <DigitalVersion />
            <PreservationLayers />
        </div>
        <SideContent />
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
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        background: var(--color-background);
        color: var(--color-text);
    }

    .content-wrapper {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }

    .main-content {
        padding: 2rem;
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
