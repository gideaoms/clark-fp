export function match<T>(input: T) {
  return new Matcher(input, unmatched)
}

type State<Value> =
  | { matched: true; value: Value }
  | { matched: false; value: undefined };

type ExhaustiveError<Value> = {
  tag: "ExhaustiveError";
};

const unmatched: State<never> = { matched: false, value: undefined };

function matched<Value>(value: Value) {
  return { matched: true, value } satisfies State<Value>;
}

class Matcher<Input, Value> {
  constructor(private input: Input, private state: State<Value>) { }

  when<Alternative extends Input, const Result>(
    alternative: Alternative,
    returning: ((value: Alternative) => Result) | Result
  ) {
    if (this.state.matched) {
      return this as Matcher<Exclude<Input, Alternative>, Result | Value>
    }
    if (typeof returning === 'function') {
      const state = alternative === this.input
        ? matched((returning as (value: Alternative) => Result)(alternative))
        : unmatched;
      return new Matcher(this.input, state) as
        Matcher<Exclude<Input, Alternative>, Result | Value>;
    }
    const state = alternative === this.input ? matched(returning) : unmatched
    return new Matcher(this.input, state) as
      Matcher<Exclude<Input, Alternative>, Result>
  }

  otherwise<const Result>(returning: ((input: Input) => Result) | Result) {
    if (this.state.matched) {
      return this.state.value;
    }
    if (typeof returning === 'function') {
      return (returning as (input: Input) => Result)(this.input) as Result;
    }
    return returning as Result;
  }

  // @ts-ignore
  exhaustive: [Input] extends [never] ? () => Value : ExhaustiveError<Input> =
    () => {
      if (this.state.matched) {
        return this.state.value;
      }
      throw new Error("Unhandled pattern matching");
    };
}
