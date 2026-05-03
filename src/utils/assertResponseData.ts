export function assertResponseData<T>(data: T | undefined, resource: string): T {
    if (!data) {
        throw new Error(`${resource}: response missing data`);
    }
    return data;
}