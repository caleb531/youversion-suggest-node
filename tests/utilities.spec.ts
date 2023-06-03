import { expect } from 'chai';
import { getLanguages } from '../dist';

describe('utilities', () => {
  it('should retrieve list of all languages', async () => {
    const languages = await getLanguages();
    expect(
      languages.find((language) => {
        return language.id === 'eng';
      })
    ).to.have.property('name', 'English');
    expect(languages).to.have.length(27);
  });
});
