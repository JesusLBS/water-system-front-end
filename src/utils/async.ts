export const delay = (ms: number = 500): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));