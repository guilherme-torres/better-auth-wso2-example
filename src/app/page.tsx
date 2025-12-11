import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/dashboard" className="underline text-blue-600">
        Acessar Dashboard
      </Link>
    </div>
  );
}
