export const generateUid = (length = 16) =>
    Math.random().toString(36).substring(2, 2 + length);