
# Workflow-API 
Workflow-API is a RESTful API built with NestJS, designed to streamline budget management and workflow processes within organizations. Providing a user-friendly interface and robust backend architecture.

## Important Note
To run the project successfully, ensure to run the backend service as well. Alternatively, you can run the [Workflow-Integration](https://github.com/Yeet2042/devpool-workflow-integration) project, which connects the [Workflow-API](https://github.com/Yeet2042/devpool-workflow-app) with the Angular frontend ([Workflow-APP](https://github.com/Yeet2042/devpool-workflow-app)).

## Requrement
- PostgreSQL
- [Workflow-APP](https://github.com/Yeet2042/devpool-workflow-app) (Fontend Project)
- Keycloak (optional)
## Use " Bun " for better experience :D
Install Bun ( Linux )
```bash
  curl -fsSL https://bun.sh/install | bash
```

Install Bun ( Windows )
```bash
  powershell -c "irm bun.sh/install.ps1 | iex"
```

## Initailize modules
```bash
  bun i
```

## Migrate Database

```bash
  bun run migrations:run
```

## Build and run the project
```bash
  # build
  bun run build

  # watch mode
  bun run start:dev

  # production mode
  bun run start:prod
```
## Tech Stack

**Server:** NestJS

