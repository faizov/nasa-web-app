export const addOrRemoveItemLocalStorage = <T extends { id: string }>(
  key: string,
  item: T,
  removeItem = false
): T[] => {
  const existingData = localStorage.getItem(key);

  if (existingData) {
    const existingArray = JSON.parse(existingData) as T[];
    const existingItemIndex = existingArray.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      if (removeItem) {
        existingArray.splice(existingItemIndex, 1);
      } else {
        existingArray[existingItemIndex] = item;
      }
    } else {
      existingArray.push(item);
    }

    localStorage.setItem(key, JSON.stringify(existingArray));

    return existingArray;
  } else {
    const newArray = [item];
    localStorage.setItem(key, JSON.stringify(newArray));

    return newArray;
  }
};

export const findObjectInLocalStorageArray = (
  storageKey: string,
  query: string
): any | null => {
  const localStorageData = localStorage.getItem(storageKey);
  let localStorageArray: any[] = [];

  if (localStorageData !== null) {
    localStorageArray = JSON.parse(localStorageData);
  }
  console.log("localStorageData", localStorageData);
  const matchingObject = localStorageArray.find((object: any) => {
    return Object.values(object).some((value: any) => {
      return value.toString().toLowerCase().includes(query.toLowerCase());
    });
  });

  if (!matchingObject) {
    return null;
  }

  return matchingObject;
};
