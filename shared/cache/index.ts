export default class Cache {
  private data: Record<string, unknown> = {};

  public put(key: string, value: unknown): undefined {
    this.data[key] = value;
  }

  public get<TModel>(key: string): TModel | null {
    if (this.data[key]) {
      return this.data[key] as TModel;
    }
    return null;
  }

  public clear() {
    this.data = {};
  }
}
