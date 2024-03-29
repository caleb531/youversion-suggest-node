import { describe, expect, it } from 'vitest';
import { getReferencesMatchingName } from '../../src';

describe('chapter parser', () => {
  it('should match chapters', async () => {
    const references = await getReferencesMatchingName('matthew 5');
    expect(references[0].name).toEqual('Matthew 5');
    expect(references.length).toEqual(1);
  });

  it('should match chapters by ambiguous book name', async () => {
    const references = await getReferencesMatchingName('a 3');
    expect(references[0].name).toEqual('Amos 3');
    expect(references[1].name).toEqual('Acts 3');
    expect(references.length).toEqual(2);
  });

  it('should use correct ID for chapters', async () => {
    const references = await getReferencesMatchingName('luke 4');
    expect(references[0].id).toEqual('111/LUK.4');
    expect(references.length).toEqual(1);
  });

  it('should interpret chapter zero as chapter one', async () => {
    const references = await getReferencesMatchingName('ps 0');
    expect(references[0].name).toEqual('Psalms 1');
    expect(references.length).toEqual(1);
  });
});
