export function tag<
  T extends { _tag: string; value?: unknown },
  U extends
    | { [K in T as K["_tag"]]: (input: K["value"]) => unknown }
    | { [K in T as K["_tag"]]: unknown },
  R = U[T["_tag"]],
>(
  input: T,
  cases: U,
): R extends (input: any) => infer Y ? Y : R {
  const match = cases[input._tag as keyof U] as any;
  if (typeof match === "function") {
    return match(input.value);
  }
  return match;
}
