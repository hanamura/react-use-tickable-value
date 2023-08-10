import { useEffect, useState } from 'react'

import { useTickableValue } from '../../src'

export const App = () => {
  const { get, set, watch } = useTickableValue(0)
  const [value, setValue] = useState(get())

  useEffect(() => {
    return watch((value) => {
      setValue(value)
    })
  }, [watch])

  return <button onClick={() => set((v) => v + 1)}>Click me: {value}</button>
}
