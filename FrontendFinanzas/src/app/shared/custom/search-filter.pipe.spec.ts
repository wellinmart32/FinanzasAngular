import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  let pipe: SearchFilterPipe;
  const items = [{ name: 'Item 1' }, { name: 'Item 2' }];

  beforeEach(() => {
    pipe = new SearchFilterPipe();
  });

  it('debería crear una instancia', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería filtrar items basado en searchTerm', () => {
    expect(pipe.transform(items, 'em 1')).toEqual([{ name: 'Item 1' }]);
    expect(pipe.transform(items, 'Item')).toEqual(items);
  });

  it('debería ser insensible a mayúsculas y minúsculas', () => {
    expect(pipe.transform(items, 'item')).toEqual(items);
    expect(pipe.transform(items, 'ITEM')).toEqual(items);
  });

  it('debería manejar un array vacío', () => {
    expect(pipe.transform([], 'search')).toEqual([]);
  });

  it('debería manejar un searchTerm vacío', () => {
    expect(pipe.transform(items, '')).toEqual(items);
  });
});
