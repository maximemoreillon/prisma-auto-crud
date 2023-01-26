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
const prismaAutoCrud = require( './index.js')
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

## Development notes

- using [Prisma generators](https://github.com/YassinEldeeb/create-prisma-generator) could be a better approach

### To do:

- [x] Pagination
- [x] Sorting, ordering
- [x] Query filters
- And more...
