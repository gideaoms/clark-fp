function tag<T extends { _tag: string }, R>(
  input: T,
  cases: {
    [K in T as K extends { _tag: infer Y } ? Y & string : never]: (
      value: K extends { value: infer V } ? V : never
    ) => R;
  }
) {
  //...
}
