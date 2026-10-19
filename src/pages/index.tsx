import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
// Written by scripts/generate-node-docs.mjs from the exported node registry.
import stats from '@site/src/generated/stats.json';

import styles from './index.module.css';

interface Feature {
  title: string;
  body: ReactNode;
  to: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Every node on the GPU',
    body: (
      <>
        Nodes are GPU shaders on WebGPU, so a change shows up as you make it — and the heaviest run as compute
        kernels on the same GPU.
      </>
    ),
    to: '/guide/requirements',
  },
  {
    title: `${stats.nodes} nodes`,
    body: (
      <>
        Noise, patterns, scatters and atlases, flood fill and distance fields, curves you draw yourself, and the
        surface nodes that turn height into normals, curvature and occlusion.
      </>
    ),
    to: '/nodes',
  },
  {
    title: 'Exports your engine reads',
    body: (
      <>
        Bake maps at up to 8192 pixels, packed the way Unreal Engine, Unity URP and HDRP, Godot 4 and glTF expect —
        or every map on its own, from 8-bit PNG to 32-bit OpenEXR.
      </>
    ),
    to: '/guide/saving-and-exporting',
  },
  {
    title: 'Materials with settings',
    body: (
      <>
        Give a material inputs — a wear amount, a tint, a switch — and save named presets of them, so one material
        carries several looks without copying it.
      </>
    ),
    to: '/guide/material-settings-and-presets',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img className={styles.heroLogo} src={useBaseUrl('/img/icon.svg')} alt="" width={96} height={96} />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/intro">
            Read the guide
          </Link>
          <Link className={clsx('button button--outline button--lg', styles.heroOutline)} to="/nodes">
            Node reference
          </Link>
        </div>
        <p className={styles.version}>Documentation for version {stats.version}</p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="User guide and node reference for SST Material Forge, a node-based procedural PBR material editor.">
      <HomepageHeader />
      <main className="container margin-vert--xl">
        <div className="row">
          {FEATURES.map((feature) => (
            <div key={feature.title} className={clsx('col col--3', styles.feature)}>
              <Heading as="h2" className={styles.featureTitle}>
                <Link to={feature.to}>{feature.title}</Link>
              </Heading>
              <p>{feature.body}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
