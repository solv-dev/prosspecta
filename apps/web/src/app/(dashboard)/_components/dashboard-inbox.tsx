import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export function DashboardInbox() {
  return (
    <Card className="border-none bg-black/50 px-1">
      <CardContent>
        <div className="flex flex-col w-full h-[22rem] items-center justify-center">
          <Label className="text-xs text-muted-foreground font-light">
            Nenhum lead recente
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
