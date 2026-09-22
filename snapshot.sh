#!/usr/bin/env bash
# Refresh this snapshot from a branch of the library repo.
#
# Usage: ./snapshot.sh [branch]
# Default branch: main.
#
# What it does:
#   1. clones x1nx3r/altics-ui-react at the branch and builds @altics/ui
#   2. vendors the built package into vendor/altics-ui
#   3. refreshes stories/, .storybook/, styles and config from the branch
#   4. commits as "snapshot <branch> @ <sha>" and pushes
#
# The commit message records exactly what you are looking at, so this repo
# stays a per-branch review snapshot, not org-wide docs.
set -euo pipefail

LIB_REPO="https://github.com/x1nx3r/altics-ui-react.git"
BRANCH="${1:-main}"
LIBDIR="$(mktemp -d)/altics-ui-react"

echo "==> cloning $LIB_REPO @ $BRANCH"
git clone -q --depth 1 --branch "$BRANCH" "$LIB_REPO" "$LIBDIR" || {
  echo "branch '$BRANCH' not found — push it first" >&2
  exit 1
}
SHA="$(git -C "$LIBDIR" rev-parse --short HEAD)"
LABEL="$BRANCH @ $SHA"
echo "==> building @altics/ui ($LABEL)"
(cd "$LIBDIR" && npm ci -q && npm run build >/dev/null 2>&1)

echo "==> vendoring the built package"
rm -rf vendor
mkdir -p vendor/altics-ui
cp "$LIBDIR"/dist/index.js "$LIBDIR"/dist/index.cjs "$LIBDIR"/dist/style.css \
   "$LIBDIR"/dist/tailwind-preset.js "$LIBDIR"/dist/tailwind-preset.d.ts \
   "$LIBDIR"/dist/index.d.ts vendor/altics-ui/
VERSION="$(node -p "require('$LIBDIR/package.json').version")"
cat > vendor/altics-ui/package.json <<EOF
{
  "name": "@altics/ui",
  "version": "$VERSION+$SHA",
  "main": "./index.cjs",
  "module": "./index.js",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.js",
      "require": "./index.cjs"
    },
    "./styles.css": "./style.css",
    "./tailwind-preset": {
      "types": "./tailwind-preset.d.ts",
      "import": "./tailwind-preset.js"
    }
  }
}
EOF

echo "==> refreshing the docs app"
rm -rf stories .storybook
mkdir -p stories .storybook theme
cp "$LIBDIR"/docs/stories/*.tsx stories/
cp "$LIBDIR"/docs/.storybook/* .storybook/
cp "$LIBDIR"/docs/postcss.config.js .
cp "$LIBDIR"/src/theme/tokens.css theme/
# docs.css: tokens live beside it now
sed 's|../src/theme/tokens.css|./theme/tokens.css|' "$LIBDIR/docs/docs.css" > docs.css
# tailwind: preset + classes come from the built vendor bundle and stories
cat > tailwind.config.ts <<'EOF'
import preset from "./vendor/altics-ui/tailwind-preset.js";

// The vendored bundle carries the components' own classes; the stories add
// their markup utilities. Same preset the package ships.
export default {
  content: ["./vendor/altics-ui/**/*.js", "./stories/**/*.{ts,tsx}"],
  presets: [preset],
};
EOF
# package.json: docs deps plus the vendored library
node -e "
const base = require('$LIBDIR/docs/package.json');
const lib = require('$LIBDIR/package.json');
base.dependencies['@altics/ui'] = 'file:./vendor/altics-ui';
// the built bundle externalizes these: the snapshot repo has no parent
// node_modules to fall back to, so they ride along explicitly
for (const dep of ['clsx', 'tailwind-merge', '@floating-ui/react']) {
  base.dependencies[dep] = lib.dependencies[dep];
}
require('fs').writeFileSync('package.json', JSON.stringify(base, null, 2) + '\n');
"
npm install --package-lock-only -q
cat > README.md <<EOF
# altics-ui-react-storybook

Review snapshots of \`@altics/ui\` branches, built for GitHub Pages.

This snapshot: **$LABEL** (from \`altics-ui-react\`).

Refresh with \`./snapshot.sh [branch]\`.
EOF

mkdir -p examples
cp "$LIBDIR"/src/components/*/*.examples.tsx examples/ 2>/dev/null || true
python3 - <<'PYEOF2'
import re, glob
for f in glob.glob("examples/*.examples.tsx"):
    s = open(f).read()
    s = re.sub(r"from ['\"]\./[^'\"]+['\"]", 'from "@altics/ui"', s)
    s = re.sub(r"from ['\"]\.\./[^'\"]+['\"]", 'from "@altics/ui"', s)
    open(f, "w").write(s)
for f in glob.glob("stories/*.stories.tsx"):
    s = open(f).read()
    s2 = re.sub(r"from '\.\./\.\./src/components/[^']+\.examples'", lambda m: "from '../examples/" + m.group(0).split("/")[-1], s)
    if s2 != s:
        open(f, "w").write(s2)
PYEOF2
# stories + config: package imports, and tailwind scans the examples too
grep -rl "'\.\./\.\./src'" stories .storybook | xargs sed -i "s|'../../src'|'@altics/ui'|g"
python3 - <<'PYEOF2'
p = "tailwind.config.ts"
s = open(p).read()
s = s.replace('"./stories/**/*.{ts,tsx}"', '"./stories/**/*.{ts,tsx}", "./examples/**/*.{ts,tsx}"')
open(p, "w").write(s)
PYEOF2

echo "==> committing $LABEL"
git add -A
if git diff --cached --quiet; then
  echo "nothing changed — snapshot already current"
else
  git commit -q -m "snapshot $LABEL" -m "Built from altics-ui-react $BRANCH ($SHA). Refresh with ./snapshot.sh."
  git push -q -u origin main
fi
rm -rf "$(dirname "$LIBDIR")"
echo "done: $LABEL"
