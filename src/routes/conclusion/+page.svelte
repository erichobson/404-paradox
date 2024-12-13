<script>
    import { onMount } from "svelte";
    import { visitedSections, showGrid } from "$lib/stores";
    import { goto } from "$app/navigation";

    function resetExperience() {
        visitedSections.set({
            preservation: false,
            interface: false,
            decay: false,
        });
        showGrid.set(false);
        goto("/", { replaceState: true });
    }
</script>

<div class="conclusion-page">
    <h1>The Paradox of Digital Preservation</h1>

    <div class="summary">
        <p class="lead">
            Through our exploration of preservation, interface mediation, and
            digital decay, we've demonstrated how the ubiquitous '404 Error' has
            evolved from a simple missing page notification into a symbol of
            digital preservation's central paradox: while digital technology
            promises perfect reproduction and permanent accessibility, it
            introduces new layers of potential failure.
        </p>
    </div>

    <div class="sections-analysis">
        <h2>Interactive Exploration</h2>

        <div class="section-review">
            <h3>Preservation</h3>
            <p>
                Beginning with Shakespeare's Sonnet XVIII, we contrasted the
                direct readability of print with the layered complexity of
                digital preservation. The visual juxtaposition of the original
                sonnet against its digital translation revealed what Rothenberg
                identifies as the fundamental challenge of digital preservation:
                "A single break in this chain can render digital information
                inaccessible—short of heroic effort" (11).
            </p>
        </div>

        <div class="section-review">
            <h3>Interface Mediation</h3>
            <p>
                Through the transformation of academic text across different
                interface paradigms, we demonstrated Kirschenbaum's argument
                that interfaces actively shape our understanding of digital
                texts. He notes that "the material complexity ... therefore
                underscores the need for critical approaches capable of
                accounting for such phenomena as multiple versions and releases,
                data standards, platforms, and file formats" (43). The
                progression from original to inaccessible state illustrated how
                interface evolution can render content unreadable despite
                perfect preservation of the underlying data.
            </p>
        </div>

        <div class="section-review">
            <h3>Digital Decay</h3>
            <p>
                The bit-flip visualization provided a tangible demonstration of
                digital fragility. As Rothenberg notes, "Old bit streams never
                die—they just become unreadable" (2). This interactive element
                showed how even minor corruption at the binary level can render
                digital content inaccessible, supporting Kirschenbaum's analysis
                of digital materiality.
            </p>
        </div>
    </div>

    <div class="theoretical-implications">
        <h2>Theoretical Implications</h2>
        <p>
            This project's interactive elements demonstrate how digital
            preservation involves not just maintaining data, but preserving
            entire technological ecosystems. Through the combination of visual
            demonstrations and academic analysis, we've shown how the very
            mechanisms intended to ensure digital permanence can become barriers
            to access.
        </p>
        <p>
            The integration of Rothenberg's analysis of technological
            dependencies with Kirschenbaum's exploration of digital materiality
            reveals how digital preservation paradoxically complicates the very
            permanence it promises. Each interactive element serves to
            demonstrate a different aspect of this central paradox.
        </p>
    </div>

    <div class="project-info">
        <div class="info-content">
            <p class="author">by Eric Hobson</p>
            <div class="course-info">
                <p>DIGH 3001: The Book in the Digital Age</p>
                <p>Professor Micheline White</p>
                <p>Fall 2024</p>
            </div>
        </div>
    </div>

    <div class="references">
        <h2>Works Cited</h2>
        <div class="reference">
            <p>
                Kirschenbaum, Matthew G. "Editing the Interface: Textual Studies
                and First Generation Electronic Objects." <em>Text</em>, vol.
                14, 2002, pp. 15-51.
            </p>
        </div>
        <div class="reference">
            <p>
                Rothenberg, Jeff. "Ensuring the Longevity of Digital
                Information." RAND, 22 Feb. 1999.
            </p>
        </div>
    </div>

    <div class="reset-container">
        <button class="navigation-button" on:click={resetExperience}>
            Reset
        </button>
    </div>
</div>

<style>
    .conclusion-page {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: var(--color-text);
        font-weight: 300;
        text-align: center;
    }

    h2 {
        font-size: 1.8rem;
        margin: 3rem 0 1.5rem;
        color: var(--color-text);
        font-weight: 300;
    }

    h3 {
        font-size: 1.4rem;
        margin: 2rem 0 1rem;
        color: var(--color-text);
        font-weight: 400;
    }

    .lead {
        font-size: 1.3rem;
        line-height: 1.6;
        color: var(--color-text-secondary);
        margin-bottom: 2rem;
    }

    .section-review {
        margin-bottom: 2rem;
    }

    .section-review p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--color-text);
        margin-bottom: 1rem;
    }

    .theoretical-implications p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--color-text);
        margin-bottom: 1.5rem;
    }

    .project-info {
        margin: 4rem 0;
        text-align: center;
        color: var(--color-text-secondary);
        font-size: 1rem;
        line-height: 1.6;
    }

    .info-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .author {
        font-style: italic;
    }

    .course-info {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        opacity: 0.8;
    }

    .course-info p {
        margin: 0.25rem 0;
    }

    .references {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--color-border);
    }

    .reference {
        margin-bottom: 1rem;
        font-size: 1rem;
        color: var(--color-text-secondary);
        line-height: 1.4;
    }

    .reset-container {
        margin-top: 4rem;
        text-align: center;
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

    @media (max-width: 768px) {
        .conclusion-page {
            padding: 1rem;
        }

        h1 {
            font-size: 2rem;
        }

        h2 {
            font-size: 1.5rem;
        }

        h3 {
            font-size: 1.2rem;
        }

        .lead {
            font-size: 1.1rem;
        }
    }
</style>
