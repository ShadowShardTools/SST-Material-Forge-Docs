// Imports the application's user guide into docs/guide/, one page per topic.
//
// The guide's source of truth is `docs/user-guide.md` in the application
// repository — the same file the editor shows under Help (F1). This splits it
// into the pages below so the two never drift: change the guide there, then
//
//   node scripts/import-user-guide.mjs ../docs/user-guide.md
//
// and commit the regenerated pages. They are tracked rather than generated in
// CI because the application repository is not available to the docs build.
// Hand edits to docs/guide/*.md are overwritten by the next import.

import {mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] ?? join(root, '..', 'docs', 'user-guide.md'));
const outDir = join(root, 'docs', 'guide');
const lines = (await readFile(source, 'utf8')).replace(/\r\n/g, '\n').split('\n');

const headings = [];
lines.forEach((line, index) => {
  const match = /^(#{1,4}) (.+)$/.exec(line);
  if (match) headings.push({index, level: match[1].length, title: match[2].trim()});
});

/**
 * The body under a heading of the guide, without the heading itself, up to the
 * next heading of any level — so a topic does not drag its subtopics along.
 * `heading` gives it one of the page's own instead.
 */
function section(title, heading) {
  const at = headings.findIndex((h) => h.title === title);
  if (at < 0) throw new Error(`The guide has no section "${title}" — was it renamed?`);
  const end = headings[at + 1]?.index ?? lines.length;
  const body = lines.slice(headings[at].index + 1, end).join('\n').trim();
  return heading ? `## ${heading}\n\n${body}` : body;
}

/** The editor writes keys as [[Ctrl+Z]]; the site draws them as keycaps. */
function keycaps(text) {
  return text.replace(/\[\[([^\]]+)\]\]/g, (_, keys) =>
    ['+', '?', ','].includes(keys)
      ? `<kbd>${keys}</kbd>`
      : keys.split(/\+(?=.)/).map((key) => `<kbd>${key}</kbd>`).join('+'),
  );
}

const PAGES = [
  ['requirements', 'Requirements', 'What SST Material Forge needs to run, and how working resolution affects GPU memory.',
    [section('Requirements'), section('Resolution and GPU memory', 'Resolution and GPU memory')]],
  ['workspace', 'The workspace', 'The Forge and Viewer tabs, and every panel of the editor.',
    [section('Forge and Viewer', 'Forge and Viewer'), section('The workspace', 'The panels')]],
  ['building-a-material', 'Building a material', 'Adding and connecting nodes, adjusting settings, and the Output node that ends every material.',
    [section('Building a material')]],
  ['ports-and-values', 'Ports and values', 'What port and wire colors mean, and the range of values a node carries.',
    [section('Port colors', 'Port colors'), section('Values and range', 'Values and range')]],
  ['material-settings-and-presets', 'Material settings and presets', 'Inputs a material offers, and named presets of their values.',
    [section('Material settings and presets')]],
  ['subgraphs', 'Reusing work with subgraphs', 'Packaging part of a graph as a node of its own, and using one material inside another.',
    [section('Reusing work with subgraphs')]],
  ['custom-nodes', 'Writing your own nodes', 'Custom nodes written in code — making, importing and sharing them, how one declares its inputs, controls and passes, and the language they are written in.',
    [section('Writing your own nodes'), section('Declaring a node', 'Declaring a node'), section('Passes', 'Passes'), section('The language', 'The language')]],
  ['driving-settings-with-images', 'Driving settings with images', 'Letting a setting vary across the texture by connecting a map to it.',
    [section('Driving settings with images')]],
  ['organising-a-graph', 'Organising a graph', 'Groups, comments, reroutes, copy and paste, alignment and wire styles.',
    [section('Organising a graph')]],
  ['images-and-resources', 'Images and resources', 'Importing textures, environment maps, drawings and fonts into a project.',
    [section('Images'), section('Environment maps and fonts', 'Environment maps, drawings and fonts')]],
  ['asset-library', 'The asset library', 'Packages, textures, HDRIs, SVGs, fonts and custom nodes kept between projects, in folders of your own, and used in any of them.',
    [section('The asset library')]],
  ['coordinates-and-sampling', 'Coordinates and sampling', 'Bending texture coordinates with UV and UV Transform, and what happens past the edge of an image.',
    [section('Working in coordinates')]],
  ['placing-by-hand', 'Placing things by hand', 'The 2D View frame for UV Transform, Normal UV Transform, Text, SVG and Crop.',
    [section('Placing things by hand')]],
  ['splines', 'Splines', 'Drawing curves, carrying them between nodes, and drawing, filling, mapping and scattering along them.',
    [section('Splines')]],
  ['text-and-drawings', 'Text and drawings', 'Setting type with the Text node and drawing imported SVGs.',
    [section('Setting text', 'Setting text'), section('Drawings', 'Drawings')]],
  ['shapes-and-patterns', 'Shapes and patterns', 'The Shape node and its shapes, outlines, rounding and stretch; Checkerboard and Grid.',
    [section('Shapes and patterns')]],
  ['masks-and-layering', 'Masks and layering', 'Distance fields, polar transforms, blending by height, and the masks a height or normal map gives.',
    [section('Growing, bending and layering', 'Distance, polar and blending'), section('Masks from height', 'Masks from height'), section('Reflectance masks', 'Reflectance masks')]],
  ['signed-distance-fields', '2D signed distance fields', 'Building shapes as signed distances — joining them smoothly, reshaping and repeating them — and drawing them as fills, strokes, bevels and glows.',
    [section('2D signed distance fields')]],
  ['shaping-signals', 'Shaping signals and edges', 'Easing curves, bevels, sharpening, embossing, edge detection, swirl, posterization and color replacement.',
    [section('Easing a signal', 'Easing a signal'), section('Shaping and finding edges', 'Shaping and finding edges')]],
  ['saving-and-exporting', 'Saving and exporting', 'Project and package files, and baking maps for game engines and other tools.',
    [section('Saving, opening and exporting')]],
  ['settings', 'Settings', 'Editor, appearance, shortcuts, backup and privacy settings.',
    [section('Settings')]],
  ['troubleshooting', 'Troubleshooting', 'What to do when something goes wrong, finding your version, and what is recorded.',
    [section('When something goes wrong'), section('Which version am I on?', 'Which version am I on?'), section('Privacy', 'Privacy')]],
  ['keyboard-shortcuts', 'Keyboard shortcuts', 'The default keyboard and mouse bindings.',
    [section('Keyboard and mouse reference')]],
];

/** Where the guide refers to itself as one page, which the site splits up. */
const LINKS = {
  workspace: [
    ['Everything below, up to *Material settings and presets*, happens here.',
      'Everything in this guide up to [Material settings and presets](./material-settings-and-presets.md) happens here.'],
  ],
  'text-and-drawings': [
    ['Select the node to place it by hand in the 2D View, as below.',
      'Select the node to place it by hand in the 2D View — see [Placing things by hand](./placing-by-hand.md).'],
  ],
  'keyboard-shortcuts': [['| Open this guide |', '| Open the user guide |']],
  'custom-nodes': [['keeps a node in your asset library (see The asset library).', 'keeps a node in your [asset library](./asset-library.md).']],
};

await rm(outDir, {recursive: true, force: true});
await mkdir(outDir, {recursive: true});

let position = 1;
for (const [slug, title, description, parts] of PAGES) {
  let body = parts.join('\n\n');
  for (const [from, to] of LINKS[slug] ?? []) {
    if (!body.includes(from)) throw new Error(`${slug}: the guide no longer says "${from.slice(0, 50)}…" — update LINKS`);
    body = body.replace(from, to);
  }
  const front = ['---', `title: ${title}`, `sidebar_position: ${position++}`, `description: ${description}`, '---'].join('\n');
  await writeFile(join(outDir, `${slug}.md`), `${front}\n\n${keycaps(body).trim()}\n`);
}
console.log(`user guide: ${PAGES.length} pages from ${source} -> docs/guide/`);
