"use client";
import { Client } from '@prisma/client';
import { Mail, Phone, Plus, User } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

import { createClient } from '@/actions/clients/mutations/create-client';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';
import { useAction } from '@/hooks/use-action'
import { editClient } from '@/actions/clients/mutations/edit-client';

type Props = {
  client?: Client;
  trigger?: React.ReactNode;
}

export const ClientForm = ({ client, trigger }: Props) => {
  const { toast } = useToast()
  const route = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const isEditing = !!client
  const actionText = isEditing ? "Editar" : "Criar"
  const description = isEditing ? "Você pode alterar as informaçoes de seu cliente" : "Adicionando clientes, você poderá criar projetos e tarefas"

  const { execute: edit, fieldErrors: el } = useAction(editClient, {
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        description: 'O cliente foi editado com sucesso.',
      })
      setIsOpen(false)
    },
    onError: (error) => {
      console.log(error)
      toast({
        title: 'Erro',
        description: error,
        variant: 'destructive'
      })
    },
  })

  const { execute, fieldErrors } = useAction(createClient, {
    onSuccess: (client: Client) => {
      toast({
        title: 'Sucesso',
        description: 'O cliente foi adicionado com sucesso.',
      })
      setIsOpen(false)
      route.push(`clients/${client.id}`);
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: error,
        variant: 'destructive'
      })
    },
  })
  const onSubmit = (formData: FormData) => {
    const rawFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    }
    isEditing ? edit({ ...rawFormData, id: client.id }) : execute(rawFormData)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {
          trigger || <Button size="sm">
            <Plus className="mr-2 w-5 h-5" />
            {actionText} Cliente
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{actionText} Cliente</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form action={onSubmit}>
          <div className="w-80 mb-4">
            <Label htmlFor="name">
              Nome
            </Label>
            <Input
              startIcon={<User className="w-5 h-5" />}
              defaultValue={client?.name || ""}
              error={fieldErrors?.name}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="flex gap-4">
            <div className='flex-1'>
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                startIcon={<Mail className="w-5 h-5" />}
                defaultValue={client?.email || ""}
                error={fieldErrors?.email}
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div className='flex-1'>
              <Label htmlFor="phone">
                Telefone
              </Label>
              <Input
                startIcon={<Phone className="w-5 h-5" />}
                defaultValue={client?.phone || ""}
                error={fieldErrors?.phone}
                type="text"
                name="phone"
                id="phone"
              />
            </div>
          </div>
          <DialogFooter>
            <LoadingButton type="submit" size="sm" className="mt-4">
              {actionText} Cliente
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent >
    </Dialog >
  )
}
