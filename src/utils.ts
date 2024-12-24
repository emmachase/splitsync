function throwShiftFrame(error: Error): never {
    const stack = error.stack;
    if (!stack) {
        throw error;
    }

    error.stack = stack.split("\n").slice(1).join("\n");
    throw error;
}

export function assertEquals<T>(expected: T, actual: T, message?: string): void {
    if (actual !== expected) {
        throwShiftFrame(new Error(`Assertion failed: ${message || ''} Expected ${expected}, got ${actual}`));
    }
}

export function assertNotNull<T>(value: T | null | undefined, name?: string): T {
    if (value !== null && value !== undefined) {
        return value
    }

    const message = name ? `Expected non-null value for ${name}` : 'Expected non-null value';
    throwShiftFrame(new Error(`Assertion failed: ${message}, got ${value}`));
}

export const SECONDS = 1000;
