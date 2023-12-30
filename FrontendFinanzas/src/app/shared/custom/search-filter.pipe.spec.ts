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

  // it('debería filtrar items basado en searchTerm', () => {
  //   expect(pipe.transform(items, 'ma')).toEqual([{ name: 'Item 1' }]);
  //   expect(pipe.transform(items, 'Item')).toEqual(items);
  // });

  it('debería ser insensible a mayúsculas y minúsculas', () => {
    expect(pipe.transform(items, 'item')).toEqual(items);
    expect(pipe.transform(items, 'ITEM')).toEqual(items);
  });

  // it('debería manejar items sin propiedad "name"', () => {
  //   const itemsWithoutName = [{ title: 'Título 1' }, { title: 'Título 2' }];
  //   expect(pipe.transform(itemsWithoutName, 'title')).toEqual(itemsWithoutName);
  //   expect(pipe.transform(itemsWithoutName, 'Título')).toEqual(itemsWithoutName);
  // });

  it('debería manejar un array vacío', () => {
    expect(pipe.transform([], 'search')).toEqual([]);
  });

  it('debería manejar un searchTerm vacío', () => {
    expect(pipe.transform(items, '')).toEqual(items);
  });
});
