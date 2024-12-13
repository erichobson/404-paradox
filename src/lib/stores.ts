// src/lib/stores.ts
import { writable, derived } from 'svelte/store';

export const showGrid = writable(false);

export const visitedSections = writable({
    preservation: false,
    interface: false,
    decay: false
});

export const allSectionsVisited = derived(
    visitedSections,
    $visited => Object.values($visited).every(v => v)
);
