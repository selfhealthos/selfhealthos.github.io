import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const FEATURES: {title: string; body: string}[] = [
  {
    title: 'Your data, your server',
    body: 'Sleep, activity, heart rate, food, habits, body measurements, lab results - tracked on hardware you own, not a third party’s.',
  },
  {
    title: 'One Docker Compose up',
    body: 'No reverse proxy to configure, no external services required. Plain HTTP by default; front it with your own proxy if you want public HTTPS.',
  },
  {
    title: 'Fitbit sync built in',
    body: 'Connect your account in Settings and background jobs pull your data in - sleep architecture, heart rate zones, steps, and more.',
  },
  {
    title: 'A friendly, interactive API',
    body: 'Every endpoint documented and callable straight from Swagger UI - and a scoped API token when you need one from a script.',
  },
  {
    title: 'Ask Claude about your own data',
    body: 'An MCP endpoint lets Claude Code query your health data directly - generate a ready-to-run install command from Settings.',
  },
  {
    title: 'Multi-user, zero friction',
    body: 'Self-serve signup, no password rules imposed on you - this is your server, your rules.',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <img
          src="/img/logo-mark.png"
          alt=""
          className={styles.heroLogo}
          width={72}
          height={88}
        />
        <Heading as="h1" className={styles.heroTitle}>
          SelfHealth<span className="text-gradient">OS</span>
        </Heading>
        <p className={styles.heroTagline}>
          <span className={styles.tealDot} aria-hidden="true" />
          TRACK
          <span className={styles.purpleDot} aria-hidden="true" />
          ANALYSE
          <span className={styles.tealDot} aria-hidden="true" />
          IMPROVE
        </p>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--lg" to="/docs/getting-started/installation" style={{background: 'var(--brand-gradient)', color: '#fff', border: 'none'}}>
            Get started
          </Link>
          <Link
            className="button button--lg button--outline button--secondary"
            to="https://github.com/selfhealthos/selfhealthos">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Self-hosted nutrition & fitness tracker"
      description="selfhealthos is a self-hosted, open-source nutrition and fitness tracker: sleep, activity, heart rate, food, habits and more, on your own server.">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="col col--4">
                  <div className={styles.featureCard}>
                    <Heading as="h3">{feature.title}</Heading>
                    <p>{feature.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
