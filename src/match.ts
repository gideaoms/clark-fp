export function match<const T>(input: T) {
  return new Ex(input, unmatched);
}

type State<T> =
  | { matched: true; value: T }
  | { matched: false; value: undefined };

type ExhaustiveError<_T> = {
  _tag: "ExhaustiveError";
};

const unmatched: State<never> = { matched: false, value: undefined };

function isFn(value: unknown): value is (input: any) => any {
  return typeof value === "function";
}

function matched<const T>(value: T): State<T> {
  return { matched: true, value };
}

class Ex<const T, const U> {
  constructor(private input: T, private state: State<U>) {}

  when<const P extends T, R>(of: P, returns: ((value: P) => R) | R) {
    if (this.state.matched) {
      return this as Ex<Exclude<T, P>, R | U>;
    }
    if (isFn(returns)) {
      const state = of === this.input ? matched(returns(of)) : unmatched;
      return new Ex(this.input, state) as Ex<Exclude<T, P>, R | U>;
    }
    const state = of === this.input ? matched(returns) : unmatched;
    return new Ex(this.input, state) as Ex<Exclude<T, P>, R | U>;
  }

  otherwise<R>(returns: ((input: T) => R) | R) {
    if (this.state.matched) {
      return this.state.value;
    }
    if (isFn(returns)) {
      return returns(this.input) as R;
    }
    return returns as R;
  }

  // @ts-ignore
  exhaustive: T extends never ? () => U : ExhaustiveError<T> = () => {
    if (this.state.matched) {
      return this.state.value;
    }
    throw new Error("Unhandled pattern matching");
  };
}
