export type None = {
	_tag: "None";
};

export type Some<T> = {
	_tag: "Some";
	value: T;
};

export type Maybe<T> = None | Some<T>;

export const none: None = { _tag: "None" };

export function some<T>(value: T): Some<T> {
	return { _tag: "Some", value };
}

export function isSome<T>(value: Maybe<T>): value is Some<T> {
	return value._tag === "Some";
}

export function isNone(value: Maybe<unknown>): value is None {
	return value._tag === "None";
}
