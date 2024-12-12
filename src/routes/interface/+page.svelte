<script>
    import { goto } from "$app/navigation";
    import { fade, slide } from "svelte/transition";

    const viewStates = [
        {
            id: "original",
            title: "Original Document",
            class: "original",
        },
        {
            id: "legacy",
            title: "Legacy Software",
            class: "legacy",
        },
        {
            id: "modern",
            title: "Modern Viewer",
            class: "modern",
        },
        {
            id: "inaccessible",
            title: "Inaccessible State",
            class: "inaccessible",
        },
    ];

    const academicText = {
        title: "Interface Mediation in Digital Preservation",
        abstract:
            'This analysis examines how interfaces shape our access to and understanding of digital content, demonstrating the paradox identified by Rothenberg that "digital information lasts forever—or five years, whichever comes first." Each interface transformation reveals another layer of potential inaccessibility.',
        content: `The relationship between digital content and its interfaces presents a fundamental challenge in digital preservation. As Kirschenbaum notes, "interfaces are not neutral windows to content but actively shape how we read and understand digital texts." This mediation becomes particularly evident when examining how different interfaces transform our access to and interpretation of digital content.

    Consider how digital documents are "held cryptic hostage to their own encoding" (Rothenberg), requiring specific software environments for interpretation. This dependency creates layers of mediation between user and content, each representing what Kirschenbaum identifies as a "potential point of failure in the preservation chain."

    The materiality of these interfaces—their specific affordances, limitations, and transformations of content—demonstrates how digital preservation involves not just maintaining data, but preserving entire technological ecosystems. As Rothenberg argues, when these ecosystems fragment or become incompatible, the content itself becomes transformed, degraded, or entirely inaccessible.`,
    };

    let currentViewState = viewStates[0];

    function selectViewState(state) {
        currentViewState = state;
    }
</script>

<div class="interface-page">
    <div class="viewer-container">
        {#if currentViewState.id === "original"}
            <div class="content-view original">
                <div class="document">
                    <h1>{academicText.title}</h1>
                    <p class="abstract">{academicText.abstract}</p>
                    <div class="content">{academicText.content}</div>
                </div>
            </div>
        {:else if currentViewState.id === "legacy"}
            <div class="window legacy-window">
                <div class="window-header">
                    <div class="title-bar">
                        <span>INTRFCE~1.DOC - WordProcessor 1998</span>
                        <div class="window-controls">
                            <button>_</button>
                            <button>□</button>
                            <button>×</button>
                        </div>
                    </div>
                    <div class="menu-bar">
                        <span>File</span>
                        <span>Edit</span>
                        <span>View</span>
                        <span>Help</span>
                    </div>
                </div>
                <div class="toolbar">
                    <button>New</button>
                    <button>Open</button>
                    <button>Save</button>
                    <span class="separator">|</span>
                    <button>Print</button>
                </div>
                <div class="content-area">
                    <div class="legacy-document">
                        <h1>{academicText.title.toUpperCase()}</h1>
                        <p class="abstract">
                            [Abstract] {academicText.abstract
                                .replace('"', "")
                                .replace('"', "")}
                        </p>
                        <div class="content">
                            {academicText.content
                                .replace('"', "<quote>")
                                .replace('"', "</quote>")
                                .replace('"', "<quote>")
                                .replace('"', "</quote>")
                                .replace("—", "--")}
                            <div class="format-note">
                                [Note: Some special characters may not display
                                correctly]
                            </div>
                        </div>
                    </div>
                </div>
                <div class="status-bar">
                    <span>Page 1</span>
                    <span>Normal</span>
                    <span>Times New Roman 12</span>
                </div>
            </div>
        {:else if currentViewState.id === "modern"}
            <div class="window modern-window">
                <div class="modern-header">
                    <div class="tabs">
                        <div class="tab active">Interface_Mediation.doc</div>
                        <div class="compatibility-warning">
                            ⚠️ Opened in Compatibility Mode
                        </div>
                    </div>
                    <div class="modern-controls">
                        <button class="icon-button">⚙️</button>
                        <button class="icon-button">⋯</button>
                    </div>
                </div>
                <div class="modern-toolbar">
                    <input type="search" placeholder="Search in document..." />
                    <div class="view-controls">
                        <button>100%</button>
                        <button>⊕</button>
                        <button>⊖</button>
                    </div>
                </div>
                <div class="modern-content">
                    <div class="compatibility-banner">
                        This document was created in an earlier version. Some
                        formatting may have changed.
                    </div>
                    <div class="modern-document">
                        <h1>{academicText.title}</h1>
                        <p class="abstract">{academicText.abstract}</p>
                        <div class="content">
                            {academicText.content.replace("—", "–")}
                            <div class="substitution-note">
                                [Font substituted: Original 'MS Serif' not
                                found]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {:else}
            <div class="error-state">
                <div class="error-dialog">
                    <div class="error-header">
                        <span class="error-icon">⚠️</span>
                        <h2>Document Recovery Attempted</h2>
                    </div>
                    <div class="error-content">
                        <div class="corrupted-text">
                            <h1>
                                {academicText.title
                                    .split("")
                                    .map((char) =>
                                        Math.random() > 0.3 ? char : "█",
                                    )
                                    .join("")}
                            </h1>
                            <p class="abstract">ERR_ENCODING_FAILURE</p>
                            <div class="content">
                                {academicText.content
                                    .split(" ")
                                    .map((word) =>
                                        Math.random() > 0.7
                                            ? word
                                            : "[DATA_CORRUPTED]",
                                    )
                                    .join(" ")}
                            </div>
                        </div>
                        <div class="error-details">
                            <p>Recovery failed due to:</p>
                            <ul>
                                <li>Incompatible character encoding</li>
                                <li>Missing required software dependencies</li>
                                <li>Unrecognized file format version</li>
                            </ul>
                            <div class="error-code">
                                Error Code: 0xC00CE556 - Document Interface
                                Resolution Failed
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>

    <div class="interface-controls">
        {#each viewStates as state}
            <button
                class="interface-pill"
                class:active={currentViewState.id === state.id}
                on:click={() => selectViewState(state)}
            >
                {state.title}
            </button>
        {/each}
    </div>
    <div class="navigation-button-container">
        <button
            class="navigation-button"
            on:click={() => goto("/?view=grid", { replaceState: true })}
        >
            ← Back
        </button>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }

    .interface-page {
        min-height: calc(100dvh - 60px);
        width: 100vw;
        position: relative;
        display: flex;
        flex-direction: column;
        background: var(--color-background);
        padding-bottom: 2rem;
    }

    .viewer-container {
        flex: 1;
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }

    /* Original View */
    .content-view.original {
        padding: 3rem;
        background: white;
        border-radius: 4px;
        width: 100%;
        max-width: 800px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .document {
        font-family: "Times New Roman", serif;
        line-height: 1.6;
    }

    .document h1 {
        font-size: 24px;
        margin-bottom: 2rem;
    }

    .document .abstract {
        font-style: italic;
        margin-bottom: 2rem;
        padding-left: 2rem;
        border-left: 3px solid var(--color-primary);
    }

    /* Legacy Window */
    .legacy-window {
        background: #c0c0c0;
        border: 2px outset #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        width: 100%;
        max-width: 800px;
    }

    .window-header {
        background: #000080;
        color: white;
        padding: 2px;
    }

    .title-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 4px;
    }

    .window-controls button {
        width: 16px;
        height: 16px;
        margin-left: 2px;
        background: #c0c0c0;
        border: 1px outset #fff;
        font-size: 10px;
        line-height: 1;
    }

    .menu-bar {
        display: flex;
        gap: 1rem;
        padding: 2px 4px;
        background: #c0c0c0;
        border-top: 1px solid #fff;
    }

    .toolbar {
        padding: 4px;
        background: #c0c0c0;
        border-bottom: 1px solid #808080;
        display: flex;
        gap: 4px;
    }

    .toolbar button {
        padding: 2px 4px;
        background: #c0c0c0;
        border: 1px outset #fff;
    }

    .content-area {
        background: white;
        padding: 1rem;
        min-height: 300px;
    }

    .status-bar {
        padding: 2px 4px;
        background: #c0c0c0;
        border-top: 1px solid #808080;
        display: flex;
        justify-content: space-between;
    }

    .legacy-document {
        font-family: "MS Serif", "Times New Roman", serif;
        padding: 1rem;
    }

    .legacy-document h1 {
        font-size: 18px;
        margin-bottom: 1rem;
    }

    .format-note {
        background: #ffffc0;
        padding: 0.5rem;
        margin-top: 1rem;
        font-family: "MS Sans Serif", sans-serif;
        font-size: 0.9rem;
    }

    /* Modern Window */
    .modern-window {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 800px;
        overflow: hidden;
    }

    .modern-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: #f5f5f5;
        border-bottom: 1px solid #eee;
    }

    .tabs {
        display: flex;
        gap: 0.5rem;
    }

    .tab {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        background: #fff;
        border: 1px solid #eee;
    }

    .tab.active {
        background: #fff;
        border-bottom: 2px solid var(--color-primary);
    }

    .modern-toolbar {
        padding: 0.5rem;
        background: #fff;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modern-toolbar input {
        padding: 0.5rem;
        border: 1px solid #eee;
        border-radius: 4px;
        width: 200px;
    }

    .view-controls {
        display: flex;
        gap: 0.5rem;
    }

    .modern-content {
        padding: 1rem;
    }

    .modern-document {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        padding: 2rem;
    }

    .compatibility-banner {
        background: #fff3cd;
        color: #856404;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        font-size: 0.9rem;
    }

    .substitution-note {
        background: #e9ecef;
        padding: 0.5rem;
        margin-top: 1rem;
        font-size: 0.85rem;
        color: #666;
    }

    /* Error State */
    .error-state {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .error-dialog {
        background: #f0f0f0;
        border-radius: 4px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 800px;
        max-height: 80vh; /* Add this */
        overflow-y: auto; /* Add this */
        overflow-x: hidden; /* Add this */
    }

    .error-header {
        background: #dc3545;
        color: white;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .error-content {
        padding: 1rem;
    }

    .corrupted-text {
        font-family: monospace;
        line-height: 1.6;
        margin-bottom: 2rem;
        color: #666;
    }

    .error-details {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 4px;
        margin-top: 1rem;
    }

    .error-code {
        font-family: monospace;
        color: #666;
        margin-top: 1rem;
        padding: 0.5rem;
        background: #eee;
        border-radius: 4px;
    }

    /* Interface Controls */
    .interface-controls {
        position: relative;
        margin: 2rem auto;
        display: flex;
        gap: 1rem;
        padding: 0.5rem;
        background: var(--color-surface);
        border-radius: 50px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .interface-pill {
        background: var(--color-background);
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .interface-pill:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .interface-pill.active {
        background: var(--color-surface);
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .navigation-button-container {
        padding: 1rem;
        text-align: center;
        margin: 0 auto;
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
