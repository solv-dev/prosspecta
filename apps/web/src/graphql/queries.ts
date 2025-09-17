export const ContactQuery = `
  query Contact($id: ID!) {
      contact(id: $id) {
          company
          createdAt
          email
          id
          isActive
          name
          phone
          status
          updatedAt
      }
  }
`

export const ContactsQuery = `
  query Contacts($where: ContactWhereInput) {
    contacts(where: $where) {
      id
      name
      email
      phone
      company
      status
      isActive
      createdAt
      updatedAt
      organization {
        id
        name
        slug
      }
    }
  }
`

export const LeadQuery = `
  query Lead($id: ID!) {
    lead(id: $id) {
      id
      name
      email
      phone
      company
      description
      status
      isActive
      createdAt
      updatedAt
      organization {
        id
        name
        slug
      }
      pipelines {
        id
        title
        status
        priority
      }
    }
  }
`

export const LeadsQuery = `
  query Leads($where: LeadWhereInput) {
    leads(where: $where) {
      id
      name
      email
      phone
      company
      description
      status
      isActive
      createdAt
      updatedAt
      organization {
        id
        name
        slug
      }
    }
  }
`

export const OrganizationQuery = `
  query Organization($id: ID!) {
    organization(id: $id) {
      id
      name
      slug
      isActive
      createdAt
      updatedAt
      users {
        id
        name
        email
        role
        isActive
      }
      contacts {
        id
        name
        email
        status
      }
      leads {
        id
        name
        email
        status
      }
      pipelines {
        id
        title
        status
        priority
      }
    }
  }
`

export const OrganizationsQuery = `
  query Organizations($where: OrganizationWhereInput) {
    organizations(where: $where) {
      id
      name
      slug
      isActive
      createdAt
      updatedAt
    }
  }
`

export const PipelineQuery = `
  query Pipeline($id: ID!) {
    pipeline(id: $id) {
      id
      title
      description
      status
      priority
      isActive
      createdAt
      updatedAt
      assignedUser {
        id
        name
        email
        role
      }
      contact {
        id
        name
        email
        phone
        company
        status
      }
      lead {
        id
        name
        email
        phone
        company
        description
        status
      }
      organization {
        id
        name
        slug
      }
    }
  }
`

export const PipelinesQuery = `
  query Pipelines($where: PipelineWhereInput) {
    pipelines(where: $where) {
      id
      title
      description
      status
      priority
      isActive
      createdAt
      updatedAt
      assignedUser {
        id
        name
        email
      }
      contact {
        id
        name
        email
      }
      lead {
        id
        name
        email
      }
    }
  }
`

export const UserQuery = `
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
      isActive
      createdAt
      updatedAt
      organization {
        id
        name
        slug
      }
      assignedPipelines {
        id
        title
        status
        priority
        contact {
          id
          name
          email
        }
        lead {
          id
          name
          email
        }
      }
      authTokens {
        id
        token
        isRevoked
        expirationDate
        createdAt
      }
    }
  }
`

export const UsersQuery = `
  query Users($where: UserWhereInput) {
    users(where: $where) {
      id
      name
      email
      role
      isActive
      createdAt
      updatedAt
      organization {
        id
        name
        slug
      }
    }
  }
`

export const DashboardMetricsQuery = `
  query DashboardMetrics {
    dashboardMetrics {
      totalLeads
      newLeadsThisMonth
      leadsInProcess
      monthlyGrowthPercentage
    }
  }
`
