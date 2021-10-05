import * as genshindb from 'genshin-db';

export function getCharacterData(id: string): Character | undefined {
  const characterData = genshindb.characters(id);
  if (characterData === undefined) {
    return undefined;
  }

  const { stats, ...modifiedCharData } = characterData;
  return modifiedCharData;
}

export function getAllCharacterIds() {
  const characterNames = genshindb.characters('names', {
    matchCategories: true,
  });
  const characterIds = characterNames.map((name) =>
    name.replace(/\W/g, '').toLowerCase()
  );

  return characterIds.map((characterId) => {
    return {
      params: {
        characterId,
      },
    };
  });
}

export interface Character extends Omit<genshindb.Character, 'stats'> {}
