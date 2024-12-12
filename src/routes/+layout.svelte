<!-- src/routes/+layout.svelte -->
<script>
    import { page } from "$app/stores";
    import { scale } from "svelte/transition";
    import "../app.css";
</script>

{#key $page.url.pathname}
    <div in:scale={{ duration: 400, start: 0.95 }}>
        <slot />
    </div>
{/key}

<link
    href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap"
    rel="stylesheet"
/>
<link
    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap"
    rel="stylesheet"
/>
<link
    href="https://fonts.googleapis.com/css2?family=VT323:wght@400;500&display=swap"
    rel="stylesheet"
/>

<style>
    :global(body) {
        margin: 0;
        font-family: var(--font-primary);
        background: var(--color-background);
        color: var(--color-text);
    }

    :global(*) {
        box-sizing: border-box;
    }
</style>
