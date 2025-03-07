export const pick = <Data extends object, Keys extends keyof Data = keyof Data>(
  data: Data,
  keys: Keys[],
): Pick<Data, Keys> =>
  keys.reduce((acc, key) => ((acc[key] = data[key]), acc), {} as Pick<Data, Keys>)
