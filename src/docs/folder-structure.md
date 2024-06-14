## Structure of the project

<span>
<pre>
<br>
├── package-lock.json
├── package.json
├── src
|    ├── server.ts
|    ├── index.ts
|    ├── components
|    │   └── identity
|    │   |    ├── identity.controller.ts
|    │   |    ├── identity.model.ts
|    │   |    ├── identity.module.ts
|    │   |    ├── identity.router.ts
|    │   |    └── identity.service.ts
|    │   |
|    |   └── user
|    │   |    ├── user.controller.ts
|    │   |    ├── user.model.ts
|    │   |    ├── user.module.ts
|    │   |    ├── user.router.ts
|    │   |    └── user.service.ts
|    │   |
|    |   └── tenant
|    │       ├── tenant.controller.ts
|    │       ├── tenant.model.ts
|    │       ├── tenant.module.ts
|    │       ├── tenant.router.ts
|    │       └── tenant.service.ts
|    │
|    |
|    ├── config
|    │   ├── config.ts
|    │   ├── constants.ts
|    │   ├── env.ts
|    │   ├── index.ts
|    │   └── logger.ts
|    │
|    ├── middlewares
|    │   ├── auth.ts
|    │   ├── error.ts
|    │   ├── index.ts
|    │   └── validation.ts
|    │
|    ├── contracts
|    │   ├── errors.ts
|    │   ├── mailer.ts
|    │   ├── pagination.ts
|    │   ├── user.ts
|    │   |── tenant.ts    
|    │   └── identity.ts
|    │
|    ├── docs
|    │   ├── folder-structure.md
|    │   └── README.md   
|    |
|    ├── core
|    │   ├── IRepository.ts
|    │   └── DataBaseConnection.ts
|    |
|    ├── loaders
|    │    |
|    |    ├── v1
|    │    |   └── routes.ts
|    │    └── index.ts
|    │
|    └── utils
|        ├── cache.ts
|        ├── config.ts
|        ├── helpers.ts
|        ├── hooks.ts
|        ├── loggers.ts
|        ├── mailService.ts
|        ├── middlewares.ts
|        └── sms.ts
|
|
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── .eslintrc
├── docker-compose.yml
├── Dockerfile
├── README.md
├── tsconfig.json
└── eslintignore

</pre>
</span>
