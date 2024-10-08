import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getReferencesMatchingPhrase } from '../src';
import { resetRequestMocker, setupRequestMocker } from './testUtilities';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('search content fetcher', () => {
  beforeAll(async () => {
    setupRequestMocker(
      /https:\/\/www\.bible\.com\/search/,
      await fs.promises.readFile(path.join(__dirname, 'html', 'search.html'), 'utf8')
    );
  });

  afterAll(() => {
    resetRequestMocker();
  });

  it('should correctly parse reference names from HTML', async () => {
    const references = await getReferencesMatchingPhrase('love others');
    expect(references[0].name).toMatch(/Romans 13:8/);
    expect(references[1].name).toMatch(/John 15:12/);
    expect(references[2].name).toMatch(/1 Peter 4:8/);
    expect(references.length).toEqual(3);
  });

  it('should correctly parse reference content from HTML', async () => {
    const references = await getReferencesMatchingPhrase('love others');
    expect(String(references[0].content)).toMatch(/Lorem/);
    expect(String(references[0].content)).not.toMatch(/#/);
    expect(String(references[1].content)).toMatch(/consectetur/);
    expect(String(references[1].content)).not.toMatch(/Lorem/);
    expect(String(references[2].content)).toMatch(/Ut aliquam/);
    expect(String(references[2].content)).not.toMatch(/Lorem/);
    expect(String(references[2].content)).not.toMatch(/consectetur/);
    expect(references.length).toEqual(3);
  });

  it('should correctly parse reference ID from HTML', async () => {
    const references = await getReferencesMatchingPhrase('love others');
    expect(references[0].id).toEqual('111/ROM.13.8');
    expect(references[1].id).toEqual('111/JHN.15.12');
    expect(references[2].id).toEqual('111/1PE.4.8');
    expect(references.length).toEqual(3);
  });
});
