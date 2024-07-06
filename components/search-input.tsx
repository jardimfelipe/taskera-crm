"use client";

import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useDebounceCallback } from 'usehooks-ts';

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';

type Props = {
  paramKey?: string;
}

export const SearchInput = ({ paramKey = "q" }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (value: string) => {
    const param = new URLSearchParams(searchParams);
    if (searchParams) {
      param.set(paramKey, value);
    } else {
      param.delete(paramKey);
    }

    replace(`${pathname}?${param.toString()}`);
  };

  const debouncedSearch = useDebounceCallback(handleSearch, 300);
  return (
    <div className="w-1/4">
      <Label htmlFor='search'>Buscar</Label>
      <Input id="search" startIcon={<Search className="w-5 h-5" />}
        defaultValue={searchParams.get(paramKey)?.toString()}
        onChange={e => debouncedSearch(e.target.value)}
      />
    </div>
  )
}