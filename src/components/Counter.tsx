import { Minus, Plus } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(5)

  useEffect(() => {
    console.log(count)
  }, [count])

  return (
    <div className="flex items-center justify-center gap-4">
      <button className="btn btn-soft btn-sm btn-error" onClick={() => setCount(count - 1)}>
        <Minus />
      </button>
      <strong className="text-lg font-bold">{count}</strong>
      <button className="btn btn-soft btn-sm btn-success" onClick={() => setCount(count + 1)}>
        <Plus />
      </button>
    </div>
  )
}
