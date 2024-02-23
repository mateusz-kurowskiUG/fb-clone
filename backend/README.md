# backend

## Steps required to open the project

### In ./backend:

First of all, in `./backend` directory create `.env` file and fill it with data mentioned in `.env.example`

To setup database environment:

```bash
docker-compose up
```

To install dependencies:

```bash
bun install
```

To prepare db schema via _**Prisma**_:

```bash
bun prep
```

To run:

```bash
bun start
```

### In ./frontend

```bash
bun install
bun dev
```
