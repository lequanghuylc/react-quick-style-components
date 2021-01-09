
import banks from './banks.json';
import { genComponentJSON, getCoreComponentIds } from './genComponentJSON';

describe('# getCoreComponentIds()', () => {
  const results = getCoreComponentIds(banks);
  it('Should return an array of id string', () => {
    expect(results).toBeDefined();
    expect(results).toEqual(
      expect.arrayContaining([
        expect.any(String)
      ])
    );
  })
  it('Each item is ID of valid core component', () => {
    results.forEach(id => {
      expect(banks[id]).toBeDefined();
      expect(banks[id].core).toBe(true);
      expect(banks[id].id).toBe(id);
    });
  })
})


describe('# genComponentJSON()', () => {
  const results = [];
  const ids = getCoreComponentIds(banks);
  for (let id in banks) {
    results.push(genComponentJSON(banks[id]));
  }

  it('Results length must be the same as Banks length', () => {
    expect(results.length).toEqual(Object.keys(banks).length);
  })

  it('Each item would keep the same ID', () => {
    results.forEach((json, index) => {
      expect(banks[json.id]).toBeDefined();
      const bankIndex = Object.keys(banks).indexOf(json.id);
      expect(index).toEqual(bankIndex);
    })
  })

  it('Each item must be from Core', () => {
    results.forEach(json => {
      expect(json).toBeDefined();
      expect(ids.includes(json.from)).toEqual(true);
    })
  })
})