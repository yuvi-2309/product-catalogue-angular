import { Pipe, PipeTransform } from '@angular/core';

import { Product } from 'src/app/Interfaces/interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  //  This function filters an array of products based on a given filter string and property name.
  transform(
    value: Product[],
    filterString: string,
    propName: string
  ): Product[] {
    if (!value || !filterString || !propName) {
      return value;
    }
    const normalizedFilter = filterString.toLowerCase().trim();
    return value.filter((product: Product) =>
      product[propName].toLowerCase().includes(normalizedFilter)
    );
  }
}
