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
|    │   └── user
|    │   |    ├── user.controller.ts
|    │   |    ├── user.entity.ts
|    │   |    ├── user.module.ts
|    │   |    ├── user.router.ts
|    │   |    └── user.service.ts
|    │   |
|    |   └── tenant
|    │   |    ├── tenant.controller.ts
|    │   |    ├── tenant.entity.ts
|    │   |    ├── tenant.module.ts
|    │   |    ├── tenant.router.ts
|    │   |    └── tenant.service.ts
|    │   |_ permissions
|    │   |    ├── permissions.controller.ts
|    │   |    ├── permissions.entity.ts
|    │   |    ├── permissions.module.ts
|    │   |    ├── permissions.router.ts
|    │   |    └── permissions.service.ts
|    │   |
|    |   └── product
|    │   |    ├── product.controller.ts
|    │   |    ├── product.entity.ts
|    │   |    ├── product.module.ts
|    │   |    ├── product.router.ts
|    │   |    └── product.service.ts
|    │   |
|    |   └── role
|    │       ├── role.controller.ts
|    │       ├── role.entity.ts
|    │       ├── role.module.ts
|    │       ├── role.router.ts
|    │       └── role.service.ts
|    │
|    |
|    ├── config
|    │   ├── data-source.ts
|    │   ├── entities.ts
|    │   ├── env.ts
|    │   ├── role.ts
|    │   └── logger.ts (future)
|    │
|    ├── middlewares
|    │   ├── auth.ts
|    │   ├── authorization.ts
|    │   ├── index.ts
|    │   └── validation.ts
|    │
|    ├── contracts
|    │   ├── permissions.ts
|    │   ├── product.ts
|    │   ├── pagination.ts  (future)
|    │   ├── user.ts
|    │   |── tenant.ts    
|    │   └── mailer.ts   (future)
|    │
|    ├── docs
|    │   ├── folder-structure.md
|    │   └── README.md   
|    |
|    ├── libs
|    │   ├── schemas
|    │   |   ├── user.ts
|    │   |   ├── tenant.ts
|    │   |   ├── role.ts
|    │   |   ├── permissions.ts
|    │   |   └── shared.ts
|    │   |   └── product.ts
|    │   |
|    │   └── cache.ts
|    |
|    ├── loaders
|    │    |
|    |    ├── v1
|    │    |   └── routes.ts
|    │    └── index.ts  (future)
|    │
|    └── utils
|        ├── ApiError.ts
|        ├── ApiResponse.ts  (future)
|        ├── cryptoHelpers.ts
|        ├── hooks.ts  (future)
|        ├── loggers.ts  (future)
|        ├── mailService.ts (future)
|        └── sms.ts (future)
|
|
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── .prettierignore
├── .prettierrc.json
├── .editorconfig
├── .eslintrc
├── .eslintignore
├── docker-compose.yml
├── Dockerfile
├── README.md
├── tsconfig.json
└── LICENSE

</pre>
</span>
