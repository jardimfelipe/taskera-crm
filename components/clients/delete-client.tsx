"use client";

import { Client } from '@prisma/client'
import { Mail, Trash, User } from 'lucide-react'
import React, { useState } from 'react'

import { deleteClient } from '@/actions/clients/mutations/delete-client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useAction } from '@/hooks/use-action'

type Props = {
  client: Client
}

export const DeleteClient = ({ client }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { toast } = useToast()
  const { execute, isLoading } = useAction(deleteClient, {
    onError: (error) => {
      toast({
        title: 'Erro',
        description: error
      })
    },
    onSuccess: () => {
      toast({
        description: "Cliente excluído com sucesso",
      })
      setIsOpen(false)
    }
  })
  const handleDelete = () => {
    execute({ id: client.id })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-500 p-2"
        >
          <Trash className='mr-2 h-4 w-4' />
          Excluir cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja excluir esse cliente?</DialogTitle>
          <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>
        </DialogHeader>

        <div className="text-muted-foreground flex flex-col gap-2">
          <span className="flex items-center gap-1"><User /> {client.name}</span>
          <span className="flex items-center gap-1"><Mail /> {client.email}</span>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button disabled={isLoading} variant="destructive" onClick={handleDelete}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
