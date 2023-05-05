/**
 * Interface representing an item with an `id` property and dynamic additional fields.
 */
interface Item {
  id: string;
  [key: string]: any;
}

/**
 * Merge two arrays of items based on specified field names.
 * If an element is equal, it is deleted.
 * If an element's ID is equal but one or more fields are different, the element from the second array is kept.
 * If an element in the second array is not included in the first, it is included.
 * @param arr1 First array of items
 * @param arr2 Second array of items
 * @param fieldNames Array of field names to compare dynamically
 * @returns Merged array of items
 */
export function mergeArrays<T extends Item>(
  arr1: T[],
  arr2: T[],
  fieldNames: string[],
): T[] {
  const filteredArr1 = arr1.filter(
    (item1) =>
      !arr2.some((item2) => {
        const isSameId = item1.id === item2.id;
        const isSameValues = fieldNames.every(
          (fieldName) => item1[fieldName] === item2[fieldName],
        );
        return isSameId && isSameValues;
      }),
  );

  const mergedArray = filteredArr1.concat(
    arr2.filter((item2) => !arr1.some((item1) => item1.id === item2.id)),
  );

  return mergedArray;
}
