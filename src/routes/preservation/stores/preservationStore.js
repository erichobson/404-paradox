import { writable } from 'svelte/store';

// State stores
export const activeError = writable(null);
export const activeLayer = writable(null);
export const activePoint = writable(null);
export const isPaperHovered = writable(false);

// Functions
export function simulateError(index) {
    activeError.set(index);
}

export function clearError() {
    activeError.set(null);
}

export function toggleLayer(layerId) {
    activeLayer.update(current => current === layerId ? null : layerId);
}

export function showInfo(pointId) {
    activePoint.set(pointId);
}

export function hideInfo(pointId) {
    activePoint.update(current => current === pointId ? null : current);
}
