export const displayValue = (
    value?: string | number | null,
    fallback = '—'
): string | number => {
    return value ?? fallback
}

export const buildFullName = (...parts: (string | null | undefined)[]) =>
    parts.filter(Boolean).join(' ');