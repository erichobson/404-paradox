<script>
    import { shakespeareText } from "../data/content.js";
    import { isPaperHovered } from "../stores/preservationStore.js";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();

    onMount(() => {
        console.log("Print section mounted");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.log(
                        "Print section intersection:",
                        entry.isIntersecting,
                    );
                    if (entry.isIntersecting) {
                        dispatch("sectionVisible", {
                            section: "print",
                        });
                    }
                });
            },
            {
                threshold: 0.2, // Lower threshold
            },
        );

        const section = document.querySelector(".print-section");
        if (section) {
            observer.observe(section);
            console.log("Print section observer attached");
        } else {
            console.log("Print section not found");
        }

        return () => observer.disconnect();
    });
</script>

<section class="print-section" data-note-id="print-durability">
    <h2>Print: Four Centuries of Direct Readability</h2>
    <div
        class="manuscript"
        on:mouseenter={() => ($isPaperHovered = true)}
        on:mouseleave={() => ($isPaperHovered = false)}
        class:hover={$isPaperHovered}
        role="article"
        data-note-id="print-materiality"
    >
        <div class="decorative-border">
            <div class="watermark">XVIII</div>
            <div class="sonnet-content">
                <h2 class="sonnet-title">Sonnet XVIII</h2>
                <pre class="sonnet">{shakespeareText}</pre>
            </div>
        </div>
        <div class="manuscript-note">First published 1609</div>
    </div>
</section>

<style>
    .print-section {
        margin: 4rem 0;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 300;
        margin-bottom: 2rem;
        color: var(--color-text);
    }

    .manuscript {
        background: #f9f6f1;
        padding: 3rem;
        border-radius: 8px;
        position: relative;
        box-shadow:
            inset 0 0 100px rgba(0, 0, 0, 0.05),
            0 2px 15px rgba(0, 0, 0, 0.1);
        transition: all var(--transition-normal);
        margin: 2rem 0;
    }

    .manuscript.hover {
        transform: translateY(-3px) rotate(0.5deg);
        box-shadow:
            inset 0 0 100px rgba(0, 0, 0, 0.05),
            0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .decorative-border {
        border: 2px solid #8b7355;
        padding: 2rem;
        position: relative;
        background:
            linear-gradient(
                    to right,
                    rgba(139, 115, 85, 0.1) 1px,
                    transparent 1px
                )
                0 0,
            linear-gradient(
                    to bottom,
                    rgba(139, 115, 85, 0.1) 1px,
                    transparent 1px
                )
                0 0;
        background-size: 20px 20px;
    }

    .watermark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-family: "IM Fell English", serif;
        font-size: 8rem;
        color: rgba(139, 115, 85, 0.1);
        pointer-events: none;
    }

    .sonnet-content {
        position: relative;
        z-index: 1;
    }

    .sonnet-title {
        font-family: "IM Fell English", serif;
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        color: #8b7355;
    }

    .sonnet {
        font-family: "IM Fell English", serif;
        font-size: 1.1rem;
        line-height: 1.8;
        white-space: pre-wrap;
        color: #2c1810;
        text-align: left;
        margin: 0;
    }

    .manuscript-note {
        text-align: center;
        font-style: italic;
        margin-top: 1.5rem;
        color: #8b7355;
        font-size: 0.9rem;
        font-family: "IM Fell English", serif;
    }

    @media (max-width: 768px) {
        .manuscript {
            padding: 2rem;
        }

        .decorative-border {
            padding: 1.5rem;
        }

        .watermark {
            font-size: 6rem;
        }

        .sonnet {
            font-size: 1rem;
            line-height: 1.6;
        }
    }
</style>
