<script>
    import { preservationContent } from "../data/content.js";
    const { introduction } = preservationContent;
</script>

<section class="academic-section introduction">
    <h1 data-note-id="intro-paradox">{introduction.title}</h1>

    <p class="lead">
        {introduction.content}
    </p>

    <div class="content-block">
        <p>
            As Kirschenbaum observes, the materiality of digital preservation
            presents us with a unique paradox: perfect reproducibility coupled
            with unprecedented vulnerability. Shakespeare's Sonnet XVIII
            concludes with a powerful statement about preservation - that as
            long as humans exist to read it, the printed text will survive. This
            elegant simplicity of print preservation stands in stark contrast to
            what Rothenberg identifies as the "multiple layers of technological
            dependency" required for digital preservation. What was once a
            straightforward relationship between reader and text now involves
            complex chains of hardware, software, and interface mediation.
        </p>
    </div>

    <blockquote data-note-id="intro-couplet">
        <p>{introduction.quote}</p>
        <footer>- {introduction.source}</footer>
    </blockquote>

    <div class="content-block">
        <p>
            Through a reimagining of Shakespeare's famous couplet for the
            digital age, we'll explore how the very mechanisms meant to preserve
            digital content introduce new vulnerabilities. Each layer represents
            what Rothenberg describes as a "cryptic hostage" to its own
            encoding, demonstrating how digital preservation paradoxically
            complicates the very permanence it promises.
        </p>
    </div>
</section>

<style>
    .academic-section {
        margin: 4rem 0;
    }

    .introduction {
        text-align: center;
        margin-bottom: 6rem;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: var(--color-text);
        font-weight: 300;
    }

    .lead {
        font-size: 1.3rem;
        line-height: 1.6;
        color: var(--color-text-secondary);
        margin-bottom: 2rem;
        text-align: left;
    }

    blockquote {
        border-left: 3px solid #666;
        padding-left: 1.5rem;
        margin: 1.5rem 0;
        font-style: italic;
        color: #666;
    }

    blockquote footer {
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }

    .content-block {
        margin: 2rem 0;
        text-align: left;
    }

    .content-block p {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--color-text);
    }
</style>
