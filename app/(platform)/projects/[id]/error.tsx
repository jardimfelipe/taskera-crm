"use client";

import Link from 'next/link';
import React from 'react'

export default function error() {
  return (
    <div className="flex h-full w-full flex-col items-center mt-20 gap-2">
      <div className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">Ops</h2>
      <p>Ocorreu um erro.</p>
      <Link
        href="/projects"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Clique aqui para voltar a lista.
      </Link>
    </div>
  )
}
