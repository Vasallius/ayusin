export type ExtractBaseType<T, U> = Pick<T, keyof U>;

export function isNullOrUndefined<T>(
	value: T | null | undefined,
): value is null | undefined {
	return value === null || typeof value === "undefined";
}
