import './modules/organizations'
import './modules/users'
import './modules/auth'
import './modules/leads'
import './modules/contacts'
import './modules/pipelines'

import { builder } from './shared/builder'

export const schema = builder.toSchema()
