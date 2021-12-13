import questsDB from "../database/questsDB.js";

const getQuests = async () => {
  return await questsDB.get();
};
const addQuest = async (name) => {
  const quests = await questsDB.get();
  const newId = quests[quests.length - 1].id + 1;
  const newQuest = {
    id: newId,
    nom: name,
  };
  quests.push(newQuest);
  await questsDB.set(quests);
};

const getQuestsById = async (id) => {
  const data = await questsDB.get();
  const quest = data.filter((quest) => quest.id === id)[0];
  if (quest != undefined) {
    return quest;
  } else throw new Error("No object with id");
};

const removeQuest = async (id) => {
  const quests = await questsDB.get();
  const isPresent = quests.map((quest) => quest.id == id).includes(true);
  if (isPresent) {
    const questsWithoutRemovedQuest = quests.filter(
      (quest) => quest.id != id
    );
    await questsDB.set(questsWithoutRemovedQuest);
  } else throw new Error("No object with id");
};

export { getQuests, addQuest, removeQuest, getQuestsById };
