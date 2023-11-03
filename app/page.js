import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1>NOTHING FOR HERE</h1>
      <Link className="px-2 py-1 bg-red-700 text-white rounded-md" href={"/home"}>Enter</Link>
    </main>
  )
}
