import { Button } from "@/components/ui/button";
import { roll_d4, roll_d6, roll_d8 } from "@/lib/utils";
import { useState } from "react";

type Attribute = {
    score: number;
    mod: number;
};

const AncestryType = ["Dwarf", "Elf", "Goblin", "Half-Orc", "Halfling", "Human",
] as const;

const AlignmentType = ["Lawful", "Neutral", "Chaotic"] as const;

const LawfulDeitiesType = ["Saint Terragnis", "Madeera The Covenant"] as const;
const NeutralDeitiesType = ["Gede", "Ord"] as const;
const ChaoticDeitiesType = ["Memnon", "Ramlaat", "Shune The Vile"] as const;

const ClassType = ["Fighter", "Thief", "Priest", "Wizard"] as const;

const PlayerNames = {
    "Dwarf": [
        "Hilde", "Torbin", "Marga", "Bruno",
        "Karina", "Naugrim", "Brenna", "Darvin",
        "Elga", "Alric", "Isolde", "Gendry",
        "Bruga", "Junnor", "Vidrid", "Torson",
        "Brielle", "Ulfgar", "Sarna", "Grimm",
    ],
    "Elf": [
        "Eliara", "Ryarn", "Sariel", "Tirolas",
        "Galira", "Varos", "Daeniel", "Axidor",
        "Hiralia", "Cyrwin", "Lothiel", "Zaphiel",
        "Nayra", "Ithior", "Amriel", "Elyon",
        "Jirwyn", "Natinel", "Fiora", "Ruhiel",
    ],
    "Goblin": [
        "Iggs", "Tark", "Nix", "Lenk",
        "Roke", "Fitz", "Tila", "Riggs",
        "Prim", "Zeb", "Finn", "Borg",
        "Yark", "Deeg", "Nibs", "Brak",
        "Fink", "Rizzo", "Squib", "Grix",
    ],
    "Halfling": [
        "Willow", "Benny", "Annie", "Tucker",
        "Marie", "Hobb", "Cora", "Gordie",
        "Rose", "Ardo", "Alma", "Norbert",
        "Jennie", "Barvin", "Tilly", "Pike",
        "Lydia", "Marlow", "Astrid", "Jasper",
    ],
    "Half-Orc": [
        "Vara", "Gralk", "Ranna", "Korv",
        "Zasha", "Hrogar", "Klara", "Tragan",
        "Brolga", "Drago", "Yelena", "Krull",
        "Ulara", "Tulk", "Shiraal", "Wulf",
        "Ivara", "Hirok", "Aja", "Zoraan",
    ],
    "Human": [
        "Zali", "Bram", "Clara", "Nattias",
        "Rina", "Denton", "Mirena", "Aran",
        "Morgan", "Giralt", "Tamra", "Oscar",
        "Ishana", "Rogar", "Jasmin", "Tarin",
        "Yuri", "Malchor", "Lienna", "Godfrey",
    ]
}

// TODO: Update with correct values
const ClassTitles = {
    "Lawful": {
        "Fighter": ["Squire", "Cavalier", "Knight", "Thane", "Lord/Lady"],
        "Priest": ["Acolyte", "Crusader", "Templar", "Champion", "Paladin"],
        "Thief": ["Footpad", "Burglar", "Rook", "Underboss", "Boss"],
        "Wizard": ["Apprentice", "Conjurer", "Arcanist", "Mage", "Archmage"]
    },
    "Neutral": {
        "Fighter": ["Recruit", "Soldier", "Veteran", "Sergeant", "Commander"],
        "Priest": ["Novice", "Cleric", "Healer", "Protector", "High Priest"],
        "Thief": ["Cutpurse", "Sneak", "Spy", "Master Thief", "Shadowlord"],
        "Wizard": ["Shaman", "Seer", "Warden", "sage", "Druid"]
    },
    "Chaotic": {
        "Fighter": ["Brigand", "Marauder", "Raider", "Warlord", "Chieftain"],
        "Priest": ["Heretic", "Dark Acolyte", "Blasphemer", "Cult Leader", "Dark Prophet"],
        "Thief": ["Thug", "Cutthroat", "Shadow", "Assasin", "Wraith"],
        "Wizard": ["Adept", "Channeler", "Witch/Warlock", "Diabolist", "Sorcerer"]
    }
}

const BackgroundType = [
    "Urchin", "Wanted", "Cult Initiate", "Thieves' Guild", "Banished",
    "Orphaned", "Wizard's Apprentice", "Jeweler", "Herbalist", "Barbarian",
    "Mercanary", "Sailor", "Acolyte", "Soldier", "Ranger", "Scout", "Minstrel",
    "Scholar", "Noble", "Chirurgeon"
]

const createAttribute = (score: number = 10): Attribute => ({
    score,
    mod: Math.floor((score - 10) / 2),
});

export function CharacterGenerator() {
    const [strength, setStrength] = useState<Attribute>(createAttribute());
    const [dexterity, setDexterity] = useState<Attribute>(createAttribute());
    const [constitution, setConstitution] = useState<Attribute>(createAttribute());
    const [intelligence, setIntelligence] = useState<Attribute>(createAttribute());
    const [wisdom, setWisdom] = useState<Attribute>(createAttribute());
    const [charisma, setCharisma] = useState<Attribute>(createAttribute());
    const [ancestry, setAncestry] = useState<typeof AncestryType[number]>('Human');
    const [alignment, setAlignment] = useState<typeof AlignmentType[number]>('Neutral');
    const [deity, setDeity] = useState<string>('');
    const [charClass, setCharClass] = useState<typeof ClassType[number]>('Fighter');
    const [title, setTitle] = useState<string>('');
    const [background, setBackground] = useState<typeof BackgroundType[number]>('');
    const [name, setName] = useState<string>('');
    const [healthPoints, setHealthPoints] = useState<number>(0);
    const [armorClass, setArmorClass] = useState<number>(10);

    function generateCharacter() {
        console.log("Generating character...");
        // Generate stats using 3d6
        const newStrength = createAttribute(roll_d6() + roll_d6() + roll_d6());
        const newDexterity = createAttribute(roll_d6() + roll_d6() + roll_d6());
        const newConstitution = createAttribute(roll_d6() + roll_d6() + roll_d6());
        const newIntelligence = createAttribute(roll_d6() + roll_d6() + roll_d6());
        const newWisdom = createAttribute(roll_d6() + roll_d6() + roll_d6());
        const newCharisma = createAttribute(roll_d6() + roll_d6() + roll_d6());
        // Randomly select an ancestry
        const newAncestry = AncestryType[Math.floor(Math.random() * AncestryType.length)];
        setAncestry(newAncestry);
        // Randomly select an alignment
        const newAlignment = AlignmentType[Math.floor(Math.random() * AlignmentType.length)];
        setAlignment(newAlignment);
        // Randomly select a deity based on alignment
        let newDeity = '';
        if (newAlignment === 'Lawful') {
            newDeity = LawfulDeitiesType[Math.floor(Math.random() * LawfulDeitiesType.length)];
        } else if (newAlignment === 'Neutral') {
            newDeity = NeutralDeitiesType[Math.floor(Math.random() * NeutralDeitiesType.length)];
        } else if (newAlignment === 'Chaotic') {
            newDeity = ChaoticDeitiesType[Math.floor(Math.random() * ChaoticDeitiesType.length)];
        } else {
            newDeity = 'Unknown';
        }
        setDeity(newDeity);

        const playerClass = ClassType[Math.floor(Math.random() * ClassType.length)];
        setCharClass(playerClass);

        const titlesForClass = ClassTitles[newAlignment][playerClass][0];
        setTitle(titlesForClass);

        const newBackground = BackgroundType[Math.floor(Math.random() * BackgroundType.length)];
        setBackground(newBackground);

        const possibleNames = PlayerNames[newAncestry];
        const newName = possibleNames[Math.floor(Math.random() * possibleNames.length)];
        setName(newName);

        var playerHealthPoints = 0;
        if (playerClass === 'Fighter') {
            playerHealthPoints = roll_d8();
        } else if (playerClass === 'Thief') {
            playerHealthPoints = roll_d4();
        } else if (playerClass === 'Priest') {
            playerHealthPoints = roll_d6();
        } else if (playerClass === 'Wizard') {
            playerHealthPoints = roll_d4();
        }
        playerHealthPoints += Math.max(newConstitution.mod, 1);
        setHealthPoints(playerHealthPoints);


        setStrength(newStrength);
        setDexterity(newDexterity);
        setConstitution(newConstitution);
        setIntelligence(newIntelligence);
        setWisdom(newWisdom);
        setCharisma(newCharisma);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="text-2xl font-bold my-2">Shadowdark Character Generator</div>
            <Button className="mt-2 mb-3 cursor-pointer" onClick={generateCharacter}>Generate</Button>
            <div className="flex flex-row justify-center gap-2 border rounded-sm p-4">
                {/* bg-muted/50 */}
                <div className="flex flex-col min-w-75 gap-2">
                    <div className="text-2xl font-bold h-32 text-center">Shadowdark</div>
                    <div className="flex flex-row justify-between">
                        {create_stat_node("STR", strength)}
                        {create_stat_node("INT", intelligence)}
                    </div>
                    <div className="flex flex-row justify-between">
                        {create_stat_node("DEX", dexterity)}
                        {create_stat_node("WIS", wisdom)}
                    </div>
                    <div className="flex flex-row justify-between">
                        {create_stat_node("CON", constitution)}
                        {create_stat_node("CHA", charisma)}
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="border rounded-sm p-2 w-[48%]">HP: {healthPoints}</div>
                        <div className="border rounded-sm p-2 w-[48%]">AC: {armorClass}</div>
                    </div>
                    <div className="border rounded-sm p-2 h-full">Attacks</div>
                </div>
                <div className="flex flex-col min-w-75 gap-2">
                    <div className="border rounded-sm p-2">Name: {name}</div>
                    <div className="border rounded-sm p-2">
                        Ancestry: {ancestry}
                    </div>
                    <div className="border rounded-sm p-2">Class: {charClass}</div>
                    <div className="flex flex-row justify-between">
                        <div className="border rounded-sm p-2 w-[30%]">Level: 1</div>
                        <div className="border rounded-sm p-2 w-[60%]">XP: 0 / 10</div>
                    </div>
                    <div className="border rounded-sm p-2">Title: {title}</div>
                    <div className="border rounded-sm p-2">Alignment: {alignment}</div>
                    <div className="border rounded-sm p-2">Background: {background}</div>
                    <div className="border rounded-sm p-2">Deity: {deity}</div>
                </div>
                <div className="flex flex-col min-w-75 gap-2">
                    <div className="border rounded-sm p-2 h-full">Talents / Spells</div>
                    <div className="border rounded-sm p-2">Gear</div>
                </div>
            </div>
        </div>
    );

    function create_stat_node(label: string, stat: Attribute) {
        return <div className="flex flex-col border rounded-sm p-2 w-[48%]">
            <div>{label}</div>
            <div>{stat.score} / {stat.mod}</div>
        </div>;
    }
}

export default CharacterGenerator;
