// Archives the documentation as it stands, under the version it describes,
// so it stays readable after the next release replaces it.
//
// Run it once per release, BEFORE refreshing from the new release
// (`npm run docs:nodes` and the rest in the application repository): it takes
// its version from data/nodes.json, which still names the release being
// archived until then.
//
//   npm run archive-version
//
// What Docusaurus's own `docs:version` does not: the node reference is
// generated and untracked, so it is generated first and the archived copy is
// what gets committed; and the node pictures live in static/, shared by every
// version, so the archive takes its own copy and its pages point at that one —
// otherwise retaking the pictures for a new release would change an old one.

import {spawnSync} from 'node:child_process';
import {cp, readdir, readFile, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const {version} = JSON.parse(await readFile(join(root, 'data', 'nodes.json'), 'utf8'));
if (typeof version !== 'string' || !/^[\w.-]+$/.test(version)) throw new Error(`data/nodes.json names no version to archive: ${version}`);

const versions = existsSync(join(root, 'versions.json')) ? JSON.parse(await readFile(join(root, 'versions.json'), 'utf8')) : [];
if (versions.includes(version)) throw new Error(`${version} is already archived; refresh from the new release first`);

// One command line, through the shell, so npm and npx resolve on Windows too; the
// only argument from outside is the version, which is a plain version number.
const run = (command, args) => {
  const result = spawnSync([command, ...args].join(' '), {cwd: root, stdio: 'inherit', shell: true});
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed`);
};

// The node pages as this version has them, then Docusaurus's snapshot of every page.
run('npm', ['run', 'generate']);
run('npx', ['docusaurus', 'docs:version', version]);

// The pictures, copied and repointed, so this version keeps the ones it was published with.
const pictures = join(root, 'static', 'img', 'nodes');
const archived = `img/versions/${version}/nodes`;
if (existsSync(pictures)) {
  await cp(pictures, join(root, 'static', archived), {recursive: true});
  const pages = join(root, 'versioned_docs', `version-${version}`, 'nodes');
  for (const name of await readdir(pages)) {
    const page = join(pages, name);
    const text = await readFile(page, 'utf8');
    await writeFile(page, text.replaceAll('@site/static/img/nodes/', `@site/static/${archived}/`));
  }
}

console.log(`Archived ${version}. Commit versioned_docs/, versioned_sidebars/, versions.json and static/${archived}/.`);
