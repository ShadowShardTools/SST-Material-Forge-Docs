// Generates the node reference (docs/nodes/) from data/nodes.json.
//
// data/nodes.json is exported from the editor's own node registry by
// `build/exportNodeReference.mjs` in the application repository, so every name,
// description, port and default here is the one the editor shows. Edit the
// application, re-export, and commit the JSON — never the generated pages,
// which are rebuilt before every `start` and `build` and are not tracked.

import {existsSync} from 'node:fs';
import {mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'docs', 'nodes');
/** Pictures of each node, taken by `npm run docs:shots` in the application repository. */
const shotDir = join(root, 'static', 'img', 'nodes');
const data = JSON.parse(await readFile(join(root, 'data', 'nodes.json'), 'utf8'));

/** One line under each heading: what the category is for. */
const BLURBS = {
  Noise: 'Random signals to start a surface from — smooth, cellular, fractal and directional noise.',
  Patterns: 'Regular and scattered shapes: bricks, tiles, grids, scatters and atlases.',
  Splines: 'Curves you draw, carried between nodes on a wire: drawn, filled, mapped, scattered along, moved and bridged.',
  Gradients: 'Ramps and splits across the texture.',
  Inputs: 'Values and resources brought into the graph: textures, text, drawings, coordinates, constants and the material\'s own inputs.',
  Adjustments: 'Tone and color changes that work pixel by pixel: levels, hue, contrast, histograms and remapping.',
  Effects: 'Filters that read a neighbourhood: blur, sharpen, denoise, edges, emboss, bevel and painterly smoothing.',
  Transform: 'Moving, turning, cropping, mirroring, bending and tiling an image.',
  Composite: 'Layering one image over another, by opacity or by height.',
  Masks: 'Masks built from shapes: flood fill and its colorings, and distance fields.',
  '2D SDF': 'Shapes as signed distance fields: dozens of primitives, joined smoothly, reshaped, repeated, and drawn as fills, strokes, bevels and glows.',
  Surface: 'Reading a surface out of height and normal maps — normals, curvature, occlusion, shadows — and reflectance.',
  Channels: 'Splitting, combining and converting channels.',
  Math: 'Arithmetic, ranges, rounding, interpolation, trigonometry, vectors and matrices on whole images, under sub-headings.',
  Conditional: 'Choosing between inputs, per pixel.',
  SubGraphs: 'Your own subgraphs, used as nodes.',
  Material: 'The Output node and the package\'s materials used as nodes.',
};

/** Categories with no fixed nodes, explained instead of listed. */
const PROSE_ONLY = {
  SubGraphs:
    'This heading lists the subgraphs in your project, so what it holds is yours. See [Reusing work with subgraphs](../guide/subgraphs.md) for how to make one and declare its inputs and outputs.',
  Material:
    'Every material ends in one **Output** node, which is part of the material rather than something added from the menu. This heading also lists the package\'s other materials, so one material can be built on another. See [Building a material](../guide/building-a-material.md).',
};

const TYPE_NAMES = {
  boolean: 'Boolean',
  int: 'Integer',
  grayscale: 'Grayscale',
  rg: 'RG',
  rgb: 'Color (RGB)',
  rgba: 'Color + alpha (RGBA)',
  spline: 'Spline (curves)',
  sdf2d: '2D SDF (signed distance)',
  matrix: 'Matrix',
  text: 'Text',
  font: 'Font',
  svg: 'Drawing (SVG)',
};

const KIND_NAMES = {
  float: 'Number',
  int: 'Whole number',
  bool: 'On / off',
  enum: 'Choice',
  color: 'Color',
  gradient: 'Gradient',
  spline: 'Curve',
  splines: 'Curves',
  text: 'Text',
  texture: 'Texture',
  svg: 'Drawing',
  font: 'Font',
  matrix: 'Matrix',
  outputs: 'Output list',
};

const slug = (category) => category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** Text from the registry, made safe for MDX: no JSX braces or tags, no table breaks. */
function prose(text) {
  return String(text).replace(/[{}<>]/g, (c) => ({'{': '\\{', '}': '\\}', '<': '&lt;', '>': '&gt;'})[c]);
}
const cell = (text) => prose(text).replace(/\|/g, '\\|').replace(/\n/g, ' ');

function number(value) {
  if (typeof value !== 'number') return String(value);
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(4)));
}

function color(value) {
  if (!value || typeof value !== 'object') return '';
  const hex = ['r', 'g', 'b']
    .map((k) => Math.round(Math.max(0, Math.min(1, value[k] ?? 0)) * 255).toString(16).padStart(2, '0'))
    .join('');
  const alpha = typeof value.a === 'number' && value.a !== 1 ? `, alpha ${number(value.a)}` : '';
  return `\`#${hex.toUpperCase()}\`${alpha}`;
}

function defaultOf(parameter) {
  switch (parameter.kind) {
    case 'float':
    case 'int':
      return number(parameter.default);
    case 'bool':
      return parameter.default ? 'On' : 'Off';
    case 'enum':
      return cell(parameter.options.find((o) => o.value === parameter.default)?.label ?? parameter.default);
    case 'color':
      return color(parameter.default);
    case 'text':
      return parameter.default ? `“${cell(parameter.default)}”` : '—';
    case 'matrix':
      return 'Identity';
    default:
      return '—';
  }
}

function rangeOf(parameter) {
  if (parameter.kind === 'enum') return parameter.options.map((o) => cell(o.label)).join(', ');
  if ((parameter.kind === 'float' || parameter.kind === 'int') && parameter.min !== undefined) {
    return `${number(parameter.min)} to ${number(parameter.max)}`;
  }
  if (parameter.kind === 'float' || parameter.kind === 'int') return 'Any value';
  return '';
}

/** "Shown when Mode is Signed" — the condition in the labels the inspector uses. */
function conditionOf(parameter, siblings) {
  const condition = parameter.visibleWhen;
  if (!condition) return '';
  const owner = siblings.find((p) => p.id === condition.parameter);
  if (!owner) return '';
  const labels = condition.values.map((v) => owner.options?.find((o) => o.value === v)?.label ?? v);
  const list = labels.length > 1 ? `${labels.slice(0, -1).join(', ')} or ${labels.at(-1)}` : labels[0];
  return `Shown when ${owner.label} is ${list}.`;
}

function portTable(ports, heading) {
  if (ports.length === 0) return '';
  const rows = ports.map((p) => {
    const type = TYPE_NAMES[p.type] ?? p.type;
    return `| ${cell(p.label)} | ${p.adaptive ? `${type}, follows its inputs` : type} |`;
  });
  return [`**${heading}**`, '', `| Port | Carries |`, `| --- | --- |`, ...rows, ''].join('\n');
}

function settingsTable(parameters, drivable, settable) {
  if (parameters.length === 0) return '';
  const rows = parameters.map((p) => {
    const name = p.group && p.group !== p.label ? `${cell(p.group)} › ${cell(p.label)}` : cell(p.label);
    const notes = [drivable.has(p.id) ? 'Can be driven by a map.' : '', settable.has(p.id) ? 'Can be set by a material input.' : '', conditionOf(p, parameters)].filter(Boolean).join(' ');
    return `| ${name} | ${KIND_NAMES[p.kind] ?? p.kind} | ${defaultOf(p)} | ${rangeOf(p)} | ${notes} |`;
  });
  return ['**Settings**', '', '| Setting | Kind | Default | Range or choices | Notes |', '| --- | --- | --- | --- | --- |', ...rows, ''].join('\n');
}

/**
 * The node in an example graph and what it makes there, side by side, when
 * pictures of it have been taken. A node without them is described in words
 * alone rather than given a broken image.
 */
function shots(node) {
  const example = `${node.type}.png`;
  const result = `${node.type}-result.png`;
  if (!existsSync(join(shotDir, example)) || !existsSync(join(shotDir, result))) return '';
  const label = node.label.replace(/"/g, '&quot;');
  const figure = (file, alt, caption) =>
    `<figure className="node-shot"><img src={require('@site/static/img/nodes/${file}').default} alt="${alt}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
  return [
    '<div className="node-shots">',
    figure(example, `${label} in an example graph`, 'Example graph'),
    figure(result, `What ${label} makes in the example`, 'Result'),
    '</div>',
    '',
  ].join('\n');
}

function nodeSection(node) {
  const drivable = new Set(node.inputs.filter((p) => p.drives && !p.fromInput).map((p) => p.drives));
  const settable = new Set(node.inputs.filter((p) => p.drives && p.fromInput).map((p) => p.drives));
  const inputs = node.inputs.filter((p) => !p.drives);
  const tags = node.tags?.length ? `\n_Also found in the node menu by searching for:_ ${node.tags.map(cell).join(', ')}.\n` : '';
  return [
    `## ${cell(node.label)} {#${node.type}}`,
    '',
    prose(node.description),
    tags,
    shots(node),
    portTable(inputs, 'Inputs'),
    portTable(node.outputs, 'Outputs'),
    settingsTable(node.parameters, drivable, settable),
  ].join('\n');
}

const byCategory = new Map(data.categories.map((c) => [c, []]));
for (const node of data.nodes) byCategory.get(node.category)?.push(node);

// A category with sub-headings (Math) lists its nodes as the menu does: a
// sub-heading at a time, alphabetically within each.
const subheadings = data.subcategories ?? {};
for (const [category, subs] of Object.entries(subheadings)) {
  const order = (node) => subs.indexOf(node.subcategory);
  byCategory.get(category)?.sort((a, b) => order(a) - order(b) || a.label.localeCompare(b.label));
}

/** The list of links at the top of a category's page, grouped by sub-heading where it has them. */
function contents(category, nodes) {
  const link = (n) => `[${cell(n.label)}](#${n.type})`;
  const subs = subheadings[category];
  if (!subs) return nodes.map((n) => `- ${link(n)}`);
  return subs.flatMap((sub) => {
    const members = nodes.filter((n) => n.subcategory === sub);
    return members.length > 0 ? [`- **${sub}:** ${members.map(link).join(', ')}`] : [];
  });
}

await rm(outDir, {recursive: true, force: true});
await mkdir(outDir, {recursive: true});

const banner = `{/* Generated by scripts/generate-node-docs.mjs from data/nodes.json — do not edit. */}`;

// The overview: every category, how many nodes it holds, and where to read about them.
const overviewRows = data.categories.map((category) => {
  const count = byCategory.get(category).length;
  const what = count > 0 ? `${count} node${count === 1 ? '' : 's'}` : 'Your own';
  return `| [${category}](./${slug(category)}.md) | ${what} | ${BLURBS[category] ?? ''} |`;
});

await writeFile(
  join(outDir, 'index.md'),
  [
    '---',
    'title: Node reference',
    'slug: /nodes',
    'sidebar_position: 0',
    'sidebar_label: Overview',
    'description: Every node in SST Material Forge, by category, with its ports and settings.',
    '---',
    '',
    banner,
    '',
    `SST Material Forge ${data.version} has **${data.nodes.length} nodes** in ${data.categories.length} categories. The node menu lists the categories in the order a graph is built: make something, change it, read a surface out of it, then the plumbing that carries values about.`,
    '',
    'Each page lists its nodes with what they do, the ports they take and give, and every setting with its default and range. Settings marked *can be driven by a map* have a plug button in Properties; see [Driving settings with images](../guide/driving-settings-with-images.md). Those marked *can be set by a material input* have one too, for wiring a material’s input to them; see [Material settings and presets](../guide/material-settings-and-presets.md).',
    '',
    '| Category | Holds | For |',
    '| --- | --- | --- |',
    ...overviewRows,
    '',
    'Use the search box at the top of the page to find a node by name or by what it is for.',
    '',
  ].join('\n'),
);

let position = 1;
for (const category of data.categories) {
  const nodes = byCategory.get(category);
  const body = nodes.length > 0
    ? [
        `${BLURBS[category] ?? ''}`,
        '',
        ...contents(category, nodes),
        '',
        ...nodes.map(nodeSection),
      ]
    : [`${BLURBS[category] ?? ''}`, '', PROSE_ONLY[category] ?? ''];
  await writeFile(
    join(outDir, `${slug(category)}.md`),
    [
      '---',
      `title: ${category}`,
      `sidebar_position: ${position++}`,
      `description: ${JSON.stringify(BLURBS[category] ?? category)}`,
      'toc_max_heading_level: 2',
      '---',
      '',
      banner,
      '',
      ...body,
      '',
    ].join('\n'),
  );
}

// The homepage quotes the count and version; a small file keeps the full data out of its bundle.
const statsDir = join(root, 'src', 'generated');
await mkdir(statsDir, {recursive: true});
await writeFile(
  join(statsDir, 'stats.json'),
  `${JSON.stringify({version: data.version, nodes: data.nodes.length, categories: data.categories.length}, null, 2)}
`,
);

await writeFile(join(outDir, '_category_.json'), `${JSON.stringify({label: 'Node reference', collapsed: false}, null, 2)}\n`);
console.log(`node reference: ${data.nodes.length} nodes, ${data.categories.length} pages -> docs/nodes/`);
