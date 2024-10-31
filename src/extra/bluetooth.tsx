import { BluetoothButton } from "@/components/bluetoothButton";

export default async function Home() {
  const data = await fetch("http://127.0.0.1:3000/api/message");
  const result = await data.json();
  console.log(result);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="font-mono font-semibold text-4xl">Bluetooth Devices</h1>
      {/* {result.map((result) => {
        return <p key={result}>{result.message}</p>;
      })} */}
      <BluetoothButton />
    </div>
  );
}
