export namespace result {
  export type Ok<L> = {
    _tag: "Ok";
    value: L;
  };

  export type Err<R> = {
    _tag: "Err";
    value: R;
  };

  export type Result<L, R> = Err<L> | Ok<R>;

  export function err<L>(value: L): Err<L> {
    return { _tag: "Err", value };
  }

  export function ok<R>(value: R): Ok<R> {
    return { _tag: "Ok", value };
  }

  export function isErr<L, R = never>(value: Result<L, R>): value is Err<L> {
    return value._tag === "Err";
  }

  export function isOk<R, L = never>(
    value: Result<L, R>,
  ): value is Ok<R> {
    return value._tag === "Ok";
  }
}
