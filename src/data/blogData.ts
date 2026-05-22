/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'Investing' | 'Wealth Savings' | 'Tax Optimization' | 'Retirement Planning';
  author: string;
  authorTitle: string;
  readTime: string;
  date: string;
  tags: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 'compounding-mastery-2024',
    title: 'The Geometric Growth: Mastering Compound Interest in Volatile Markets',
    excerpt: 'Deep dive into why consistency outpaces timing when navigating the current global equity landscape.',
    category: 'Investing',
    author: 'Munchangi Matyaraju (mm Raju)',
    authorTitle: 'Chief AI Architect',
    readTime: '8 min read',
    date: 'May 15, 2024',
    tags: ['Equities', 'Compounding', 'Wealth']
  },
  {
    id: 'tax-harvesting-strategies',
    title: 'Strategic Tax-Loss Harvesting: Neutralizing Capital Gains for HNWIs',
    excerpt: 'Advanced methodologies for optimizing your fiscal footprint through intelligent asset rebalancing.',
    category: 'Tax Optimization',
    author: 'Munchangi Matyaraju (mm Raju)',
    authorTitle: 'Chief AI Architect',
    readTime: '12 min read',
    date: 'May 12, 2024',
    tags: ['Tax', 'Strategy', 'HNWI']
  },
  {
    id: 'retirement-bridge-models',
    title: 'The Retirement Bridge: Transitioning from Accumulation to Distribution',
    excerpt: 'How to structure your portfolio to provide consistent cash flow without depleting principal assets.',
    category: 'Retirement Planning',
    author: 'Munchangi Matyaraju (mm Raju)',
    authorTitle: 'Chief AI Architect',
    readTime: '10 min read',
    date: 'May 10, 2024',
    tags: ['Retirement', 'Cash Flow', 'Distribution']
  },
  {
    id: 'high-yield-savings-psychology',
    title: 'Psychology of High-Yield Savings: Beyond Simple Interest Rates',
    excerpt: 'Understanding the behavioral economics behind automated savings engines and emergency buffer optimization.',
    category: 'Wealth Savings',
    author: 'Munchangi Matyaraju (mm Raju)',
    authorTitle: 'Chief AI Architect',
    readTime: '6 min read',
    date: 'May 08, 2024',
    tags: ['Savings', 'Behavioral Economics', 'Psychology']
  },
  {
    id: 'bitcoin-vs-traditional-hedge',
    title: 'Digital Gold Paradigm: Integrating Bitcoin into a Multi-Asset Framework',
    excerpt: 'A technical analysis of Bitcoins role as a non-correlated hedge against monetary expansion.',
    category: 'Investing',
    author: 'Munchangi Matyaraju (mm Raju)',
    authorTitle: 'Chief AI Architect',
    readTime: '15 min read',
    date: 'May 05, 2024',
    tags: ['Bitcoin', 'Hedge', 'Digital Assets']
  }
];
