# backend

## Steps required to open the project

### In ./backend:

First of all, in `./backend` directory create `.env` file and fill it with data mentioned in `.env.example`

To setup database environment:

```bash
docker-compose up
```

To prepare db schema via _**Prisma**_:

```bash
bun prep
```

To install dependencies:

```bash
bun install
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

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
