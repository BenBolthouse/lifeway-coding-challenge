export default class Cache {
    private data;
    put(key: string, value: unknown): undefined;
    get<TModel>(key: string): TModel | null;
    clear(): void;
}
