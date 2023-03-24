# Prisma Auto CRUD

An express middleware that generates routes and CRUD controllers for every table defined in a prisma schema.

## Install

This module can be installed using NPM:

```
npm install @moreillon/prisma-auto-crud
```

## Usage

This module is intended to be used as an Express middleware.

```
const express = require( 'express')
const prismaAutoCrud = require( '@moreillon/prisma-auto-crud')
const { PrismaClient } = require('@prisma/client')

const prismaClient = new PrismaClient()

const {
    PORT = 7070
} = process.env


const app = express()
app.use(express.json())

app.use(prismaAutoCrud(prismaClient))


app.listen(PORT, () => {
    console.log(`[Express] Listening on port ${PORT}`)
})
```

**Important**: Currently, the primary key of each table must be an integer (or serial) named "id"

## Development notes

- using [Prisma generators](https://github.com/YassinEldeeb/create-prisma-generator) could be a better approach
