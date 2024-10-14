import { useSignal } from "@preact/signals";

type Props = {
  start: number;
};

export default function MyCounter(props: Props) {
  const count = useSignal(props.start);

  return (
    <div>
      <h3>Interactive island</h3>
      <p>The server supplied the initial value of {props.start}.</p>
      <div>
        <button onClick={() => count.value -= 1}>-</button>
        <div>{count}</div>
        <button onClick={() => count.value += 1}>+</button>
      </div>
    </div>
  );
}
