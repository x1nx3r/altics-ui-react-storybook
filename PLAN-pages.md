# Plan: one application that owns all Storybook versions

**Status:** Draft, 2026-09-23.

This plan replaces the current method. The current method uses one commit in the
storybook repository as one version.

## 1. Goal

- Supply many Storybook versions of `@altics/ui` from one address.
- Show the active versions on an admin page.
- Start a build on demand from the admin page.
- Permit a whitelist of repositories only.
- Keep one application. Do not make one application for each version.

## 2. Terms

- **Project:** one library. Example: `altics-ui`.
- **Ref:** one branch or tag. Example: `master`.
- **Build:** one immutable result of the Storybook build for a project and a ref.
- **Served path:** the public address of a ref. Example: `/altics-ui/master/`.
- **Active build:** the build that the server supplies for a served path.

## 3. Why the current method does not work

The storybook repository holds one state. That state is one version. A new
version replaces the old version.

Three problems follow:

1. **No version history.** A push replaces the live site. You cannot compare two
   versions at one time.
2. **The stories live in one place only.** The stories exist in the fork
   `x1nx3r/altics-ui-react`, branch `feat/select-blocks`, only. The refs
   `origin/master` and `upstream/master` have no `docs/` directory. A build from
   those refs has no stories.
3. **Autodocs is empty.** The current snapshot vendors the built package. The
   docgen tool cannot read a built bundle. The property tables are empty. Refer
   to section 12.

## 4. Decision

Use Option B. One application owns all versions.

Do not use Option A. Option A makes one Coolify application for each version.
Option A causes application sprawl and a build queue on the host.

The host application is the control plane. The build does not run on the host.

## 5. Architecture

Four parts:

1. **The host application.** One Coolify application. It supplies the static
   files, the admin page, and the ingest endpoint. It keeps the registry.
2. **The build workflow.** One central GitHub Actions workflow. It builds one
   ref. It sends the result to the host application.
3. **Cloudflare Access.** It protects the admin page and the ingest endpoint.
4. **Cloudflare Tunnel.** It supplies `pages.x1nx3r.dev` to the Coolify proxy.
   The tunnel catch-all already covers `*.x1nx3r.dev`.

## 6. Data layout

```
/data/builds/<project>/<ref>/<sha>/   one immutable build
/data/served/<project>/<ref>          a link to the active build
/data/registry.json                   the whitelist, the state, and the index
```

The server supplies the tree below `/data/served`.

## 7. Flow

1. The operator selects a repository and a ref on the admin page.
2. The application sends a `workflow_dispatch` event to GitHub. The event
   contains the repository, the ref, and the target path.
3. The workflow reads the central recipe, gets the source of the ref, and builds
   Storybook. The base path agrees with the target path.
4. The workflow sends the build to the ingest endpoint. The ingest endpoint
   obeys Cloudflare Access with a service token.
5. The application unpacks the build into `/data/builds/<project>/<ref>/<sha>/`.
6. The application points the link at the new build. The served path shows the
   new build.
7. The application updates the index.

## 8. Admin page

The admin page does these tasks:

- Show the builds for each project and ref.
- Activate a build or deactivate a build.
- Point a ref at an older build. This action is a rollback.
- Start a build.
- Remove an old build.

The admin page shows the current commit, the build time, and the size.

## 9. Whitelist

The registry keeps the whitelist. Each entry has a project, a repository, and
permitted refs.

The application obeys the whitelist at two times:

- Before it sends a dispatch event.
- Before it unpacks a build.

Thus a bad build cannot write to a path outside the whitelist.

## 10. Security rules

1. **Do not build on the host.** A build of a strange repository runs the code
   of that repository. Keep the build on a GitHub runner.
2. **Separate the secrets.** Use two jobs. The build job gets the source and no
   secret. The deploy job has the secret and gets no source.
3. **Protect the ingest endpoint.** Use Cloudflare Access with a service token.
   Add an HMAC on the body. Use a safe unpack tool.
4. **Protect the admin page.** Put the admin path behind Cloudflare Access. The
   application needs no login code.
5. **Limit the ingest path.** The ingest endpoint accepts a path from the
   whitelist only.

## 11. Repository roles

- **Storybook repository** (`x1nx3r/altics-ui-react-storybook`): the recipe. It
  holds the template, the canonical stories, and the central build workflow.
- **Host repository** (new, `x1nx3r/pages`): the generic host application. It
  has no knowledge of `@altics/ui`.
- **Library repositories** (the fork, the upstream, and the other fork): no
  change.

The target repositories need no workflow. The central workflow gets their
source.

## 12. Source ingest

The current snapshot vendors the built package. Autodocs gives empty property
tables with that method. A test gave these results:

| Method | Result |
|---|---|
| `react-docgen` on the vendored bundle | Error: multiple exported components |
| `react-docgen-typescript` on the vendored `index.d.ts` | No component and no properties. The file points to `./components/button`, which does not exist |
| `react-docgen` on the library source `Button.tsx` | Success: `variant, size, loading, leadingIcon, trailingIcon, text, backgroundColor, textColor, type` |

Thus the new method vendors the library **source**.

Facts about the source:

- The source has no path alias. `baseUrl` and `paths` are empty, and no file
  uses `@/`.
- The source is 12 MB and 1357 files.
- The story files can import the source with a relative path. A Vite alias also
  works.

This change also repairs a defect. The current snapshot copies `dist/index.d.ts`
only. That file points to files that the snapshot does not copy.

## 13. Cost

- The base path is fixed at build time. The path cannot change after the build.
  Thus the served path must not contain the commit ID.
- The application depends on GitHub Actions. If Actions is down, the operator
  cannot deploy. Keep a manual upload path.
- The application is a small service. It needs a volume, a backup, and updates.

## 14. Phases

1. **Host, ingest, and stable paths.** No user interface. Prove this sequence: a
   build goes in, a version comes out at a stable path.
2. **Admin page.** Add activate, deactivate, rollback, and the build button.
3. **Whitelist, retention, and manual upload.** Add the limit of N builds for
   each ref.

## 15. Open decisions

| Item | Recommended value |
|---|---|
| Served path | `pages.x1nx3r.dev/<project>/<ref>/` |
| Admin and ingest address | `pages-admin.x1nx3r.dev`, behind Cloudflare Access |
| Registry store | `registry.json` on the volume |
| Host application | One small Node or Bun server |
| Retention | Keep the last 5 builds for each ref |
| Whitelist granularity | Repository level, with an optional ref pattern |

## 16. Next step

Start phase 1. Make the host application and the central workflow. Prove that
`dionisius77/altics-ui-react@master` lands at `/altics-ui/master/` with real
autodocs and full property tables.
