"use client";

import { File, Plus } from 'lucide-react'
import React, { useRef, useState } from 'react'

import { ProjectStatus, ProjectStatusColor } from '@/actions/projects/types'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/ui/loading-button';
import { editorProps, extensions } from '@/components/ui/rich-text-editor'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAction } from '@/hooks/use-action';
import { Task } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'next/navigation';
import { useEditor } from '@tiptap/react';
import { createTask } from '@/actions/tasks/create-task';

export const CreateTask = () => {
  const ref = useRef<HTMLFormElement>(null)

  const { toast } = useToast()
  const params = useParams()
  const editor = useEditor({
    extensions,
    editorProps
  })


  const { execute, fieldErrors } = useAction(createTask, {
    onSuccess: (task: Task) => {
      toast({
        title: 'Sucesso',
        description: `Tarefa ${task.name} criada com sucesso`,
      })
      handleDialogChange(false)
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: error,
        variant: 'destructive'
      })
    },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [formDates, setFormDates] = useState({
    startAt: undefined,
    endAt: undefined
  })

  const handleDateChange = (field: string, value: Date | undefined) => {
    setFormDates({
      ...formDates,
      [field]: value
    })
  }

  const handleDialogChange = (status: boolean) => {
    ref?.current?.reset()
    setFormDates({ startAt: undefined, endAt: undefined })
    editor?.commands.clearContent()
    setIsOpen(status)
  }

  const onSubmit = (formData: FormData) => {
    const rawFormData = {
      name: formData.get('name') as string,
      startAt: formDates.startAt as unknown as Date,
      endAt: formDates.endAt as unknown as Date,
      status: formData.get('status') as ProjectStatus,
      projectId: params.id as string
    }
    execute(rawFormData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 w-5 h-5" />
          Adicionar Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <form ref={ref} action={onSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Tarefa</DialogTitle>
            <DialogDescription>Adicione e acompanhe suas tarefas</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">

            <div className="flex gap-4">
              <div className="w-[300px]">
                <Label htmlFor="name">
                  Nome
                </Label>
                <Input
                  startIcon={<File className="w-5 h-5" />}
                  error={fieldErrors?.name}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className='flex-1 flex flex-col gap-2'>
                <Label htmlFor="email">
                  Data de início
                </Label>
                <DatePicker error={fieldErrors?.startAt} value={formDates.startAt} onChange={(value) => handleDateChange('startAt', value)} />
                <input type="hidden" name="startAt" id="startAt" value={formDates.startAt} />
              </div>
              <div className='flex-1 flex flex-col gap-2'>
                <Label htmlFor="phone">
                  Date de término
                </Label>
                <DatePicker error={fieldErrors?.endAt} value={formDates.endAt} onChange={(value) => handleDateChange('endAt', value)} />
                <input type="hidden" name="endAt" value={formDates.endAt} />
              </div>

              <div className="flex-1">
                <Label htmlFor="status">
                  Status
                </Label>
                <Select name='status' defaultValue={ProjectStatus.NOT_STARTED} error={fieldErrors?.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={ProjectStatus.COMPLETED}>Finalizado</SelectItem>
                      <SelectItem className={ProjectStatusColor[ProjectStatus.IN_PROGRESS]} value={ProjectStatus.IN_PROGRESS}>Em Progresso</SelectItem>
                      <SelectItem className={ProjectStatusColor[ProjectStatus.NOT_STARTED]} value={ProjectStatus.NOT_STARTED}>Nao iniciado</SelectItem>
                      <SelectItem className={ProjectStatusColor[ProjectStatus.PENDING]} value={ProjectStatus.PENDING}>Pendente</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <LoadingButton type="submit" size="sm" className="mt-4">Adicionar tarefa</LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent >
    </Dialog >
  )
}
