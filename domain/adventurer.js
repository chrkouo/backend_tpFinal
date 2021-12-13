import adventurerDB from "../database/adventurerDB.js";
import questsDB from "../database/questsDB.js";

const getAdventurerByNameAndPassword = async (name, password) => {
  const adventurers = await adventurerDB.findAll();
  const oneAdventurer = adventurers.filter(
    (adventurer) => adventurer.name === name && adventurer.password == password
  )[0];
  if (oneAdventurer != undefined) return oneAdventurer;
  else throw new Error("Wrong name or password");
};
const getAdventurerQuestsById = async (id) => {
  const adventurer = await adventurerDB.findById(id);
  return adventurer.quests;
};

const getAdventurerById = async (id) => {
    const adventurer = await adventurerDB.findById(id);
    const pointNom = {name:adventurer.name, xp: adventurer.xp};
    return pointNom ;
  };


const addQuestsById = async (id, name) => {
    const adventurer = await adventurerDB.findById(id);
    const newQuests = {
      name: name,
      level: 1,
      completionXp: 110,
      completed: false
    };
    adventurer.quests.push(newQuests);
    await adventurerDB.updateById(id, adventurer);
  };

  const completeQuest = async (questId, adventurerId) => {
    try {
      const quest = await questsDB.get().filter((oneQuest)=>oneQuest.id===questId)[0];
      const adventurer = await adventurerDB.findById(adventurerId);
      if (adventurer.xp > quest.completionXp) {
        quest.completed = true;
        await adventurerDB.updateById(adventurerId, adventurer);
      } else throw new Error("Not enough xp");
    } catch (e) {
      console.log(e);
    }
  };

const createAdventurer = async (name, password) => {
  const newAdventurer = {
    name,
    password,
    xp,
    quests:[]
  };
  await adventurerDB.add(newAdventurer);
};

export default {
  getAdventurerByNameAndPassword,
  getAdventurerQuestsById,
  createAdventurer,
  getAdventurerById,
  addQuestsById
};
