/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type AuthResponse = {
  __typename?: 'AuthResponse'
  token?: Maybe<Scalars['String']['output']>
  user?: Maybe<User>
}

export type AuthToken = {
  __typename?: 'AuthToken'
  createdAt?: Maybe<Scalars['String']['output']>
  expirationDate?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isRevoked?: Maybe<Scalars['Boolean']['output']>
  token?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['String']['output']>
  user?: Maybe<User>
}

export type AuthenticateInput = {
  secret: Scalars['String']['input']
}

export type Contact = {
  __typename?: 'Contact'
  company?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isActive?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  organization?: Maybe<Organization>
  phone?: Maybe<Scalars['String']['output']>
  pipelines?: Maybe<Array<Pipeline>>
  status?: Maybe<ContactStatus>
  updatedAt?: Maybe<Scalars['String']['output']>
}

export enum ContactStatus {
  Canceled = 'CANCELED',
  Contacted = 'CONTACTED',
  Discarded = 'DISCARDED',
  Lost = 'LOST',
  New = 'NEW',
  Proposal = 'PROPOSAL',
  Qualified = 'QUALIFIED',
  Won = 'WON',
}

export type ContactWhereInput = {
  company?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<ContactStatus>
}

export type CreateContactInput = {
  company?: InputMaybe<Scalars['String']['input']>
  email: Scalars['String']['input']
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
  phone?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<ContactStatus>
}

export type CreateLeadInput = {
  company?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  email: Scalars['String']['input']
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
  phone?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<LeadStatus>
}

export type CreateOrganizationInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
  slug: Scalars['String']['input']
}

export type CreatePipelineInput = {
  assignedUserId: Scalars['String']['input']
  contactId: Scalars['String']['input']
  description?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  leadId: Scalars['String']['input']
  priority?: InputMaybe<PipelinePriority>
  status?: InputMaybe<PipelineStatus>
  title: Scalars['String']['input']
}

export type CreateUserInput = {
  email: Scalars['String']['input']
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
  organizationId?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
}

export type DashboardMetrics = {
  __typename?: 'DashboardMetrics'
  /** Leads em processo (Contacted, Qualified, Proposal) */
  leadsInProcess?: Maybe<Scalars['Int']['output']>
  /** Porcentagem de crescimento mensal */
  monthlyGrowthPercentage?: Maybe<Scalars['Float']['output']>
  /** Novos leads este mês */
  newLeadsThisMonth?: Maybe<Scalars['Int']['output']>
  /** Número total de leads */
  totalLeads?: Maybe<Scalars['Int']['output']>
}

export type Lead = {
  __typename?: 'Lead'
  company?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isActive?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  organization?: Maybe<Organization>
  phone?: Maybe<Scalars['String']['output']>
  pipelines?: Maybe<Array<Pipeline>>
  status?: Maybe<LeadStatus>
  updatedAt?: Maybe<Scalars['String']['output']>
}

export enum LeadStatus {
  Canceled = 'CANCELED',
  Contacted = 'CONTACTED',
  Discarded = 'DISCARDED',
  Lost = 'LOST',
  New = 'NEW',
  Proposal = 'PROPOSAL',
  Qualified = 'QUALIFIED',
  Won = 'WON',
}

export type LeadWhereInput = {
  company?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<LeadStatus>
}

export type LoginInput = {
  email: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  authenticate?: Maybe<AuthResponse>
  contactCreate?: Maybe<Contact>
  contactDelete?: Maybe<Contact>
  contactUpdate?: Maybe<Contact>
  leadCreate?: Maybe<Lead>
  leadDelete?: Maybe<Lead>
  leadUpdate?: Maybe<Lead>
  login?: Maybe<Scalars['Boolean']['output']>
  logout?: Maybe<Scalars['Boolean']['output']>
  organizationCreate?: Maybe<Organization>
  organizationDelete?: Maybe<Organization>
  organizationUpdate?: Maybe<Organization>
  pipelineCreate?: Maybe<Pipeline>
  pipelineDelete?: Maybe<Pipeline>
  pipelineUpdate?: Maybe<Pipeline>
  refreshToken?: Maybe<AuthResponse>
  register?: Maybe<AuthResponse>
  userCreate?: Maybe<User>
  userDelete?: Maybe<User>
  userUpdate?: Maybe<User>
}

export type MutationAuthenticateArgs = {
  data: AuthenticateInput
}

export type MutationContactCreateArgs = {
  data: CreateContactInput
}

export type MutationContactDeleteArgs = {
  id: Scalars['ID']['input']
}

export type MutationContactUpdateArgs = {
  data: UpdateContactInput
  id: Scalars['ID']['input']
}

export type MutationLeadCreateArgs = {
  data: CreateLeadInput
}

export type MutationLeadDeleteArgs = {
  id: Scalars['ID']['input']
}

export type MutationLeadUpdateArgs = {
  data: UpdateLeadInput
  id: Scalars['ID']['input']
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationLogoutArgs = {
  data: RefreshTokenInput
}

export type MutationOrganizationCreateArgs = {
  data: CreateOrganizationInput
}

export type MutationOrganizationDeleteArgs = {
  id: Scalars['ID']['input']
}

export type MutationOrganizationUpdateArgs = {
  data: UpdateOrganizationInput
  id: Scalars['ID']['input']
}

export type MutationPipelineCreateArgs = {
  data: CreatePipelineInput
}

export type MutationPipelineDeleteArgs = {
  id: Scalars['ID']['input']
}

export type MutationPipelineUpdateArgs = {
  data: UpdatePipelineInput
  id: Scalars['ID']['input']
}

export type MutationRefreshTokenArgs = {
  data: RefreshTokenInput
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationUserCreateArgs = {
  data: CreateUserInput
}

export type MutationUserDeleteArgs = {
  id: Scalars['ID']['input']
}

export type MutationUserUpdateArgs = {
  data: UpdateUserInput
  id: Scalars['ID']['input']
}

export type Organization = {
  __typename?: 'Organization'
  contacts?: Maybe<Array<Contact>>
  createdAt?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isActive?: Maybe<Scalars['Boolean']['output']>
  leads?: Maybe<Array<Lead>>
  name?: Maybe<Scalars['String']['output']>
  pipelines?: Maybe<Array<Pipeline>>
  slug?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['String']['output']>
  users?: Maybe<Array<User>>
}

export type OrganizationWhereInput = {
  id?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type Pipeline = {
  __typename?: 'Pipeline'
  assignedUser?: Maybe<User>
  contact?: Maybe<Contact>
  createdAt?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isActive?: Maybe<Scalars['Boolean']['output']>
  lead?: Maybe<Lead>
  organization?: Maybe<Organization>
  priority?: Maybe<PipelinePriority>
  status?: Maybe<PipelineStatus>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['String']['output']>
}

export enum PipelinePriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT',
}

export enum PipelineStatus {
  Canceled = 'CANCELED',
  Contacted = 'CONTACTED',
  Discarded = 'DISCARDED',
  Lost = 'LOST',
  New = 'NEW',
  Proposal = 'PROPOSAL',
  Qualified = 'QUALIFIED',
  Won = 'WON',
}

export type PipelineWhereInput = {
  assignedUserId?: InputMaybe<Scalars['String']['input']>
  contactId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  leadId?: InputMaybe<Scalars['String']['input']>
  priority?: InputMaybe<PipelinePriority>
  status?: InputMaybe<PipelineStatus>
  title?: InputMaybe<Scalars['String']['input']>
}

export type Query = {
  __typename?: 'Query'
  contact?: Maybe<Contact>
  contacts?: Maybe<Array<Contact>>
  dashboardMetrics?: Maybe<DashboardMetrics>
  lead?: Maybe<Lead>
  leads?: Maybe<Array<Lead>>
  organization?: Maybe<Organization>
  organizations?: Maybe<Array<Organization>>
  pipeline?: Maybe<Pipeline>
  pipelines?: Maybe<Array<Pipeline>>
  user?: Maybe<User>
  users?: Maybe<Array<User>>
}

export type QueryContactArgs = {
  id: Scalars['ID']['input']
}

export type QueryContactsArgs = {
  where?: InputMaybe<ContactWhereInput>
}

export type QueryLeadArgs = {
  id: Scalars['ID']['input']
}

export type QueryLeadsArgs = {
  where?: InputMaybe<LeadWhereInput>
}

export type QueryOrganizationArgs = {
  id: Scalars['ID']['input']
}

export type QueryOrganizationsArgs = {
  where?: InputMaybe<OrganizationWhereInput>
}

export type QueryPipelineArgs = {
  id: Scalars['ID']['input']
}

export type QueryPipelinesArgs = {
  where?: InputMaybe<PipelineWhereInput>
}

export type QueryUserArgs = {
  id: Scalars['ID']['input']
}

export type QueryUsersArgs = {
  where?: InputMaybe<UserWhereInput>
}

export type RefreshTokenInput = {
  token: Scalars['String']['input']
}

export type RegisterInput = {
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  organizationId: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type UpdateContactInput = {
  company?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<ContactStatus>
}

export type UpdateLeadInput = {
  company?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<LeadStatus>
}

export type UpdateOrganizationInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type UpdatePipelineInput = {
  assignedUserId?: InputMaybe<Scalars['String']['input']>
  contactId?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  leadId?: InputMaybe<Scalars['String']['input']>
  priority?: InputMaybe<PipelinePriority>
  status?: InputMaybe<PipelineStatus>
  title?: InputMaybe<Scalars['String']['input']>
}

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
}

export type User = {
  __typename?: 'User'
  assignedPipelines?: Maybe<Array<Pipeline>>
  authTokens?: Maybe<Array<AuthToken>>
  createdAt?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  isActive?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  organization?: Maybe<Organization>
  role?: Maybe<UserRole>
  updatedAt?: Maybe<Scalars['String']['output']>
}

export enum UserRole {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Root = 'ROOT',
  User = 'USER',
}

export type UserWhereInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  organizationId?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
}

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<
    DocumentTypeDecoration<TResult, TVariables>['__apiType']
  >
  private value: string
  public __meta__?: Record<string, any> | undefined

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value)
    this.value = value
    this.__meta__ = __meta__
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value
  }
}
