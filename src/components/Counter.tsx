import { useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";

export default function Counter() {
  const [count, setCount] = useState(5);

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        className="btn btn-sm btn-soft btn-error"
        onClick={() => setCount(count - 1)}
      >
        <Minus />
      </button>
      <strong className="text-lg font-bold">{count}</strong>
      <button
        className="btn btn-sm btn-soft btn-success"
        onClick={() => setCount(count + 1)}
      >
        <Plus />
      </button>
    </div>
  );
}
