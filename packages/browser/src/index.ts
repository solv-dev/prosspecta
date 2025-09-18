import { Elysia, t } from 'elysia'
import { prisma } from './prisma'

const app = new Elysia()
  .get('/', () => 'API is alive!')
  .get('/leads', async () => {
    try {
      const leads = await prisma.lead.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      })
      return { success: true, data: leads }
    } catch (error) {
      console.log(error)
      return { success: false, error: 'Erro ao buscar leads' }
    }
  })
  .post(
    '/leads',
    async ({ body }) => {
      try {
        const leads = Array.isArray(body) ? body : [body]
        const createdLeads = await prisma.lead.createMany({
          data: leads,
        })
        return { success: true, data: createdLeads }
      } catch (error) {
        console.log(error)
        return { success: false, error: 'Erro ao criar leads' }
      }
    },
    {
      body: t.Union([
        t.Object({
          name: t.String(),
          email: t.String(),
          description: t.Optional(t.String()),
          phone: t.Optional(t.String()),
          company: t.Optional(t.String()),
          status: t.Optional(
            t.Enum({
              NEW: 'NEW',
              CONTACTED: 'CONTACTED',
              QUALIFIED: 'QUALIFIED',
              PROPOSAL: 'PROPOSAL',
              WON: 'WON',
              LOST: 'LOST',
              CANCELED: 'CANCELED',
              DISCARDED: 'DISCARDED',
            })
          ),
        }),
        t.Array(
          t.Object({
            name: t.String(),
            email: t.String(),
            description: t.Optional(t.String()),
            phone: t.Optional(t.String()),
            company: t.Optional(t.String()),
            status: t.Optional(
              t.Enum({
                NEW: 'NEW',
                CONTACTED: 'CONTACTED',
                QUALIFIED: 'QUALIFIED',
                PROPOSAL: 'PROPOSAL',
                WON: 'WON',
                LOST: 'LOST',
                CANCELED: 'CANCELED',
                DISCARDED: 'DISCARDED',
              })
            ),
          })
        ),
      ]),
    }
  )
  .delete(
    '/leads',
    async ({ body }) => {
      try {
        const ids = Array.isArray(body.ids) ? body.ids : [body.ids]
        const deletedLeads = await prisma.lead.updateMany({
          where: { id: { in: ids } },
          data: { isActive: false },
        })
        return { success: true, data: { deletedCount: deletedLeads.count } }
      } catch (error) {
        console.log(error)
        return { success: false, error: 'Erro ao deletar leads' }
      }
    },
    {
      body: t.Union([
        t.Object({ ids: t.String() }),
        t.Object({ ids: t.Array(t.String()) }),
      ]),
    }
  )

  .listen(3000)

console.log(
  `Leads browser API is running at ${app.server?.hostname}:${app.server?.port}`
)
