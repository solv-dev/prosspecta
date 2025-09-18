'use client'

import { IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import { pipelineDelete } from '@/app/(dashboard)/pipelines/actions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { usePipelinesParams } from '@/hooks/use-pipelines-params'
import { Button } from '../ui/button'

export function PipelineDeleteDialog() {
  const { deletePipeline: deletePipelineId, setParams } = usePipelinesParams()

  const handleDelete = () => {
    if (!deletePipelineId) return

    pipelineDelete(deletePipelineId)
      .then(() => {
        toast.success('Pipeline deletado com sucesso!')
      })
      .catch(error => {
        toast.error('Erro ao deletar pipeline')
        console.error(error)
      })
      .finally(() => {
        setParams(null)
      })
  }

  return (
    <Dialog open={!!deletePipelineId} onOpenChange={() => setParams(null)}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader className='-mb-3.5'>
          <div className='flex items-center gap-2'>
            <div className='bg-primary/10 flex size-12 items-center justify-center rounded-lg'>
              <IconTrash className='text-primary size-5' />
            </div>
            <div>
              <DialogTitle className='-mb-1 text-lg font-semibold'>
                Deletar Pipeline
              </DialogTitle>
              <DialogDescription className='text-muted-foreground text-xs'>
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className='py-4'>
          <p className='text-muted-foreground text-sm'>
            Tem certeza de que deseja excluir este pipeline? Isso removerá
            permanentemente o pipeline e todas as informações associadas da sua
            organização.
          </p>
        </div>
        <DialogFooter className='gap-2'>
          <Button variant='outline' onClick={() => setParams(null)}>
            Cancelar
          </Button>
          <Button onClick={handleDelete}>Deletar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
