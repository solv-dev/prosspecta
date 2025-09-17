'use client'

import { IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import { contactDelete } from '@/app/(dashboard)/contacts/actions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useContactsParams } from '@/hooks/use-contacts-params'
import { Button } from '../ui/button'

export function ContactDeleteDialog() {
  const { deleteContact: deleteContactId, setParams } = useContactsParams()

  const handleDelete = () => {
    if (!deleteContactId) return

    contactDelete(deleteContactId)
      .then(() => {
        toast.success('Contato deletado com sucesso!')
      })
      .catch((error) => {
        toast.error('Erro ao deletar contato')
        console.error(error)
      })
      .finally(() => {
        setParams(null)
      })
  }

  return (
    <Dialog open={!!deleteContactId} onOpenChange={() => setParams(null)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="-mb-3.5">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
              <IconTrash className="text-primary size-5" />
            </div>
            <div>
              <DialogTitle className="-mb-1 text-lg font-semibold">
                Deletar Contato
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs">
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground text-sm">
            Tem certeza de que deseja excluir este contato? Isso removerá
            permanentemente o contato e todas as informações associadas da sua
            organização.
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setParams(null)}>
            Cancelar
          </Button>
          <Button onClick={handleDelete}>Deletar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
