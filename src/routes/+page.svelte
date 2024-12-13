<script>
    import { onMount, tick } from "svelte";
    import { fade, scale } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { visitedSections, allSectionsVisited, showGrid } from "$lib/stores";
    import ProgressChip from "$lib/components/ProgressChip.svelte";

    const sections = [
        {
            id: "preservation",
            title: "Preservation",
            path: "/preservation",
        },
        {
            id: "interface",
            title: "Interface",
            path: "/interface",
        },
        {
            id: "decay",
            title: "Decay",
            path: "/decay",
        },
    ];

    function enterSite() {
        $showGrid = true;
        goto("/?view=grid", { replaceState: true });
    }

    function navigateToVisualization(path) {
        goto(path);
    }

    const logos = [
        { id: "glitch" },
        { id: "terminal" },
        { id: "error" },
        { id: "decay" },
        { id: "manuscript" },
        { id: "book" },
    ];

    const cards = Array(9)
        .fill()
        .map((_, i) => ({
            id: `visualization-${i + 1}`,
            title: `Visualization ${i + 1}`,
        }));

    let currentLogoIndex = 0;
    let interval;

    // Variable to track the interval for logo rotation
    onMount(() => {
        if (!$showGrid) {
            interval = setInterval(() => {
                currentLogoIndex = (currentLogoIndex + 1) % logos.length;
            }, 5000);
        }
        return () => {
            clearInterval(interval);
            if (decayInterval) clearInterval(decayInterval);
            if (restoreInterval) clearInterval(restoreInterval);
            if (interfaceInterval) clearInterval(interfaceInterval);
        };
    });

    function handleKeydown(event) {
        if (event.key === "Enter" || event.key === " ") {
            enterSite();
        }
    }

    // List of fonts to cycle through for the decay logo (from the initial code)
    const decayFonts = [
        "'VT323', monospace",
        "'Courier New', monospace",
        "'Lucida Console', monospace",
        "'Annie Use Your Telescope', cursive",
        "'Orbitron', sans-serif",
        "'Bungee', cursive",
    ];

    // Function to get a random font from the list
    function getRandomFont() {
        return decayFonts[Math.floor(Math.random() * decayFonts.length)];
    }

    // Function to change fonts randomly (from the initial code)
    async function randomizeFonts() {
        while (!$showGrid && logos[currentLogoIndex].id === "decay") {
            await tick();
            document.querySelectorAll(".decay-logo .char").forEach((char) => {
                char.style.fontFamily = getRandomFont();
            });
            await new Promise((r) => setTimeout(r, 500)); // Change every 500ms (slower)
        }
    }

    // Call randomizeFonts whenever the decay logo is shown
    $: if (logos[currentLogoIndex].id === "decay") {
        randomizeFonts();
    }

    // Interface Card Logic
    let currentStageIndex = 0;
    const stages = ["cli", "win95", "modern"];
    let interfaceInterval = null;

    function startLoop() {
        if (!interfaceInterval) {
            interfaceInterval = setInterval(() => {
                currentStageIndex = (currentStageIndex + 1) % stages.length;
            }, 2000); // Change every 2 seconds
        }
    }

    function stopLoop() {
        if (interfaceInterval) {
            clearInterval(interfaceInterval);
            interfaceInterval = null;
        }
    }

    // Decay Card Logic
    const originalText = "DECAY";
    let displayedText = originalText.split("");

    let decayInterval = null;
    let restoreInterval = null;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    function startDecay() {
        if (!decayInterval) {
            decayInterval = setInterval(() => {
                displayedText = displayedText.map((char, index) => {
                    // Increase decay intensity when hovered
                    if (Math.random() < 0.5) {
                        return getRandomCharacter();
                    } else {
                        return char;
                    }
                });
            }, 100);
        }
    }

    function stopDecay() {
        if (decayInterval) {
            clearInterval(decayInterval);
            decayInterval = null;
        }
        // Start restoring the text
        if (!restoreInterval) {
            restoreInterval = setInterval(() => {
                displayedText = displayedText.map((char, index) => {
                    if (char !== originalText[index]) {
                        // Gradually restore characters
                        return Math.random() < 0.2
                            ? originalText[index]
                            : getRandomCharacter();
                    } else {
                        return char;
                    }
                });
                // Check if fully restored
                if (displayedText.join("") === originalText) {
                    clearInterval(restoreInterval);
                    restoreInterval = null;
                }
            }, 100);
        }
    }

    function getRandomCharacter() {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }
</script>

<div class="container">
    {#if !$showGrid}
        <div
            class="intro"
            on:click={enterSite}
            on:keydown={handleKeydown}
            role="button"
            tabindex="0"
        >
            {#key currentLogoIndex}
                <div class="logo-display" in:fade>
                    {#if logos[currentLogoIndex].id === "glitch"}
                        <div class="logo glitch-logo">
                            <span class="main">CORRUPTED</span>
                            <span class="glitch-1" aria-hidden="true"
                                >CORRUPTED</span
                            >
                            <span class="glitch-2" aria-hidden="true"
                                >CORRUPTED</span
                            >
                        </div>
                    {:else if logos[currentLogoIndex].id === "terminal"}
                        <!-- Terminal Logo -->
                        <div class="logo terminal-logo">
                            <div class="terminal-screen">
                                <div class="terminal-line">
                                    <span class="prompt">&gt;</span>
                                    <span class="command">cat /file</span>
                                </div>
                                <div class="terminal-line">
                                    <span class="error-message"
                                        >ACCESS_DENIED</span
                                    >
                                </div>
                            </div>
                        </div>
                    {:else if logos[currentLogoIndex].id === "error"}
                        <div class="logo error-logo">
                            <span class="error">404</span>
                        </div>
                    {:else if logos[currentLogoIndex].id === "decay"}
                        <div class="logo decay-logo">
                            {#each "FRAGMENTED".split("") as char, i}
                                <span
                                    class="char"
                                    style="animation-delay: {i * 0.3}s"
                                >
                                    {char}
                                </span>
                            {/each}
                        </div>
                    {:else if logos[currentLogoIndex].id === "manuscript"}
                        <div class="logo manuscript-logo">
                            {#each "UNREADABLE".split("") as char, i}
                                <span
                                    class="char"
                                    style="animation-delay: {i * 0.1}s"
                                >
                                    {char}
                                </span>
                            {/each}
                        </div>
                    {:else if logos[currentLogoIndex].id === "book"}
                        <div class="logo book-logo">
                            <div class="text-container">
                                {#each "ARCHIVED".split("") as char, i}
                                    <span
                                        class="char"
                                        style="animation-delay: {i * 0.1}s"
                                        >{char}</span
                                    >
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            {/key}
        </div>
    {:else}
        <div class="grid" in:scale={{ duration: 400, start: 0.95 }}>
            <!-- Preservation Card -->
            <div
                class="card preservation-card"
                class:visited={$visitedSections.preservation}
                on:click={() => {
                    visitedSections.update((v) => ({
                        ...v,
                        preservation: true,
                    }));
                    navigateToVisualization("/preservation");
                }}
                on:keydown={(e) => {
                    if (
                        (e.key === "Enter" || e.key === " ") &&
                        !$visitedSections.preservation
                    ) {
                        visitedSections.update((v) => ({
                            ...v,
                            preservation: true,
                        }));
                        navigateToVisualization("/preservation");
                    }
                }}
                role="button"
                tabindex="0"
            >
                <div class="manuscript-text">
                    <!-- Loop through each character to apply delay for handwriting effect -->
                    <!-- {#each "Shall I compare thee to a summer's day?".split("") as char, i} -->
                    {#each "PRESERVATION".split("") as char, i}
                        <span
                            class="handwritten-char"
                            style="--delay: {i * 0.1}s"
                        >
                            {char}
                        </span>
                    {/each}
                </div>
            </div>

            <!-- Interface Card -->
            <div
                class="card interface-card"
                class:visited={$visitedSections.interface}
                on:click={() => {
                    visitedSections.update((v) => ({
                        ...v,
                        interface: true,
                    }));
                    navigateToVisualization("/interface");
                }}
                on:keydown={(e) => {
                    if (
                        (e.key === "Enter" || e.key === " ") &&
                        !$visitedSections.interface
                    ) {
                        visitedSections.update((v) => ({
                            ...v,
                            interface: true,
                        }));
                        navigateToVisualization("/interface");
                    }
                }}
                on:mouseover={startLoop}
                on:mouseout={stopLoop}
                on:focus={startLoop}
                on:blur={stopLoop}
                role="button"
                tabindex="0"
            >
                <!-- Removed extra .card-content div for better layout -->
                <div class="interface-stages">
                    <!-- CLI Stage -->
                    <div
                        class="interface-stage cli"
                        class:active={currentStageIndex === 0}
                    >
                        <div class="cli-window">
                            C:\><span class="blink">_</span>
                            <div class="cli-text">INTERFACE</div>
                        </div>
                    </div>

                    <!-- Windows 95 Stage -->
                    <div
                        class="interface-stage win95"
                        class:active={currentStageIndex === 1}
                    >
                        <div class="win95-window">
                            <div class="title-bar">
                                <div class="title-buttons">
                                    <span class="min">_</span>
                                    <span class="max">□</span>
                                    <span class="close">×</span>
                                </div>
                            </div>
                            <div class="win95-content">Interface</div>
                        </div>
                    </div>

                    <!-- Modern OS Stage -->
                    <div
                        class="interface-stage modern"
                        class:active={currentStageIndex === 2}
                    >
                        <div class="modern-window">
                            <div class="window-controls">
                                <span class="dot red"></span>
                                <span class="dot yellow"></span>
                                <span class="dot green"></span>
                            </div>
                            <div class="modern-content">Interface</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Decay Card -->
            <div
                class="card decay-card"
                class:visited={$visitedSections.decay}
                on:click={() => {
                    visitedSections.update((v) => ({ ...v, decay: true }));
                    navigateToVisualization("/decay");
                }}
                on:keydown={(e) => {
                    if (
                        (e.key === "Enter" || e.key === " ") &&
                        !$visitedSections.decay
                    ) {
                        visitedSections.update((v) => ({ ...v, decay: true }));
                        navigateToVisualization("/decay");
                    }
                }}
                on:mouseover={startDecay}
                on:mouseout={stopDecay}
                on:focus={startDecay}
                on:blur={stopDecay}
                role="button"
                tabindex="0"
            >
                <div class="decay-container">
                    <div class="decay-text">
                        {#each displayedText as char, i}
                            <span class="char">{char}</span>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <!-- Thesis container (outside the grid) -->
        <div class="thesis-container" in:fade={{ delay: 400, duration: 400 }}>
            <div class="thesis-content">
                <p class="thesis-main">
                    The ubiquitous '404 Error' has evolved from a simple missing
                    page notification into a symbol of digital preservation's
                    central paradox.
                </p>
                <p class="thesis-explanation">
                    While digital technology promises perfect reproduction and
                    permanent accessibility, it introduces new layers of
                    potential failure through interface mediation, preservation
                    transformation, and digital decay.
                </p>
            </div>
        </div>

        <ProgressChip />
    {/if}
</div>

<style>
    /* Container and Grid Layout */
    .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--color-background);
        padding: var(--space-md);
    }

    .intro {
        text-align: center;
        cursor: pointer;
    }

    .logo-display {
        margin-bottom: var(--space-md);
        font-size: 3rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-md);
        max-width: 1200px;
        width: 100%;
        margin-bottom: 2rem;
    }

    /* Base Card Styles */
    .card {
        aspect-ratio: 3/2;
        border-radius: 16px;
        overflow: hidden;
        transition: var(--transition-normal);
        cursor: pointer;
        display: flex; /* Center content */
        align-items: center;
        justify-content: center;
        position: relative; /* For positioning the text */
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow:
            0 4px 6px var(--color-shadow),
            0 12px 16px var(--color-shadow);
    }

    .card-content {
        height: 100%;
        padding: var(--space-md);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Logo Animations */
    .glitch-logo {
        position: relative;
        font-family: monospace;
    }

    .glitch-logo .main {
        display: inline-block;
        position: relative;
        z-index: 2;
    }

    .glitch-logo .glitch-1,
    .glitch-logo .glitch-2 {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .glitch-logo .glitch-1 {
        left: -2px;
        text-shadow: 2px 0 #ff0000;
        animation: noise-1 3s infinite linear alternate-reverse;
    }

    .glitch-logo .glitch-2 {
        left: 2px;
        text-shadow: -2px 0 #00ff00;
        animation: noise-2 4s infinite linear alternate-reverse;
    }

    /* Terminal Logo */
    .terminal-logo {
        font-family: "Courier New", monospace;
        color: #000;
        display: inline-block;
        text-align: left;
        max-width: 100%;
    }

    .terminal-screen {
        display: inline-block;
        padding: 0.5rem;
        border: 2px solid #000;
        border-radius: 4px;
    }

    .terminal-line {
        display: flex;
        align-items: center;
        line-height: 1.2;
    }

    .prompt {
        color: #000;
        margin-right: 0.5rem;
        font-weight: bold;
    }

    .command {
        color: #555;
    }

    .error-message {
        color: #d00;
        margin-left: 1.5rem;
    }

    /* Error Logo */
    .error-logo {
        font-family: "Arial Black", sans-serif;
        font-size: 4rem;
        color: #ff0000;
        text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    }

    /* Decay Logo */
    .decay-logo {
        color: #ff6600;
        font-size: 2.5rem;
    }

    .decay-logo .char {
        display: inline-block;
    }

    /* Manuscript Logo */
    .manuscript-logo {
        font-family: "Homemade Apple", cursive;
        position: relative;
        transform: rotate(-2deg);
        font-size: 2.5rem;
    }

    .manuscript-logo .char {
        display: inline-block;
        opacity: 0;
        animation: writeIn 0.1s forwards;
    }

    /* Book Logo */
    .book-logo {
        font-family: "IM Fell English", serif;
        position: relative;
        font-size: 2.5rem;
    }

    .book-logo .text-container {
        display: inline-block;
        position: relative;
    }

    .book-logo .char {
        display: inline-block;
        opacity: 0;
        animation: appear 0.01s forwards;
    }

    /* Preservation Card */
    /* Preserve other cards' styles by scoping styles to .preservation-card */
    .preservation-card {
        /* Remove the default background to prevent conflicts */
        background: none;

        /* Apply the parchment background */
        background-color: #f4e4bc; /* Fallback color in case the image doesn't load */
        background-image: url("https://i.redd.it/s0z89td7gz021.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
    }

    /* Adjust the linear gradient to not cover the parchment texture */
    .preservation-card::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to right,
            rgba(244, 228, 188, 0.3) 0%,
            rgba(244, 228, 188, 0) 50%
        );
    }

    /* Centering the text within the card */
    .preservation-card .manuscript-text {
        font-family: "IM Fell English", serif;
        font-size: 1.5rem;
        font-weight: 500;
        color: #3b2716;

        text-align: center;
        line-height: 1.6;
        white-space: pre-wrap;
        position: relative;
        z-index: 1;
        padding: 0 1rem;
    }

    /* Handwriting effect */
    .preservation-card .handwritten-char {
        display: inline;
        opacity: 1;
        transform: translateY(0);
    }

    .preservation-card:hover .handwritten-char {
        opacity: 0;
        transform: translateY(10px);
        animation: writeIn 0.5s forwards;
        animation-delay: var(--delay);
    }

    @keyframes writeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Interface Card */
    .interface-stages {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .interface-stage {
        position: absolute;
        inset: 0;
        display: none; /* Hide all stages by default */
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    /* Show the active stage */
    .interface-stage.active {
        display: flex;
        opacity: 1;
    }

    /* CLI/DOS Style */
    .cli {
        background: #000;
        font-family: "Courier New", monospace;
        padding: 20px;
    }

    .cli-window {
        color: #33ff33;
        font-size: 1.5rem;
    }

    .cli-text {
        margin-top: 10px;
    }

    .blink {
        animation: blink 1s step-end infinite;
    }

    /* Windows 95 Style */
    .win95 {
        background: #c0c0c0;
        padding: 20px;
    }

    .win95-window {
        border: 2px outset #fff;
        background: #c0c0c0;
        width: 80%;
    }

    .title-bar {
        background: #000080;
        padding: 3px;
        display: flex;
        justify-content: flex-end;
    }

    .title-buttons span {
        margin-left: 4px;
        color: #000;
        background: #c0c0c0;
        padding: 0 4px;
        border: 1px outset #fff;
    }

    .win95-content {
        padding: 10px;
        font-family: "MS Sans Serif", Arial, sans-serif;
        font-size: 1.5rem;
    }

    /* Modern OS Style */
    .modern {
        background: #fff;
        padding: 20px;
    }

    .modern-window {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 80%;
    }

    .window-controls {
        padding: 10px;
        background: #f5f5f5;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 6px;
    }

    .red {
        background: #ff5f56;
    }
    .yellow {
        background: #ffbd2e;
    }
    .green {
        background: #27c93f;
    }

    .modern-content {
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 1.5rem;
    }

    /* Blinking Cursor Animation */
    @keyframes blink {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    /* Decay Card */
    .decay-card {
        background: #1a1a1a; /* Dark background */
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 3/2;
        border-radius: 16px;
        transition: var(--transition-normal);
        cursor: pointer;
    }

    .decay-card:hover {
        transform: translateY(-5px);
        box-shadow:
            0 4px 6px var(--color-shadow),
            0 12px 16px var(--color-shadow);
    }

    .decay-card::before {
        content: "";
        position: absolute;
        inset: 0;
        /* Glitch effect background using a CSS gradient */
        background: linear-gradient(
            135deg,
            rgba(0, 255, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.1) 20%,
            rgba(0, 255, 0, 0.1) 40%,
            rgba(0, 0, 0, 0.1) 60%,
            rgba(0, 255, 0, 0.1) 80%,
            rgba(0, 0, 0, 0.1) 100%
        );
        background-size: 200% 200%;
        animation: glitch-background 5s infinite;
        pointer-events: none;
    }

    @keyframes glitch-background {
        0% {
            background-position: 0% 0%;
        }
        50% {
            background-position: 100% 100%;
        }
        100% {
            background-position: 0% 0%;
        }
    }

    .decay-container {
        position: relative;
        z-index: 1; /* Ensure content is above the background */
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .decay-text {
        font-size: 3rem;
        font-family: "Courier New", monospace;
        color: #00ff00; /* Bright green text */
        text-align: center;
        letter-spacing: 0.1em;
        display: flex;
    }

    .char {
        display: inline-block;
        position: relative;
        animation: bit-flip 3s infinite;
    }

    @keyframes bit-flip {
        0% {
            opacity: 1;
        }
        5% {
            opacity: 0.5;
        }
        10% {
            opacity: 1;
        }
    }

    /* Animations */
    @keyframes appear {
        to {
            opacity: 1;
        }
    }

    @keyframes blink {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    @keyframes noise-1 {
        0%,
        20%,
        40%,
        60%,
        70%,
        90% {
            transform: translate3d(0, 0, 0);
        }
        10% {
            transform: translate3d(-2px, -2px, 0);
        }
        30% {
            transform: translate3d(2px, 2px, 0);
        }
        50% {
            transform: translate3d(-1px, 1px, 0);
        }
        80% {
            transform: translate3d(2px, -2px, 0);
        }
        100% {
            transform: translate3d(-2px, 2px, 0);
        }
    }

    @keyframes noise-2 {
        0%,
        20%,
        40%,
        60%,
        70%,
        90% {
            transform: translate3d(0, 0, 0);
        }
        10% {
            transform: translate3d(2px, 2px, 0);
        }
        30% {
            transform: translate3d(-2px, -2px, 0);
        }
        50% {
            transform: translate3d(1px, -1px, 0);
        }
        80% {
            transform: translate3d(-2px, 2px, 0);
        }
        100% {
            transform: translate3d(2px, -2px, 0);
        }
    }

    @keyframes writeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        25% {
            transform: translate(-2px, 2px);
        }
        50% {
            transform: translate(2px, -2px);
        }
        75% {
            transform: translate(-1px, -1px);
        }
        100% {
            transform: translate(0);
        }
    }

    @keyframes pulse {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 0.5;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }

    @keyframes pulseHover {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.5);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }

    /* Media Queries */
    @media (max-width: 768px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }

    .thesis-container {
        width: 100%;
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
        text-align: center;
    }

    .thesis-content {
        margin: 0 auto;
    }

    .thesis-main {
        font-size: 1rem;
        font-weight: 300;
        margin-bottom: 0.8rem;
        line-height: 1.4;
        color: var(--color-text-secondary);
        opacity: 0.8;
    }

    .thesis-explanation {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--color-text-secondary);
        opacity: 0.6;
    }

    @media (max-width: 768px) {
        .thesis-container {
            margin-top: 2rem;
            padding: 0 1rem;
        }
    }
</style>
