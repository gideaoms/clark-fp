export namespace either {
  export type Left<L> = {
    _tag: "Left";
    value: L;
  };

  export type Right<R> = {
    _tag: "Right";
    value: R;
  };

  export type Result<L, R> = Left<L> | Right<R>;

  export function left<L>(value: L): Left<L> {
    return { _tag: "Left", value };
  }

  export function right<A>(value: A): Right<A> {
    return { _tag: "Right", value };
  }

  export function isLeft<L, R = never>(value: Result<L, R>): value is Left<L> {
    return value._tag === "Left";
  }

  export function isRight<R, L = never>(
    value: Result<L, R>,
  ): value is Right<R> {
    return value._tag === "Right";
  }
}
