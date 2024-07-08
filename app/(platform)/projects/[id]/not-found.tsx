import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center mt-20">
      <div className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">Ops</h2>
      <p>Nao encontramos esse projeto!</p>
      <Link
        href="/projects"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Clique aqui para voltar a lista.
      </Link>
    </div>
  );
}