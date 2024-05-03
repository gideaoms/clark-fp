export function tag<
  const T extends { _tag: string; value?: unknown },
  const U extends
    | { [K in T as K["_tag"]]: (input: K["value"]) => unknown }
    | { [K in T as K["_tag"]]: unknown },
>(
  input: T,
  cases: U,
): U[T["_tag"]] extends (input: any) => infer R ? R : U[T["_tag"]] {
  const match = cases[input._tag as keyof U] as any;
  if (typeof match === "function") {
    return match(input.value);
  }
  return match;
}
