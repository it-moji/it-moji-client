export const omit = <Data extends object, Keys extends keyof Data = keyof Data>(
  data: Data,
  keys: Keys[],
): Omit<Data, Keys> => {
  const targetKeys = new Set(keys)
  type ExcludeKeys = Exclude<keyof Data, Keys>

  return Object.keys(data).reduce(
    (acc, key) => {
      if (targetKeys.has(key as Keys)) {
        return acc
      }

      return (acc[key as ExcludeKeys] = data[key as ExcludeKeys]), acc
    },
    {} as Omit<Data, Keys>,
  )
}
