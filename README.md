# Auto CRUD

At its core, Auto CRUD is an express middleware that generates routes and CRUD controllers for every table defined in a prisma schema.
As such, it can be integrated in an existing Express app to kickstart a project involving CRUD.
On the other hand, if the functionalities of Auto CRUD can be used as is, it is also provided as a Docker container.

## Usage as a module

### Install

This module can be installed using NPM:

```
npm install @moreillon/prisma-auto-crud
```

### Usage

This module is intended to be used as an Express middleware.

```typescript
import express from "express"
import { PrismaClient } from "@prisma/client"
import autoCrud from "@moreillon/prisma-auto-crud"

const prismaClient = new PrismaClient()

const { PORT = 7070 } = process.env

const app = express()
app.use(express.json())

app.use(autoCrud(prismaClient))

app.listen(PORT, () => {
  console.log(`[Express] Listening on port ${PORT}`)
})
```

## Usage as a Docker container

If Auto CRUD does not need any additional customization, it can be deployed as a Docker container.

```bash
docker run \
-e DATABASE_URL="postgresql://user:pass@localhost:30432/db?schema=public" \
-p 8080:80 \
moreillon/auto-crud
```
