/* eslint-disable */
import type { Prisma, Organization, User, AuthToken, Lead, Contact, Pipeline } from "/Users/cristianfreitas/www/prosspecta/node_modules/@prisma/client/index.js";
export default interface PrismaTypes {
    Organization: {
        Name: "Organization";
        Shape: Organization;
        Include: Prisma.OrganizationInclude;
        Select: Prisma.OrganizationSelect;
        OrderBy: Prisma.OrganizationOrderByWithRelationInput;
        WhereUnique: Prisma.OrganizationWhereUniqueInput;
        Where: Prisma.OrganizationWhereInput;
        Create: {};
        Update: {};
        RelationName: "users" | "leads" | "contacts" | "pipelines";
        ListRelations: "users" | "leads" | "contacts" | "pipelines";
        Relations: {
            users: {
                Shape: User[];
                Name: "User";
                Nullable: false;
            };
            leads: {
                Shape: Lead[];
                Name: "Lead";
                Nullable: false;
            };
            contacts: {
                Shape: Contact[];
                Name: "Contact";
                Nullable: false;
            };
            pipelines: {
                Shape: Pipeline[];
                Name: "Pipeline";
                Nullable: false;
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "organization" | "authTokens" | "assignedPipelines";
        ListRelations: "authTokens" | "assignedPipelines";
        Relations: {
            organization: {
                Shape: Organization;
                Name: "Organization";
                Nullable: false;
            };
            authTokens: {
                Shape: AuthToken[];
                Name: "AuthToken";
                Nullable: false;
            };
            assignedPipelines: {
                Shape: Pipeline[];
                Name: "Pipeline";
                Nullable: false;
            };
        };
    };
    AuthToken: {
        Name: "AuthToken";
        Shape: AuthToken;
        Include: Prisma.AuthTokenInclude;
        Select: Prisma.AuthTokenSelect;
        OrderBy: Prisma.AuthTokenOrderByWithRelationInput;
        WhereUnique: Prisma.AuthTokenWhereUniqueInput;
        Where: Prisma.AuthTokenWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Lead: {
        Name: "Lead";
        Shape: Lead;
        Include: Prisma.LeadInclude;
        Select: Prisma.LeadSelect;
        OrderBy: Prisma.LeadOrderByWithRelationInput;
        WhereUnique: Prisma.LeadWhereUniqueInput;
        Where: Prisma.LeadWhereInput;
        Create: {};
        Update: {};
        RelationName: "organization" | "pipelines";
        ListRelations: "pipelines";
        Relations: {
            organization: {
                Shape: Organization;
                Name: "Organization";
                Nullable: false;
            };
            pipelines: {
                Shape: Pipeline[];
                Name: "Pipeline";
                Nullable: false;
            };
        };
    };
    Contact: {
        Name: "Contact";
        Shape: Contact;
        Include: Prisma.ContactInclude;
        Select: Prisma.ContactSelect;
        OrderBy: Prisma.ContactOrderByWithRelationInput;
        WhereUnique: Prisma.ContactWhereUniqueInput;
        Where: Prisma.ContactWhereInput;
        Create: {};
        Update: {};
        RelationName: "organization" | "pipelines";
        ListRelations: "pipelines";
        Relations: {
            organization: {
                Shape: Organization;
                Name: "Organization";
                Nullable: false;
            };
            pipelines: {
                Shape: Pipeline[];
                Name: "Pipeline";
                Nullable: false;
            };
        };
    };
    Pipeline: {
        Name: "Pipeline";
        Shape: Pipeline;
        Include: Prisma.PipelineInclude;
        Select: Prisma.PipelineSelect;
        OrderBy: Prisma.PipelineOrderByWithRelationInput;
        WhereUnique: Prisma.PipelineWhereUniqueInput;
        Where: Prisma.PipelineWhereInput;
        Create: {};
        Update: {};
        RelationName: "organization" | "assignedUser" | "lead" | "contact";
        ListRelations: never;
        Relations: {
            organization: {
                Shape: Organization;
                Name: "Organization";
                Nullable: false;
            };
            assignedUser: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            lead: {
                Shape: Lead | null;
                Name: "Lead";
                Nullable: true;
            };
            contact: {
                Shape: Contact | null;
                Name: "Contact";
                Nullable: true;
            };
        };
    };
}