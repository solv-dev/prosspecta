export const AuthenticateMutation = `
  mutation Authenticate($secret: String!) {
      authenticate(data: { secret: $secret }) {
          token
      }
  }
`

export const LoginMutation = `
  mutation Login($data: LoginInput!) {
    login(data: $data)
  }
`

export const LogOutMutation = `
  mutation Logout($data: RefreshTokenInput!) {
      logout(data: $data)
  }
`

export const RefreshTokenMutation = `
  mutation RefreshToken($data: RefreshTokenInput!) {
    refreshToken(data: $data) {
      token
      user {
        id
        name
        email
        role
        isActive
        organization {
          id
          name
          slug
        }
      }
    }
  }
`

export const RegisterMutation = `
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
      user {
        id
        name
        email
        role
        isActive
        organization {
          id
          name
          slug
        }
      }
    }
  }
`

export const ContactCreateMutation = `
  mutation ContactCreate($data: CreateContactInput!) {
    contactCreate(data: $data) {
      id
      name
      email
      phone
      company
      status
      isActive
      createdAt
      updatedAt
    }
  }
`

export const ContactUpdateMutation = `
  mutation ContactUpdate($id: ID!, $data: UpdateContactInput!) {
    contactUpdate(id: $id, data: $data) {
      id
      name
      email
      phone
      company
      status
      isActive
      createdAt
      updatedAt
    }
  }
`

export const ContactDeleteMutation = `
  mutation ContactDelete($id: ID!) {
    contactDelete(id: $id) {
      id
      name
      email
    }
  }
`

export const LeadCreateMutation = `
  mutation LeadCreate($data: CreateLeadInput!) {
    leadCreate(data: $data) {
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
    }
  }
`

export const LeadUpdateMutation = `
  mutation LeadUpdate($id: ID!, $data: UpdateLeadInput!) {
    leadUpdate(id: $id, data: $data) {
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
    }
  }
`

export const LeadDeleteMutation = `
  mutation LeadDelete($id: ID!) {
    leadDelete(id: $id) {
      id
      name
      email
    }
  }
`

export const OrganizationCreateMutation = `
  mutation OrganizationCreate($data: CreateOrganizationInput!) {
    organizationCreate(data: $data) {
      id
      name
      slug
      isActive
      createdAt
      updatedAt
    }
  }
`

export const OrganizationUpdateMutation = `
  mutation OrganizationUpdate($id: ID!, $data: UpdateOrganizationInput!) {
    organizationUpdate(id: $id, data: $data) {
      id
      name
      slug
      isActive
      createdAt
      updatedAt
    }
  }
`

export const OrganizationDeleteMutation = `
  mutation OrganizationDelete($id: ID!) {
    organizationDelete(id: $id) {
      id
      name
      slug
    }
  }
`

export const PipelineCreateMutation = `
  mutation PipelineCreate($data: CreatePipelineInput!) {
    pipelineCreate(data: $data) {
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

export const PipelineUpdateMutation = `
  mutation PipelineUpdate($id: ID!, $data: UpdatePipelineInput!) {
    pipelineUpdate(id: $id, data: $data) {
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

export const PipelineDeleteMutation = `
  mutation PipelineDelete($id: ID!) {
    pipelineDelete(id: $id) {
      id
      title
    }
  }
`

export const UserCreateMutation = `
  mutation UserCreate($data: CreateUserInput!) {
    userCreate(data: $data) {
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

export const UserUpdateMutation = `
  mutation UserUpdate($id: ID!, $data: UpdateUserInput!) {
    userUpdate(id: $id, data: $data) {
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

export const UserDeleteMutation = `
  mutation UserDelete($id: ID!) {
    userDelete(id: $id) {
      id
      name
      email
    }
  }
`
