import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  const products = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 3.9, count: 120 },
      quantity: 1,
      total: 109.95,
    },
    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts ',
      price: 22.3,
      description:
        'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
      category: "men's clothing",
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    },
  ];

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array when no filter string is provided', () => {
    const filterString = '';
    const propName = 'name';

    const result = pipe.transform(products, filterString, propName);

    expect(result).toEqual(products);
  });

  it('should return the original array when no property name is provided', () => {
    const filterString = 'product';
    const propName = '';

    const result = pipe.transform(products, filterString, propName);

    expect(result).toEqual(products);
  });

  it('should filter the array based on the provided filter string and property name', () => {
    const filterString = 'Fjall';
    const propName = 'title';

    const result = pipe.transform(products, filterString, propName);

    expect(result).toEqual([
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 },
        quantity: 1,
        total: 109.95,
      },
    ]);
  });

  it('should perform case-insensitive filtering', () => {
    const filterString = 'FJALL';
    const propName = 'title';

    const result = pipe.transform(products, filterString, propName);

    expect(result).toEqual([
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 },
        quantity: 1,
        total: 109.95,
      },
    ]);
  });

  it('should trim the filter string before filtering', () => {
    const filterString = '  Fjall  ';
    const propName = 'title';

    const result = pipe.transform(products, filterString, propName);

    expect(result).toEqual([
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 },
        quantity: 1,
        total: 109.95,
      },
    ]);
  });
});
