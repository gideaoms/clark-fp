export function tag<
  I extends { _tag: keyof C; value?: unknown },
  C extends {
    [K in I as K["_tag"]]: K extends { value: unknown }
      ? (value: K["value"]) => R
      : () => R;
  },
  R
>(input: I, cases: { [K in keyof C]: C[K] }) {
  return (cases[input._tag] as Function)(input.value) as C[I["_tag"]] extends (
    value: any
  ) => infer Y
    ? Y
    : never;
}
