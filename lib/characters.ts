import * as genshindb from 'genshin-db';

export function getCharacterData(id: string): Character | undefined {
  const characterData = genshindb.characters(id);
  const talentData = genshindb.talents(id);

  if (characterData === undefined) {
    return undefined;
  }

  const { stats, ...modifiedCharData } = characterData;
  return { ...modifiedCharData, talentData };
}

export function getAllCharacterIds() {
  return getCharacterList().map(({ id }) => {
    return {
      params: {
        characterId: id,
      },
    };
  });
}

export function getCharacterList() {
  const characterNames = genshindb.characters('names', {
    matchCategories: true,
  });

  return characterNames.map((name) => {
    const id = name.replace(/\W/g, '').toLowerCase();
    return {
      name,
      id,
    };
  });
}

export interface Character extends Omit<genshindb.Character, 'stats'> {
  talentData?: genshindb.Talent;
}
