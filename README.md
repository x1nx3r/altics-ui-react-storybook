# altics-ui-react-storybook

Review snapshots of `@altics/ui` branches, served in Docker.

This snapshot: **feat/select-blocks @ 7d584b2** (from `altics-ui-react`).

## Build and run

```sh
docker compose up --build      # http://localhost:8080
```

Or with the plain CLI:

```sh
docker build -t altics-ui-react-storybook .
docker run --rm -p 8080:80 altics-ui-react-storybook
```

The image builds Storybook from this snapshot and serves the static output
with nginx at the domain root.

## Refresh the snapshot

```sh
./snapshot.sh [branch]         # default branch: main
```

The script clones `altics-ui-react` at that branch, builds `@altics/ui`,
vendors the built package, refreshes the stories and config, then commits and
pushes a `snapshot <branch> @ <sha>` commit. The commit message records
exactly what you are looking at.
