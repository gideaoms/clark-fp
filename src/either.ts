export namespace either {
  export type Err<L> = {
    _tag: "Err";
    value: L;
  };

  export type Ok<R> = {
    _tag: "Ok";
    value: R;
  };

  export type Result<L, R> = Err<L> | Ok<R>;

  export function Err<L>(value: L): Err<L> {
    return { _tag: "Err", value };
  }

  export function Ok<R>(value: R): Ok<R> {
    return { _tag: "Ok", value };
  }

  export function isErr<L, R = never>(value: Result<L, R>): value is Err<L> {
    return value._tag === "Err";
  }

  export function isOk<R, L = never>(value: Result<L, R>): value is Ok<R> {
    return value._tag === "Ok";
  }
}
