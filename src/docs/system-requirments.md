### RBAC Multi-Tenants System

## Background

This project is a technical assessment, a Role-Based Access Control (RBAC) system designed to handle multiple tenants. It aims to provide a flexible and scalable solution for managing users, roles, permissions, and products across different tenants. The repository for this project can be found at https://github.com/omarAboElWafa/rbac-multi-tenants-system.

## Requirements

The requirements for this system are categorized using the MoSCoW prioritization:

### Must Have

- Multi-tenant support to segregate data and operations by tenant.
- Role-based access control to manage permissions for different roles within tenants.
- User management, including registration, authentication, and role assignment.
- CRUD operations for products, linked to specific tenants.
- Database schema to support multi-tenancy and RBAC.
- API documentation and endpoint structure.

### Should Have

- Logging and monitoring for system operations and user activities.
- Unit and integration tests to ensure system reliability.
- Secure password storage and authentication mechanisms.

### Could Have

- User interface for managing tenants, users, roles, and products.
- Reporting and analytics features for administrative users.
- Integration with external authentication providers (e.g., OAuth).

### Won't Have

- Support for non-relational databases.
- Features specific to non-web applications.

## Method

This section outlines the technical method to address the requirements, including the architecture design, database schema, and component diagrams.

[plantuml, ERD, png]
../../mnt/data/ERD.PNG

## Database Schema

The database schema is designed to support multi-tenancy and RBAC. The following tables are included:

- TENANTS: Stores information about each tenant.
- USERS: Stores user data, including email, password, tenant ID, and role ID.
- ROLES: Defines roles with specific permissions.
- PERMISSIONS: Manages the relationship between users and roles.
- PRODUCTS: Stores product information linked to tenants.

## Implementation

The implementation involves the following steps:

1. Set up the database using the provided schema.
2. Implement user authentication and authorization.
3. Create APIs for managing tenants, users, roles, and products.
4. Ensure secure password storage using hashing algorithms.
5. Develop unit and integration tests.
6. Document the API endpoints.

## Milestones

The implementation will be tracked using the following milestones:

1. Database setup and schema creation.
2. User authentication and authorization implementation.
3. API development for tenant, user, role, and product management.
4. Testing and quality assurance.
5. Final deployment and documentation.

## Gathering Results

To evaluate the success of the system, the following metrics will be used:

- Successful multi-tenant data segregation.
- Role-based access control accuracy.
- System performance under load.
- User feedback on functionality and usability.
