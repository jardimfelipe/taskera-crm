"use client"

import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Client } from '@prisma/client'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { cn } from '@/lib/utils'
import { useDebounceValue } from 'usehooks-ts'

const fetcher = async (args: string) => {
  const [url, params] = args
  const res = await fetch(`${url}?name=${params}`)
  return await res.json()
}

type Props = {
  id: string;
  name: string;
  error?: string[]
  onChange: (client: Client) => void
  value: Client | null
}

export const ClientSelect = ({ id, name: fieldName, error: fieldError, value, onChange }: Props) => {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [debouncedValue, setValue] = useDebounceValue(name, 500)

  const { data: clients = [], error, isLoading } = useSWR<Client[]>(['/api/clients', debouncedValue], fetcher)

  const isEmpty = !clients.length && !isLoading && !error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleClientSelect = useCallback((client: Client) => {
    onChange(client)
    setOpen(false)
    setName("")
  }, [])

  useEffect(() => {
    setValue(name)
  }, [name])
  return (
    <div className="flex flex-col gap-2">

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-labelledby={id}
            className="justify-between text-muted-foreground mt-1"
          >
            {value?.name || 'Selecione um cliente'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command shouldFilter={false}>
            <CommandInput id={id} name={fieldName} value={name} onInput={handleChange} />
            <CommandList>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isEmpty ? <CommandEmpty>Nao encontramos clientes com esse nome.</CommandEmpty> : null}
              <CommandGroup>
                {clients.map((client) => (
                  <CommandItem
                    role="option"
                    key={client.name}
                    value={client.name}
                    onSelect={() => handleClientSelect(client)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.id === client.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {client.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {fieldError ? (
        <div className="flex flex-col gap-1">
          {fieldError.map((error, index) => (
            <span key={`picker-${index}`} className="text-xs text-red-500">
              {error}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
