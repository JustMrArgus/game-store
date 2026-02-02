import { PrismaClient, User } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  const users: User[] = [];
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash('Password123!', 10);
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        name: `User ${i}`,
        password: hashedPassword,
        role: i === 1 ? 'ADMIN' : 'USER',
      },
    });
    users.push(user);
    console.log(`Created user: ${user.email}`);
  }

  const games = [
    {
      title: 'Cyberpunk 2077',
      genre: 'RPG',
      description:
        'Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Improved and featuring all-new free additional content, customize your character and playstyle as you take on jobs, build a reputation, and unlock upgrades. The relationships you forge and the choices you make will shape the story and the world around you. Legends are made here. What will yours be? Create a character with a unique backstory, appearance, and outfit. Choose from different classes like Netrunner, Techie, or Solo, and develop your skills through an extensive perk system. Night City is packed with things to do, places to see, and people to meet. And it is up to you where to go, when to go, and how to get there.',
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt',
      price: '59.99',
      releaseDate: '2020-12-10',
    },
    {
      title: 'The Witcher 3: Wild Hunt',
      genre: 'RPG',
      description:
        'The Witcher 3: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as professional monster hunter Geralt of Rivia tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore. Trained from early childhood and mutated to gain superhuman skills, strength, and reflexes, witchers are a counterbalance to the monster-infested world in which they live. Gruesomely destroy foes as a professional monster hunter armed with a range of upgradeable weapons, mutating potions, and combat magic. Hunt down a wide variety of exotic monsters, from savage beasts prowling mountain passes to cunning supernatural predators lurking in the shadows of densely populated cities.',
      developer: 'CD Projekt Red',
      publisher: 'CD Projekt',
      price: '39.99',
      releaseDate: '2015-05-19',
    },
    {
      title: 'Red Dead Redemption 2',
      genre: 'Action',
      description:
        'Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age. America, 1899. The end of the Wild West era has begun. After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him. Experience the action-adventure gameplay that made the series a phenomenon with improved graphics, new story content, and an expansive open world featuring mountains, cities, towns, and more.',
      developer: 'Rockstar Games',
      publisher: 'Rockstar Games',
      price: '59.99',
      releaseDate: '2018-10-26',
    },
    {
      title: 'Grand Theft Auto V',
      genre: 'Action',
      description:
        'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4K and beyond, as well as the chance to experience the game running at 60 frames per second. The game offers players a huge range of PC-specific customization options, including over 25 separate configurable settings for texture quality, shaders, tessellation, anti-aliasing and more, as well as support and extensive customization for mouse and keyboard controls. When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other.',
      developer: 'Rockstar North',
      publisher: 'Rockstar Games',
      price: '29.99',
      releaseDate: '2013-09-17',
    },
    {
      title: 'Elden Ring',
      genre: 'Action RPG',
      description:
        "Elden Ring is a fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki, creator of the influential Dark Souls video game series, and George R.R. Martin, author of The New York Times best-selling fantasy series, A Song of Ice and Fire. Danger and discovery lurk around every corner in FromSoftware's largest game to date. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment. Create your own character and define your playstyle by experimenting with a wide variety of weapons, magical abilities, and skills found throughout the world.",
      developer: 'FromSoftware',
      publisher: 'Bandai Namco',
      price: '59.99',
      releaseDate: '2022-02-25',
    },
    {
      title: 'Dark Souls III',
      genre: 'Action RPG',
      description:
        'Dark Souls III is the final chapter in the critically acclaimed Dark Souls series, a challenging action RPG known for its incredibly deep and rewarding gameplay. Players must master the timing of combat, learn enemy attack patterns, and carefully manage their stamina and resources to survive. The game features intricate level design with interconnected areas, hidden paths, and devastating boss encounters. As fires fade and the world falls into ruin, journey into a universe full of more colossal enemies and environments. Prepare yourself and embrace the darkness with the definitive Dark Souls experience. Fans and newcomers alike will get lost in the carefully crafted, beautifully designed, dark fantasy world and gameplay that is faithful to the legacy of the franchise.',
      developer: 'FromSoftware',
      publisher: 'Bandai Namco',
      price: '39.99',
      releaseDate: '2016-04-12',
    },
    {
      title: 'Hogwarts Legacy',
      genre: 'Action RPG',
      description:
        'Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books. For the first time, experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Make allies, battle Dark wizards and ultimately decide the fate of the wizarding world. Your legacy is what you make of it. Live the Unwritten. Experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Explore familiar and new locations as you uncover hidden beasts, customize your character and craft potions, master spell casting, upgrade talents, and become the wizard you want to be. Discover the feeling of living at Hogwarts as you make allies, battle Dark wizards, and decide the fate of the wizarding world.',
      developer: 'Avalanche Software',
      publisher: 'Warner Bros. Games',
      price: '59.99',
      releaseDate: '2023-02-10',
    },
    {
      title: 'God of War Ragnarok',
      genre: 'Action',
      description:
        "God of War Ragnarök is the sequel to 2018's critically acclaimed God of War. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world. Along the way they will explore stunning, mythical landscapes, and face fearsome enemies in the form of Norse gods and monsters. The threat of Ragnarök grows ever closer. Kratos and Atreus must choose between their own safety and the safety of the realms. Delve deep into the Realms, explore stunning landscapes and take on a diverse range of enemy creatures, monsters, and Norse gods as Kratos and Atreus search for answers. Arm yourself with a range of powerful weapons and master devastating hand-to-hand combat, all while hunting legendary creatures across the lands.",
      developer: 'Santa Monica Studio',
      publisher: 'Sony Interactive',
      price: '59.99',
      releaseDate: '2022-11-09',
    },
    {
      title: 'Horizon Zero Dawn',
      genre: 'Action RPG',
      description:
        "Horizon Zero Dawn is an exhilarating action role-playing game exclusively developed by the award-winning Guerrilla Games, creators of PlayStation's venerated Killzone franchise. In a lush, post-apocalyptic world where nature has reclaimed the ruins of a forgotten civilization, pockets of humanity live on in primitive hunter-gatherer tribes. Their dominion over the new wilderness has been usurped by the Machines – awe-inspiring, deadly creatures that combine mechanical strength with savage ferocity. Experience Aloy's entire legendary quest to unravel the mysteries of a world ruled by deadly Machines. Use devastating tactical attacks against your prey and explore a majestic open world in this action RPG. Embark on a compelling, emotional journey as Aloy, a skilled hunter, and uncover her past, discover her destiny, and stop a catastrophic threat to the future.",
      developer: 'Guerrilla Games',
      publisher: 'Sony Interactive',
      price: '49.99',
      releaseDate: '2017-02-28',
    },
    {
      title: 'Spider-Man Remastered',
      genre: 'Action',
      description:
        "Marvel's Spider-Man Remastered delivers the ultimate Spider-Man experience on PC with amazing graphical fidelity and ray-tracing. In Marvel's Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide in an original, action-packed story. Play as an experienced Peter Parker, fighting big crime and iconic villains in Marvel's New York. At the same time, struggle to balance his chaotic personal life and career while the fate of Marvel's New York rests upon his shoulders. Web-swing through a breathtaking original story featuring one of gaming's most beloved characters. Swing your way through the bustling streets of Marvel's New York, interacting with beloved characters and catching criminals while fighting to protect the city from sinister threats. Experience a brand-new and authentic Spider-Man adventure with fun and intuitive gameplay.",
      developer: 'Insomniac Games',
      publisher: 'Sony Interactive',
      price: '49.99',
      releaseDate: '2022-08-12',
    },
    {
      title: 'Baldurs Gate 3',
      genre: 'RPG',
      description:
        "Baldur's Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons & Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power. Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening inside you, drawn from a mind flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become ultimate evil. A grand, cinematic narrative brings you closer to your characters than ever before, as you venture through the Forgotten Realms and beyond. Choose from a wide variety of D&D races and classes, or play as an Origin character with a hand-crafted background. Adventure, loot, battle, and romance as you journey through the Forgotten Realms and beyond.",
      developer: 'Larian Studios',
      publisher: 'Larian Studios',
      price: '59.99',
      releaseDate: '2023-08-03',
    },
    {
      title: 'Starfield',
      genre: 'RPG',
      description:
        "Starfield is the first new universe in over 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4. In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom as you embark on an epic journey to answer humanity's greatest mystery. In the year 2330, humanity has ventured beyond our solar system, settling new planets, and living as a spacefaring people. You will join Constellation – the last group of space explorers seeking rare artifacts throughout the galaxy. Explore over 1,000 planets as you navigate through more than 100 solar systems. Whether you prefer to venture through the main story or embark on countless side quests, the choice is yours. Customize your character with backgrounds, skills, and abilities in a next-generation RPG experience.",
      developer: 'Bethesda Game Studios',
      publisher: 'Bethesda Softworks',
      price: '69.99',
      releaseDate: '2023-09-06',
    },
    {
      title: 'Assassins Creed Valhalla',
      genre: 'Action RPG',
      description:
        "Assassin's Creed Valhalla is an epic action RPG that puts you in the role of Eivor, a fierce Viking warrior raised to be fearless. Explore a dynamic and beautiful open world set against the brutal backdrop of England's Dark Ages. Raid your enemies, grow your settlement, and build your political power in your quest to earn your place among the gods in Valhalla. Lead epic Viking raids against Saxon troops and fortresses. Relive the visceral fighting style of the Vikings as you dual-wield axes, swords, or even shields against fierce and formidable enemies. Decapitate foes, dismember limbs, and unleash brutal finishers for every weapon type. Advanced RPG mechanics allow you to shape the growth of your character and influence the world around you. With every choice you make, from political alliances and combat strategy to dialogue and gear progression, you will carve a path to glory.",
      developer: 'Ubisoft Montreal',
      publisher: 'Ubisoft',
      price: '59.99',
      releaseDate: '2020-11-10',
    },
    {
      title: 'Far Cry 6',
      genre: 'FPS',
      description:
        "Far Cry 6 is a first-person shooter game set on the fictional Caribbean island of Yara, ruled by the dictator Anton Castillo, portrayed by Giancarlo Esposito. As Dani Rojas, you will become a guerrilla fighter and liberate your nation from the grip of a ruthless dictator and his teenage son Diego. Fight against Anton's troops in the largest Far Cry playground to date across jungles, beaches, and the capital city of Esperanza. Employ guerrilla tactics such as building an arsenal from improvised weapons to taking down soldiers with your canine companion. To survive in this tropical paradise turned hostile, you'll need to use every tool at your disposal. Build your collection of unique weapons, vehicles, and animal companions while you enjoy the striking contrast of a beautiful world turned hostile.",
      developer: 'Ubisoft Toronto',
      publisher: 'Ubisoft',
      price: '59.99',
      releaseDate: '2021-10-07',
    },
    {
      title: 'Call of Duty Modern Warfare III',
      genre: 'FPS',
      description:
        'Call of Duty: Modern Warfare III is the direct sequel to the record-breaking Call of Duty: Modern Warfare II. Captain Price and Task Force 141 face off against the ultimate threat. The ultranationalist war criminal Vladimir Makarov is extending his grasp across the world causing Task Force 141 to fight like never before. Engage in an iconic campaign featuring the return of classic Modern Warfare maps, weapons, and characters. Squad up and fight alongside your friends in a massive collection of new and classic multiplayer maps. Experience the ultimate online playground with best-in-class gunplay. The new open-world Zombies experience, is the biggest Call of Duty Zombies map ever. Join up with other squads to survive and fight massive hordes of the undead. Modern Warfare III delivers the most advanced multiplayer experience ever, featuring a massive arsenal of weapons and equipment.',
      developer: 'Sledgehammer Games',
      publisher: 'Activision',
      price: '69.99',
      releaseDate: '2023-11-10',
    },
    {
      title: 'Battlefield 2042',
      genre: 'FPS',
      description:
        'Battlefield 2042 is a first-person shooter that marks the return to the iconic all-out warfare of the franchise. Adapt and overcome in a near-future world transformed by disorder. Squad up and bring a cutting-edge arsenal into dynamically-changing battlegrounds supporting 128 players, unprecedented scale, and epic destruction. Experience the intensity of all-out warfare, amplified by the immersive environments of the next generation of Battlefield. Take on massive experiences with up to 128 players, bringing unprecedented scale on vast battlegrounds across the globe. Discover unexpected battles in the dynamic world of 2042 as the world reacts to your actions and game-changing events reshape the battlefield. Conquer the elements and unleash your tactical prowess in seven massive maps filled with dynamic weather systems, environmental hazards, and interactive elements.',
      developer: 'DICE',
      publisher: 'Electronic Arts',
      price: '59.99',
      releaseDate: '2021-11-19',
    },
    {
      title: 'FIFA 24',
      genre: 'Sports',
      description:
        "EA SPORTS FC 24 (formerly FIFA 24) is the next chapter of The World's Game, bringing together innovative new features and gameplay powered by HyperMotionV technology on PlayStation 5 and Xbox Series X|S. Feel closer to the game with enhanced player movements, improved ball physics, and smarter AI that reacts to how you play. Experience the innovation of EA SPORTS FC 24 in Ultimate Team, Career Mode, Clubs, and VOLTA Football. With more than 19,000 players, 700+ teams, and 30+ leagues, EA SPORTS FC 24 gives you the most authentic football experience. Play with the world's biggest stars and emerging talents, including new women's leagues and international teams. Whether you're building your dream squad in Ultimate Team, leading your favorite club in Career Mode, or showcasing your skills in VOLTA, there's always something new to experience.",
      developer: 'EA Sports',
      publisher: 'Electronic Arts',
      price: '59.99',
      releaseDate: '2023-09-29',
    },
    {
      title: 'NBA 2K24',
      genre: 'Sports',
      description:
        "NBA 2K24 delivers the most authentic and complete NBA and WNBA experience yet. Pursue greatness in MyCAREER, build a dynasty in MyGM, and discover new ways to compete in MyTEAM. With improved ball handling, refined shooting mechanics, and enhanced AI, experience the thrill of real NBA basketball with Pro Play technology that translates real NBA footage into dynamic gameplay. The legendary Kobe Bryant inspires a unique journey in this year's iteration, delivering a basketball experience that captures the essence of what it means to pursue greatness. From updated rosters to redesigned neighborhoods, NBA 2K24 brings the most immersive basketball simulation to date. Master your skills and lead your team to victory, compete against players from around the world, and build your basketball legacy in the most comprehensive sports game available.",
      developer: 'Visual Concepts',
      publisher: '2K Sports',
      price: '59.99',
      releaseDate: '2023-09-08',
    },
    {
      title: 'Forza Horizon 5',
      genre: 'Racing',
      description:
        "Forza Horizon 5 is set in a vibrant and ever-evolving open world across the beautiful landscapes of Mexico with limitless, fun driving action in hundreds of the world's greatest cars. Lead breathtaking expeditions across the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world's greatest cars. Explore a world of striking contrast and beauty. Discover living deserts, lush jungles, historic cities, hidden ruins, pristine beaches, vast canyons, and a towering snow-capped volcano. Immerse yourself in a deep campaign with hundreds of challenges that reward you for engaging in the activities you love. Meet new characters and choose the outcomes of their stories in Forza Horizon Story missions. Create your own expressions of fun with an advanced livery editor, creative photo mode, and adaptive difficulty that tunes to your skill level.",
      developer: 'Playground Games',
      publisher: 'Xbox Game Studios',
      price: '59.99',
      releaseDate: '2021-11-09',
    },
    {
      title: 'Need for Speed Unbound',
      genre: 'Racing',
      description:
        'Need for Speed Unbound is a revolutionary racing game that brings the thrill of street racing to life with stunning visuals and an innovative art style that blends anime-inspired visual effects with realistic graphics. Race against the odds in Lakeshore City and take on weekly qualifiers to earn a spot at The Grand, the ultimate street racing showdown. Build your collection of expertly customized cars, with deep visual and performance customization, and prove you have what it takes to become the best. Express your unique style through a wide range of expressive character clothing and accessories, exclusive wraps, and custom vehicle parts. Experience intense police pursuits and outrun the cops or face the consequences. Every decision matters as you stake your reputation on intense race events.',
      developer: 'Criterion Games',
      publisher: 'Electronic Arts',
      price: '69.99',
      releaseDate: '2022-12-02',
    },
    {
      title: 'Resident Evil 4 Remake',
      genre: 'Horror',
      description:
        "Resident Evil 4 Remake is a survival horror game that reimagines the revolutionary masterpiece from the ground up, bringing cutting-edge survival horror to a new generation. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, now a federal agent, is sent to rescue the president's kidnapped daughter from a mysterious cult in a rural part of Europe. Experience the intense action and terrifying encounters that defined a generation of survival horror, rebuilt with stunning visuals, modernized gameplay, and an expanded storyline. Face grotesque enemies, solve challenging puzzles, and manage your limited resources as you fight to survive in hostile territory. With improved controls, reimagined locations, and new gameplay elements, this is the definitive version of a legendary game.",
      developer: 'Capcom',
      publisher: 'Capcom',
      price: '59.99',
      releaseDate: '2023-03-24',
    },
    {
      title: 'Dead Space Remake',
      genre: 'Horror',
      description:
        'Dead Space Remake brings the sci-fi survival horror classic back to life with completely rebuilt graphics, audio, and gameplay systems. Isaac Clarke is an engineer who must fight his way through a mining starship infested with hostile creatures called Necromorphs after his crewmates are slaughtered. Experience the terror like never before with immersive audio design, detailed environments, and visceral combat that make every encounter a fight for survival. The Ishimura is now fully interconnected, allowing you to explore freely and discover new secrets. With an expanded story, new gameplay features, and stunning visuals powered by modern technology, Dead Space delivers the ultimate horror experience. Strategic dismemberment is your key to survival as you cut off the limbs of monstrous enemies with precision.',
      developer: 'Motive Studio',
      publisher: 'Electronic Arts',
      price: '59.99',
      releaseDate: '2023-01-27',
    },
    {
      title: 'Diablo IV',
      genre: 'Action RPG',
      description:
        'Diablo IV is the ultimate action role-playing game with endless demons to slaughter, legendary loot to collect, and a vast open world to explore. Lilith, the daughter of Hatred, has returned to Sanctuary, bringing endless demons and unspeakable horrors with her. Face her diabolic forces across five distinct regions in a massive interconnected world. Choose from five powerful classes and customize your character with countless skill and talent combinations. Join forces with other players in a shared open world, take on world bosses, explore treacherous dungeons, and compete in intense PvP zones. With seasonal content, endgame activities, and constant updates, the battle against evil never ends. Experience a dark and mature story that explores the eternal conflict between angels and demons.',
      developer: 'Blizzard Entertainment',
      publisher: 'Blizzard Entertainment',
      price: '69.99',
      releaseDate: '2023-06-06',
    },
    {
      title: 'World of Warcraft Dragonflight',
      genre: 'MMORPG',
      description:
        "World of Warcraft: Dragonflight invites players to return to Azeroth and explore the legendary Dragon Isles, the ancestral home of dragonkind. After 10,000 years of dormancy, the Dragon Isles are awakening, calling upon the world's adventurers to uncover ancient secrets and forge new alliances. Soar through the skies on your own customizable dragon mount with the new Dragonriding system, offering unprecedented freedom of aerial movement. Play as the new Dracthyr race and Evoker class, wielding the power of all five dragonflights. Explore four vast new zones filled with new enemies, quests, and treasures. Experience a revamped talent system that gives you more control over your character's abilities. With new dungeons, raids, and seasonal content, Dragonflight offers endless adventures for both new and returning players.",
      developer: 'Blizzard Entertainment',
      publisher: 'Blizzard Entertainment',
      price: '49.99',
      releaseDate: '2022-11-28',
    },
    {
      title: 'Final Fantasy XVI',
      genre: 'RPG',
      description:
        'Final Fantasy XVI is an epic dark fantasy adventure that marks a bold new direction for the legendary franchise. Set in the land of Valisthea, a world blessed by magical Mothercrystals, you play as Clive Rosfield, a young warrior dedicated to protecting his younger brother Joshua, the Dominant of the Phoenix. When tragedy strikes, Clive embarks on a dark and dangerous journey of revenge that will take him across a war-torn land. Experience thrilling action combat as you wield powerful Eikonic abilities and engage in spectacular battles against towering summons. The game features a mature storyline with complex characters, political intrigue, and epic confrontations. With stunning visuals, an orchestral soundtrack, and gameplay that combines strategic depth with visceral action, Final Fantasy XVI delivers an unforgettable adventure.',
      developer: 'Square Enix',
      publisher: 'Square Enix',
      price: '69.99',
      releaseDate: '2023-06-22',
    },
    {
      title: 'Monster Hunter Rise',
      genre: 'Action RPG',
      description:
        'Monster Hunter Rise is the latest installment in the award-winning action RPG series that lets you hunt massive monsters and craft gear from their parts. Set in the ninja-inspired land of Kamura Village, you must protect your home from a terrifying threat known as the Rampage. Master the new Wirebug mechanic to soar through the air with unprecedented mobility, mount monsters with Wyvern Riding, and explore vertical environments like never before. Hunt alone or team up with friends in seamless online multiplayer for up to four players. With 14 unique weapon types, each with their own playstyle, you can find the perfect hunting approach. Collect materials from fallen monsters to craft powerful weapons and armor sets. Experience new monsters, returning favorites, and challenging quests that will test your skills as a hunter.',
      developer: 'Capcom',
      publisher: 'Capcom',
      price: '59.99',
      releaseDate: '2022-01-12',
    },
    {
      title: 'Hades',
      genre: 'Roguelike',
      description:
        "Hades is a god-like rogue-like dungeon crawler that combines the best aspects of Supergiant's critically acclaimed titles, including the fast-paced action of Bastion, the rich atmosphere and depth of Transistor, and the character-driven storytelling of Pyre. As the immortal Prince of the Underworld, you will wield the powers and mythic weapons of Olympus to break free from the clutches of the god of the dead himself, while growing stronger and unraveling more of the story with each unique escape attempt. Permanently upgrade your abilities, befriend and romance iconic Greek gods, and discover thousands of lines of fully voiced story as you battle your way through the ever-changing halls of the Underworld. With tight combat, stunning visuals, and an incredible soundtrack, Hades offers an addictive experience that rewards both skill and persistence.",
      developer: 'Supergiant Games',
      publisher: 'Supergiant Games',
      price: '24.99',
      releaseDate: '2020-09-17',
    },
    {
      title: 'Hollow Knight',
      genre: 'Metroidvania',
      description:
        'Hollow Knight is an epic action-adventure that takes you through a vast, ruined kingdom of insects and heroes. Forge your own path in a beautifully hand-drawn 2D world full of secrets, challenges, and mysteries waiting to be uncovered. Explore twisting caverns, battle tainted creatures, and befriend bizarre bugs, all in a classic, non-linear adventure. Gain new skills and abilities as you progress, unlocking new areas and secrets. Master challenging combat against over 150 enemies, including 30 epic boss battles. Discover a whole continent of bizarre creatures, beautiful landscapes, and treacherous foes. With a haunting orchestral soundtrack, tight controls, and an incredibly atmospheric world, Hollow Knight offers dozens of hours of exploration and discovery. Uncover the truth behind the ancient kingdom and find your destiny.',
      developer: 'Team Cherry',
      publisher: 'Team Cherry',
      price: '14.99',
      releaseDate: '2017-02-24',
    },
    {
      title: 'Sekiro Shadows Die Twice',
      genre: 'Action',
      description:
        'Sekiro: Shadows Die Twice is an action-adventure game that puts you in the role of the one-armed wolf, a disgraced warrior rescued from the brink of death. Bound by honor, you are tasked with protecting a young lord who is the descendant of an ancient bloodline. When the young lord is captured, nothing will stop you on a dangerous quest to regain your honor. Carve your own path to vengeance in this critically acclaimed adventure from FromSoftware. Master an arsenal of deadly prosthetic tools and techniques, combining stealth with intense swordplay in a dark and twisted world. Death is not your end in this game; resurrect and keep fighting. Explore late 1500s Sengoku Japan, a brutal time of constant conflict, as you face off against supernatural enemies and massive bosses.',
      developer: 'FromSoftware',
      publisher: 'Activision',
      price: '59.99',
      releaseDate: '2019-03-22',
    },
    {
      title: 'Doom Eternal',
      genre: 'FPS',
      description:
        "DOOM Eternal is the ultimate power fantasy where you become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. Rip and tear through demon hordes with an even bigger arsenal of weapons and abilities in this fast-paced, intense first-person shooter. The only thing they fear is you. Experience the ultimate combination of speed and power with new mechanics like the Dash, Blood Punch, and Flame Belch. Discover the Slayer's origins and his eternal mission to rip and tear until it is done. With incredible graphics, a heart-pounding soundtrack by Mick Gordon, and challenging gameplay that rewards aggression, DOOM Eternal delivers an adrenaline-fueled experience unlike any other. Face off against hordes of demons in Hell and beyond, including new and returning enemy types.",
      developer: 'id Software',
      publisher: 'Bethesda Softworks',
      price: '39.99',
      releaseDate: '2020-03-20',
    },
    {
      title: 'The Last of Us Part I',
      genre: 'Action',
      description:
        "The Last of Us Part I is a groundbreaking emotional journey and a masterpiece of storytelling that has been meticulously rebuilt from the ground up for the PlayStation 5 console and PC. Experience the iconic story of Joel and Ellie as they traverse a post-pandemic America, struggling for survival against infected creatures and hostile human survivors. Every detail has been enhanced with cutting-edge graphics, improved gameplay mechanics, and full DualSense wireless controller integration. From the abandoned cities to the lush wilderness, witness the beauty of a world reclaimed by nature. Features include enhanced AI, improved combat, and all-new accessibility options. Includes the beloved prequel story Left Behind, which explores Ellie's past. This is the definitive way to experience one of gaming's most acclaimed narratives.",
      developer: 'Naughty Dog',
      publisher: 'Sony Interactive',
      price: '59.99',
      releaseDate: '2023-03-28',
    },
    {
      title: 'Death Stranding',
      genre: 'Action',
      description:
        'Death Stranding is an open-world action game created by legendary game designer Hideo Kojima that offers a completely new and unique gaming experience. In the near future, mysterious explosions have rocked the planet, setting off a series of supernatural events known as the Death Stranding. Sam Porter Bridges must travel across a ravaged landscape crawling with otherworldly threats to reconnect isolated cities and a fractured society. What is the mystery behind the Death Stranding? What will Sam discover on his journey? With an all-star cast including Norman Reedus, Mads Mikkelsen, and Léa Seydoux, Death Stranding presents an unforgettable story about forging connections in a broken world. Experience innovative asynchronous online features where player structures can help others navigate the challenging terrain.',
      developer: 'Kojima Productions',
      publisher: 'Sony Interactive',
      price: '39.99',
      releaseDate: '2019-11-08',
    },
    {
      title: 'Control',
      genre: 'Action',
      description:
        "Control is a supernatural third-person action-adventure game from Remedy Entertainment, the creators of Max Payne and Alan Wake. After a secretive agency in New York is invaded by an otherworldly threat, you become the new Director, struggling to regain Control. From the makers of Max Payne and Alan Wake, explore a vast and ever-changing world that twists and transforms based on your actions. Wield supernatural abilities alongside a transforming Service Weapon to defeat the Hiss and uncover the mysteries of the Oldest House. The game features a reactive environment where everything around you can become a weapon or a shield. Explore the Bureau's mysterious headquarters, the Oldest House, a building that exists outside of normal space and time. With stunning visuals, intense combat, and a mind-bending story, Control offers a unique experience.",
      developer: 'Remedy Entertainment',
      publisher: '505 Games',
      price: '29.99',
      releaseDate: '2019-08-27',
    },
    {
      title: 'Alan Wake 2',
      genre: 'Horror',
      description:
        "Alan Wake 2 is a survival horror game and the long-awaited sequel to the cult classic from Remedy Entertainment. Saga Anderson, an FBI agent, arrives to investigate ritualistic murders in the small town of Bright Falls, only to find herself trapped in a nightmare. Meanwhile, Alan Wake, trapped in a dark dimension for 13 years, is trying to write his way back to reality. Two characters, two worlds - one impossible story. Experience a gripping psychological horror narrative that blurs the lines between fiction and reality. With stunning visuals, intense survival horror gameplay, and Remedy's signature storytelling, Alan Wake 2 delivers a terrifying and unforgettable experience. Navigate the dark world, manage scarce resources, and uncover the truth behind the supernatural events threatening both worlds.",
      developer: 'Remedy Entertainment',
      publisher: 'Epic Games Publishing',
      price: '59.99',
      releaseDate: '2023-10-27',
    },
    {
      title: 'Lies of P',
      genre: 'Action RPG',
      description:
        'Lies of P is a thrilling Souls-like action RPG that offers a dark and twisted retelling of the classic tale of Pinocchio. You are a puppet mechanoid awakened in a city filled with chaos and devastation. Everyone in the city has either fled, died, or turned into monsters. All that remains are horrifying puppets gone mad and a desperate few who survive. Guide Pinocchio through the streets of a fallen city, crafting weapons and wielding extraordinary abilities to confront the horrors that lurk within. Every lie you tell shapes the kind of human you become. With a deep combat system, incredible boss fights, and a hauntingly beautiful world inspired by the Belle Époque era, Lies of P offers a challenging and rewarding experience for fans of the genre. Your choices determine your fate.',
      developer: 'Round8 Studio',
      publisher: 'Neowiz Games',
      price: '59.99',
      releaseDate: '2023-09-19',
    },
    {
      title: 'Armored Core VI',
      genre: 'Action',
      description:
        'Armored Core VI: Fires of Rubicon marks the triumphant return of the legendary mech action series from FromSoftware, the creators of Dark Souls and Elden Ring. Pilot your own customizable mech known as an Armored Core and engage in intense combat across a war-torn planet. The planet Rubicon 3 was once the site of a catastrophe caused by a mysterious substance called Coral. Now, corporations and armed factions wage war for control of this dangerous resource. As an independent mercenary, you will take on missions from various factions, building your reputation and uncovering the secrets of Rubicon. With deep mech customization, intense boss battles, and the challenging gameplay FromSoftware is known for, Armored Core VI offers an exhilarating action experience. Build the ultimate fighting machine.',
      developer: 'FromSoftware',
      publisher: 'Bandai Namco',
      price: '59.99',
      releaseDate: '2023-08-25',
    },
    {
      title: 'Street Fighter 6',
      genre: 'Fighting',
      description:
        'Street Fighter 6 represents the next evolution of the legendary fighting game franchise, offering new and returning players an unprecedented experience. With three distinct game modes - Fighting Ground for classic competitive play, World Tour for an immersive story-driven single-player experience, and Battle Hub for online social features - there is something for everyone. Master the new Drive System that opens up exciting strategic possibilities, including Drive Impact, Drive Parry, Drive Rush, Drive Reversal, and Overdrive. Create your own custom avatar in World Tour mode and train under iconic Street Fighter characters. With stunning graphics powered by the RE Engine, a roster of beloved and new fighters, and the most robust feature set in franchise history, Street Fighter 6 is the ultimate fighting game experience.',
      developer: 'Capcom',
      publisher: 'Capcom',
      price: '59.99',
      releaseDate: '2023-06-02',
    },
    {
      title: 'Mortal Kombat 1',
      genre: 'Fighting',
      description:
        "Mortal Kombat 1 ushers in a new era of the iconic franchise with an all-new fighting system, a cinematic story mode, and the return of beloved characters in a reimagined universe. After Fire God Liu Kang's victory over the Titan Shang Tsung, he has restarted history, forming a New Era. Experience the origins of classic characters reimagined for a new timeline, with familiar faces in unexpected roles. The new Kameo Fighters system lets you call upon a roster of partner characters to assist you in kombat, opening up new strategies and devastating combos. With the most detailed graphics in franchise history, a deep fighting system, and the series' signature brutal fatalities, Mortal Kombat 1 delivers the ultimate fighting game experience. Choose your fighter and shape the future of Mortal Kombat.",
      developer: 'NetherRealm Studios',
      publisher: 'Warner Bros. Games',
      price: '69.99',
      releaseDate: '2023-09-19',
    },
    {
      title: 'Tekken 8',
      genre: 'Fighting',
      description:
        "Tekken 8 continues the legendary King of Iron Fist Tournament with the most dynamic and visually stunning fighting game in the series' history. The story of the Mishima clan reaches its climax as Jin Kazama and Kazuya Mishima face off in an ultimate battle for the fate of the world. Built on Unreal Engine 5, Tekken 8 features incredibly detailed character models, destructible environments, and cinematic super moves. The new Heat System adds aggressive, high-risk gameplay mechanics that reward bold players. Experience an extensive single-player story mode, compete online with players around the world, and master a diverse roster of fighters, each with unique fighting styles and movesets. With refined gameplay, stunning visuals, and decades of legacy behind it, Tekken 8 is the definitive 3D fighting game.",
      developer: 'Bandai Namco',
      publisher: 'Bandai Namco',
      price: '69.99',
      releaseDate: '2024-01-26',
    },
    {
      title: 'Guilty Gear Strive',
      genre: 'Fighting',
      description:
        'Guilty Gear Strive is a revolutionary anime fighting game that sets a new standard for the genre with stunning visuals, incredible music, and accessible yet deep gameplay. Experience the culmination of the Guilty Gear story as Sol Badguy faces his final battle against That Man. The game features groundbreaking graphics that blur the line between animation and gaming, creating breathtaking battles that look like playable anime. With a roster of unique characters, each with their own playstyle and mechanics, there is a fighter for everyone. The simplified input system makes the game accessible to newcomers while maintaining the depth that veterans expect. Online play features excellent rollback netcode for smooth competitive matches. With regular content updates and a passionate community, Guilty Gear Strive continues to evolve and grow.',
      developer: 'Arc System Works',
      publisher: 'Arc System Works',
      price: '39.99',
      releaseDate: '2021-06-11',
    },
    {
      title: 'Dragon Ball FighterZ',
      genre: 'Fighting',
      description:
        'Dragon Ball FighterZ is an exhilarating 2D fighting game featuring the iconic characters and explosive battles from the Dragon Ball universe. Developed by Arc System Works, masters of the fighting game genre, this game brings the anime to life with stunning cell-shaded graphics that perfectly recreate the look and feel of the series. Assemble a team of three fighters from a massive roster of beloved characters including Goku, Vegeta, Frieza, Cell, and many more. Execute devastating combos, call in assists, and unleash spectacular super moves that capture the epic scale of Dragon Ball battles. Whether you are a newcomer or fighting game veteran, the accessible controls and deep mechanics offer something for everyone. Experience an original story written under the supervision of Akira Toriyama himself.',
      developer: 'Arc System Works',
      publisher: 'Bandai Namco',
      price: '24.99',
      releaseDate: '2018-01-26',
    },
    {
      title: 'Persona 5 Royal',
      genre: 'RPG',
      description:
        'Persona 5 Royal is the definitive version of the award-winning RPG that took the world by storm. Join the Phantom Thieves and steal hearts to change the world! Don the mask of Joker and join your fellow Phantom Thieves as they stage grand heists, infiltrate the minds of the corrupt, and make them change their ways. With new characters, story content, gameplay mechanics, and an additional semester of gameplay, Persona 5 Royal offers the ultimate Persona 5 experience. Explore Tokyo, build relationships with unique confidants, and master the art of dungeon crawling in Palaces and Mementos. The turn-based combat system rewards strategic thinking and stylish execution. With over 100 hours of content, an unforgettable soundtrack, and some of the most memorable characters in gaming, Persona 5 Royal is an essential RPG experience.',
      developer: 'Atlus',
      publisher: 'Sega',
      price: '59.99',
      releaseDate: '2022-10-21',
    },
    {
      title: 'Persona 4 Golden',
      genre: 'RPG',
      description:
        'Persona 4 Golden is an enhanced version of the classic JRPG that has captivated millions of players worldwide. When a young man moves to the rural town of Inaba to live with his uncle, he becomes entangled in a series of mysterious murders connected to a supernatural world inside television sets. Form bonds with unique characters as you balance school life, part-time jobs, and dungeon exploration. Enter the TV world and battle Shadows using the power of Persona, manifestations of your inner self. With additional story content, new social links, improved graphics, and quality-of-life enhancements, Persona 4 Golden is the definitive way to experience this beloved adventure. The engaging mystery, memorable characters, and addictive gameplay loop make this one of the greatest RPGs ever made.',
      developer: 'Atlus',
      publisher: 'Sega',
      price: '19.99',
      releaseDate: '2020-06-13',
    },
    {
      title: 'Persona 3 Reload',
      genre: 'RPG',
      description:
        'Persona 3 Reload is a faithful and stunning remake of the groundbreaking RPG that defined a generation. Experience the Dark Hour, a mysterious time between one day and the next where monsters called Shadows prey on the minds of the living. As a transfer student at Gekkoukan High School, you discover the power to summon a Persona - a manifestation of your inner self - and join SEES, a group of students fighting to uncover the truth behind the Dark Hour. The game has been completely rebuilt with gorgeous modern graphics, fully re-recorded dialogue, new music arrangements, and refined gameplay mechanics. Build social links with classmates, explore Tartarus, and uncover the mysteries of the Dark Hour in this definitive version of a JRPG classic. Balance your school life during the day and battle Shadows at night.',
      developer: 'Atlus',
      publisher: 'Sega',
      price: '69.99',
      releaseDate: '2024-02-02',
    },
    {
      title: 'Metaphor ReFantazio',
      genre: 'RPG',
      description:
        'Metaphor: ReFantazio is an ambitious new fantasy RPG from the creators of Persona, offering a fresh take on the genre with a medieval fantasy setting. In a world dominated by anxiety and prejudice, a young man sets out on a journey to break a curse and challenge the established order. Experience a rich narrative that explores themes of identity, society, and human nature. The game introduces new gameplay systems while retaining the signature style and depth that Atlus is known for. Build bonds with diverse characters, each with their own stories and motivations. Engage in strategic turn-based combat using a variety of powerful abilities. With stunning visuals, an evocative soundtrack, and the creative vision of the Persona team, Metaphor: ReFantazio promises to be an unforgettable adventure that pushes the boundaries of the JRPG genre.',
      developer: 'Atlus',
      publisher: 'Sega',
      price: '69.99',
      releaseDate: '2024-10-11',
    },
    {
      title: 'Final Fantasy VII Rebirth',
      genre: 'RPG',
      description:
        "Final Fantasy VII Rebirth is the highly anticipated second chapter of the Final Fantasy VII Remake project, continuing Cloud's journey beyond the city of Midgar. Having escaped the dystopian city-state, Cloud and his allies set out across an expansive world in pursuit of Sephiroth, a former hero turned deadly threat. Experience the next chapter of this beloved story with expanded exploration, new regions to discover, and deeper character development. The game features an evolved combat system that blends real-time action with strategic command-based mechanics. Reunite with iconic characters, face new and returning enemies, and uncover the mysteries of the Planet. With stunning graphics, an expanded score, and innovative gameplay, Final Fantasy VII Rebirth delivers an epic adventure that honors the legacy of the original while charting a bold new path.",
      developer: 'Square Enix',
      publisher: 'Square Enix',
      price: '69.99',
      releaseDate: '2024-02-29',
    },
    {
      title: 'Final Fantasy XIV',
      genre: 'MMORPG',
      description:
        "Final Fantasy XIV is an award-winning MMORPG that offers an incredible story spanning multiple expansions and a thriving community of millions of players. Begin your adventure in Eorzea, a realm of magic and wonder, and join the fight against ancient primals and the forces of the Garlean Empire. Whether you prefer to play as a powerful warrior, a skilled mage, or a supportive healer, the flexible job system allows you to master multiple classes on a single character. Experience epic raids, challenging dungeons, and a critically acclaimed narrative that rivals single-player RPGs. With regular content updates, seasonal events, and a passionate development team, there is always something new to discover. Join one of gaming's most welcoming communities and forge your own legend in this beloved online world.",
      developer: 'Square Enix',
      publisher: 'Square Enix',
      price: '39.99',
      releaseDate: '2013-08-27',
    },
    {
      title: 'Dragon Quest XI',
      genre: 'RPG',
      description:
        'Dragon Quest XI: Echoes of an Elusive Age is a classic JRPG adventure that combines stunning graphics with the timeless gameplay the series is known for. You are the Luminary, a hero marked by destiny to save the world from an ancient evil. Embark on an epic journey across a beautiful world filled with colorful characters, challenging monsters, and mysteries to uncover. The game features a charming cast of party members, each with their own skills, stories, and reasons for joining your quest. Experience strategic turn-based combat with the freedom to explore freely or use classic commands. With a heartfelt story, orchestral soundtrack, and hundreds of hours of content, Dragon Quest XI is a celebration of everything that makes JRPGs special. The Definitive Edition includes additional story content and quality-of-life improvements.',
      developer: 'Square Enix',
      publisher: 'Square Enix',
      price: '39.99',
      releaseDate: '2018-09-04',
    },
    {
      title: 'Octopath Traveler II',
      genre: 'RPG',
      description:
        "Octopath Traveler II is a captivating JRPG that continues the beloved series with eight new travelers, each with their own unique stories, abilities, and motivations. Set in the land of Solistia, this sequel builds upon everything that made the original great while introducing new features and mechanics. Experience the signature HD-2D visual style that combines retro pixel art with modern visual effects. Each traveler has a unique Path Action that allows them to interact with NPCs in different ways during the day or night. The Break and Boost battle system returns, offering deep strategic combat. Whether you choose to follow one character's journey or weave together the stories of all eight, you will discover a rich world full of adventure, drama, and unforgettable moments. Eight travelers, eight stories await.",
      developer: 'Square Enix',
      publisher: 'Square Enix',
      price: '59.99',
      releaseDate: '2023-02-24',
    },
    {
      title: 'Triangle Strategy',
      genre: 'Strategy',
      description:
        'Triangle Strategy is a tactical RPG that combines deep, strategic gameplay with an engaging narrative full of political intrigue and difficult choices. Command a group of warriors in tactical battles where positioning, terrain, and strategy are key to victory. The game features the stunning HD-2D visual style, blending classic pixel art with beautiful modern effects. As Serenoa Wolffort, you must navigate a complex web of alliances and betrayals as three nations clash over scarce resources. Your choices matter - the Scales of Conviction system tracks your decisions and determines which characters join your cause and which endings you unlock. With multiple story paths, challenging battles, and meaningful consequences for your choices, Triangle Strategy offers a rich tactical experience that rewards careful planning and moral reflection.',
      developer: 'Square Enix',
      publisher: 'Square Enix',
      price: '59.99',
      releaseDate: '2022-03-04',
    },
    {
      title: 'Fire Emblem Engage',
      genre: 'Strategy',
      description:
        'Fire Emblem Engage is a tactical RPG that celebrates the rich history of the Fire Emblem series while delivering fresh strategic gameplay. As the Divine Dragon, you awaken from a thousand-year slumber to find your world threatened by the Fell Dragon. Use Emblem Rings to summon legendary heroes from across Fire Emblem history, including Marth, Celica, and other beloved characters. The Engage mechanic allows you to fuse with these Emblems for powerful abilities in battle. Experience strategic turn-based combat on varied maps with different objectives and challenges. Build relationships with a colorful cast of allies, each with unique classes and abilities. With vibrant anime-style graphics, an engaging story, and deep tactical gameplay, Fire Emblem Engage offers an adventure for both newcomers and long-time fans of the series.',
      developer: 'Intelligent Systems',
      publisher: 'Nintendo',
      price: '59.99',
      releaseDate: '2023-01-20',
    },
    {
      title: 'Fire Emblem Three Houses',
      genre: 'Strategy',
      description:
        'Fire Emblem: Three Houses is an acclaimed tactical RPG that puts you in the role of a professor at the prestigious Officers Academy. Choose to lead one of three houses - the Black Eagles, Blue Lions, or Golden Deer - each representing a different nation with its own students, perspectives, and storylines. Train your students in various combat arts and skills, building them into powerful warriors. Form bonds with your students through support conversations and shared meals. When war comes to Fódlan, your choices will determine the fate of the continent. The game features strategic turn-based battles, deep character customization, and branching storylines that encourage multiple playthroughs. With dozens of students to recruit, relationships to build, and battles to fight, Fire Emblem: Three Houses offers hundreds of hours of content.',
      developer: 'Intelligent Systems',
      publisher: 'Nintendo',
      price: '59.99',
      releaseDate: '2019-07-26',
    },
    {
      title: 'XCOM 2',
      genre: 'Strategy',
      description:
        'XCOM 2 is a critically acclaimed turn-based tactical strategy game where you lead the resistance against an alien occupation of Earth. Twenty years after the events of XCOM: Enemy Unknown, the aliens have conquered Earth and established a seemingly benevolent government. But beneath the surface, a sinister plan is unfolding. As the commander of XCOM, you must build your base, recruit soldiers, research alien technology, and lead your squad in intense turn-based battles. Every decision matters - permadeath means losing a veteran soldier can be devastating. Procedurally generated maps ensure no two missions are the same. With deep strategic layers, challenging combat, and a wealth of customization options, XCOM 2 offers an incredibly rewarding experience. The War of the Chosen expansion adds even more content and gameplay possibilities.',
      developer: 'Firaxis Games',
      publisher: '2K Games',
      price: '29.99',
      releaseDate: '2016-02-05',
    },
    {
      title: 'Civilization VI',
      genre: 'Strategy',
      description:
        'Civilization VI is the latest installment in the legendary 4X strategy series that challenges you to build an empire to stand the test of time. Starting from humble beginnings, you will lead your civilization from the Stone Age to the Information Age, making crucial decisions about expansion, diplomacy, warfare, and culture. The game introduces unstacked cities, where districts and wonders are built on the map outside the city center, adding a new layer of strategic depth. Choose from dozens of historical leaders, each with unique abilities that shape your playstyle. Research technologies and civics, negotiate with other leaders, and compete for victory through domination, science, culture, religion, or diplomacy. With endless replayability and regular expansions adding new civilizations and features, Civilization VI is the ultimate strategy experience.',
      developer: 'Firaxis Games',
      publisher: '2K Games',
      price: '29.99',
      releaseDate: '2016-10-21',
    },
    {
      title: 'Total War Warhammer III',
      genre: 'Strategy',
      description:
        'Total War: Warhammer III is the epic conclusion to the Total War: Warhammer trilogy, combining massive turn-based strategy with spectacular real-time battles in the Warhammer Fantasy universe. Command legendary armies and wage war across a vast campaign map filled with diverse factions, each with unique units, mechanics, and playstyles. Lead the forces of Kislev, Grand Cathay, or the four Chaos Gods in the base game, with additional factions available through DLC and the combined Immortal Empires campaign. Experience real-time battles with thousands of units, from disciplined infantry to monstrous creatures and powerful magic users. The Immortal Empires campaign combines all three games into one massive sandbox spanning the entire Warhammer world. With incredible depth, stunning visuals, and endless strategic possibilities, this is the ultimate Warhammer strategy experience.',
      developer: 'Creative Assembly',
      publisher: 'Sega',
      price: '59.99',
      releaseDate: '2022-02-17',
    },
    {
      title: 'Age of Empires IV',
      genre: 'Strategy',
      description:
        "Age of Empires IV is the latest installment in the legendary real-time strategy franchise, bringing the beloved gameplay into a new era. Return to history and command civilizations spanning the medieval ages in epic battles. Choose from diverse civilizations including the English, Chinese, Mongols, Delhi Sultanate, and more, each with unique units, technologies, and playstyles. Experience four story-driven campaigns that bring pivotal moments in world history to life through stunning documentary-style videos. Build your empire from a single town center, gather resources, train armies, and conquer your enemies. The game features both single-player and multiplayer modes, including ranked competitive play. With accessible gameplay for newcomers and deep strategy for veterans, Age of Empires IV is a triumphant return for one of gaming's most iconic franchises.",
      developer: 'Relic Entertainment',
      publisher: 'Xbox Game Studios',
      price: '59.99',
      releaseDate: '2021-10-28',
    },
    {
      title: 'Crusader Kings III',
      genre: 'Strategy',
      description:
        'Crusader Kings III is a grand strategy RPG where you guide a medieval dynasty through centuries of history, intrigue, and conquest. Unlike traditional strategy games, your primary focus is not on nations but on characters - rulers with their own personalities, ambitions, and relationships. Arrange marriages, plot assassinations, wage holy wars, and navigate the complex web of feudal politics. Every character has unique traits that affect their abilities and interactions. Your dynasty will span generations, with heirs inheriting (or fighting over) your titles. Choose your starting position anywhere from Iceland to India, from 867 AD to 1066 AD. With unprecedented depth in character interactions, an incredibly detailed map, and emergent storytelling that creates unique narratives every playthrough, Crusader Kings III is the ultimate medieval dynasty simulator.',
      developer: 'Paradox Development',
      publisher: 'Paradox Interactive',
      price: '49.99',
      releaseDate: '2020-09-01',
    },
    {
      title: 'Europa Universalis IV',
      genre: 'Strategy',
      description:
        "Europa Universalis IV is a grand strategy game that lets you take control of any nation from 1444 to 1821 and guide it through the tumultuous early modern period. Explore, expand, exploit, and exterminate as you build your nation into a global power. The game features an incredibly detailed world map with thousands of provinces, each with unique characteristics. Engage in diplomacy, trade, colonization, and warfare. Research technologies, develop your nation's ideas, and navigate religious upheaval. Every nation plays differently, from the great powers of Europe to the empires of Asia and the tribes of the Americas. With countless DLCs adding new features and content, Europa Universalis IV offers virtually unlimited replayability. This is the gold standard of historical grand strategy games, beloved by millions of players worldwide.",
      developer: 'Paradox Development',
      publisher: 'Paradox Interactive',
      price: '39.99',
      releaseDate: '2013-08-13',
    },
    {
      title: 'Stellaris',
      genre: 'Strategy',
      description:
        "Stellaris is a grand strategy game set in space where you explore the galaxy, encounter diverse alien species, and build your interstellar empire. From humble beginnings on a single planet, expand across the stars through exploration, diplomacy, and conquest. Design your own species with unique traits, ethics, and government types that shape how you interact with the galaxy. Encounter thousands of randomly generated empires and events, ensuring every playthrough tells a unique story. Manage your empire's economy, research advanced technologies, and build massive fleets to protect your interests. Engage in diplomacy with other empires, form federations, or wage wars of conquest. With regular expansions adding new features and content, Stellaris continues to evolve and grow. Whether you seek peaceful coexistence or galactic domination, the stars await.",
      developer: 'Paradox Development',
      publisher: 'Paradox Interactive',
      price: '39.99',
      releaseDate: '2016-05-09',
    },
    {
      title: 'Cities Skylines II',
      genre: 'Simulation',
      description:
        'Cities: Skylines II is the highly anticipated sequel to the beloved city-building simulation that has captivated millions of players worldwide. Build the city of your dreams with unprecedented detail and scale. Experience next-generation city simulation with the most realistic city-building gameplay ever, featuring advanced systems for economy, transportation, and citizen behavior. Watch as thousands of individually simulated citizens go about their daily lives, each with their own needs and goals. Design complex road networks, manage public transportation, zone districts, and balance your budget. From small towns to sprawling metropolises, every city tells a unique story. With improved graphics, expanded building options, and deeper simulation systems, Cities: Skylines II represents the future of the city-building genre. Create, manage, and grow your perfect city.',
      developer: 'Colossal Order',
      publisher: 'Paradox Interactive',
      price: '49.99',
      releaseDate: '2023-10-24',
    },
    {
      title: 'Planet Coaster 2',
      genre: 'Simulation',
      description:
        "Planet Coaster 2 is the sequel to the award-winning theme park simulation that lets you build the theme park of your dreams. Create incredible roller coasters, design stunning water parks, and manage every aspect of your guests' experience. The new water park features let you build splash-worthy attractions including water slides, wave pools, and lazy rivers. Design intricate coaster layouts with intuitive building tools, customize every detail of your park, and watch as guests enjoy your creations. Advanced simulation systems model realistic guest behavior, ride physics, and park economics. Share your creations with a passionate community of builders and download parks and rides from players worldwide. With stunning graphics, deep management systems, and endless creative possibilities, Planet Coaster 2 is the ultimate theme park building experience.",
      developer: 'Frontier Developments',
      publisher: 'Frontier Developments',
      price: '49.99',
      releaseDate: '2024-11-06',
    },
    {
      title: 'Two Point Hospital',
      genre: 'Simulation',
      description:
        'Two Point Hospital is a hilarious and addictive hospital management simulation from some of the creators of Theme Hospital. Design, build, and manage your own hospital, dealing with a variety of amusing illnesses with equally amusing treatments. Cure patients with conditions like Light-headedness (literally a light bulb for a head), Jest Infection (clown transformation), and many more. Hire and train staff, research new treatments, and expand your hospital empire across Two Point County. Balance patient happiness, staff morale, and financial viability to build a thriving medical institution. With charming visuals, witty humor, and engaging management gameplay, Two Point Hospital offers a perfect blend of simulation depth and accessibility. Unlock new hospitals, face unique challenges, and become the ultimate healthcare tycoon.',
      developer: 'Two Point Studios',
      publisher: 'Sega',
      price: '34.99',
      releaseDate: '2018-08-30',
    },
    {
      title: 'Stardew Valley',
      genre: 'Simulation',
      description:
        "Stardew Valley is a beloved farming simulation game where you inherit your grandfather's old farm plot and must transform it into a thriving homestead. Escape the corporate grind and start your new life in the countryside. Clear the land, plant crops, raise animals, and craft goods to sell. But farming is just the beginning - explore vast caves, battle monsters, fish in local waters, and forage for wild goods. Get to know the townspeople, each with their own personalities and stories, and perhaps find love. The game offers endless possibilities with its open-ended gameplay and regular free content updates. Whether you want to create the perfect farm, complete the community center, or just live peacefully in the valley, Stardew Valley offers a relaxing and rewarding experience. Play solo or cooperatively with friends.",
      developer: 'ConcernedApe',
      publisher: 'ConcernedApe',
      price: '14.99',
      releaseDate: '2016-02-26',
    },
    {
      title: 'Terraria',
      genre: 'Sandbox',
      description:
        'Terraria is a 2D sandbox adventure game that offers endless possibilities in a procedurally generated world filled with danger and treasure. Dig, fight, explore, and build your way through a massive world with hundreds of weapons, armor sets, and accessories. Face off against dozens of unique bosses, from giant worms to ancient cultists, and collect rare loot to become even more powerful. Build incredible structures, from simple wooden houses to elaborate castles and mechanical contraptions. Play solo or team up with friends in multiplayer for cooperative exploration and boss fights. With over 4,000 items to craft and collect, there is always something new to discover. Regular free updates have added mountains of content over the years, making Terraria one of the most content-rich games available at any price.',
      developer: 'Re-Logic',
      publisher: 'Re-Logic',
      price: '9.99',
      releaseDate: '2011-05-16',
    },
    {
      title: 'Minecraft',
      genre: 'Sandbox',
      description:
        'Minecraft is the best-selling video game of all time, a creative sandbox experience where the only limit is your imagination. Explore infinite worlds, gather resources, craft tools and items, and build structures ranging from simple shelters to massive cities. Survive against hostile creatures at night, or switch to Creative mode for unlimited resources and the ability to fly. With regular updates adding new biomes, creatures, blocks, and gameplay features, Minecraft continues to evolve and grow. Play solo or with friends on servers hosting thousands of players. The modding community has created countless additions, from simple quality-of-life improvements to total conversion mods that create entirely new games. Whether you want to build, explore, survive, or compete, Minecraft offers an experience unlike any other.',
      developer: 'Mojang Studios',
      publisher: 'Xbox Game Studios',
      price: '26.99',
      releaseDate: '2011-11-18',
    },
    {
      title: 'Valheim',
      genre: 'Survival',
      description:
        "Valheim is a brutal exploration and survival game for 1-10 players set in a procedurally-generated purgatory inspired by Viking culture. Battle, build, and conquer your way to a saga worthy of Odin's blessing! Explore a world shrouded in mystery, from mystical forests to snow-capped mountains, and discover new biomes, creatures, and resources. Craft powerful weapons, build mighty longhouses, and forge epic gear to take on increasingly challenging foes. Summon and defeat five primordial bosses and claim their unique powers to progress through the world. The intuitive building system lets you create everything from simple shelters to massive fortresses. With a dedicated development team constantly adding new content and features, Valheim offers an ever-expanding Viking adventure. Gather your friends and sail forth to glory.",
      developer: 'Iron Gate AB',
      publisher: 'Coffee Stain Publishing',
      price: '19.99',
      releaseDate: '2021-02-02',
    },
    {
      title: 'Subnautica',
      genre: 'Survival',
      description:
        'Subnautica is an underwater adventure game set on an alien ocean planet. A massive, open world full of wonder and peril awaits you. Descend into the depths of an alien underwater world filled with wonder and peril. Craft equipment, pilot submarines, terraform voxel terrain, and outsmart wildlife to explore lush coral reefs, volcanoes, cave systems, and more. Scavenge, craft, and survive. Manage your oxygen supply as you explore, and find food and water to survive. Build bases on the sea floor, construct vehicles to explore new areas, and discover the secrets of this mysterious world. Subnautica delivers an immersive survival experience with an emphasis on exploration and wonder over combat. Uncover the fate of the Aurora and find a way to escape while dealing with the challenges of an alien aquatic environment.',
      developer: 'Unknown Worlds',
      publisher: 'Unknown Worlds',
      price: '29.99',
      releaseDate: '2018-01-23',
    },
    {
      title: 'The Forest',
      genre: 'Survival',
      description:
        'The Forest is an open-world survival horror game where you are the lone survivor of a passenger jet crash. You find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first-person survival horror simulator. Enter a living, breathing world, where every tree and plant can be chopped down. Build a small shelter or a large ocean-side fortress. Explore caves and underground lakes. Defend yourself against a clan of genetic mutant enemies that have their own families, moral code, and primitive society. Use stealth to evade enemies, or engage them directly with crafted weapons. Experience a complete survival simulation with hunting, crafting, building, and exploration. Play alone or cooperatively with friends online.',
      developer: 'Endnight Games',
      publisher: 'Endnight Games',
      price: '19.99',
      releaseDate: '2018-04-30',
    },
    {
      title: 'Sons of the Forest',
      genre: 'Survival',
      description:
        "Sons of the Forest is the highly anticipated sequel to The Forest, throwing you onto a cannibal-infested island in search of a missing billionaire. Survive alone or with friends in this terrifying new open-world survival horror experience. Build a base, craft weapons, and defend yourself against the island's mutant inhabitants. The advanced AI-driven companion system lets you team up with Kelvin, a fellow survivor who can help gather resources and build structures. Explore a vast island filled with secrets, from sun-drenched forests to dark caverns hiding unspeakable horrors. The dynamic seasons system changes the environment and affects gameplay throughout the year. With improved graphics, deeper survival mechanics, and a compelling mystery to uncover, Sons of the Forest delivers an intense and immersive horror survival experience. Work together to escape or perish on the island.",
      developer: 'Endnight Games',
      publisher: 'Newnight',
      price: '29.99',
      releaseDate: '2023-02-23',
    },
    {
      title: 'Rust',
      genre: 'Survival',
      description:
        "Rust is a multiplayer survival game where you must gather resources, build a base, and defend yourself against other players and the environment. Wake up naked, starving, and alone on a hostile island. Hunt animals for food and craft clothing, establish a base, and raid others in your quest for dominance. The only rule in Rust is that there are no rules - form alliances, betray friends, and do whatever it takes to survive. The game features full building mechanics, allowing you to construct elaborate bases with multiple floors, defenses, and traps. Regular updates add new content, weapons, vehicles, and gameplay features. With persistent servers that continue running even when you log off, the threat is always real. Experience intense PvP combat, cooperative base building, and the constant struggle for resources in one of gaming's most unforgiving survival experiences.",
      developer: 'Facepunch Studios',
      publisher: 'Facepunch Studios',
      price: '39.99',
      releaseDate: '2018-02-08',
    },
    {
      title: 'ARK Survival Evolved',
      genre: 'Survival',
      description:
        'ARK: Survival Evolved is an action-adventure survival game set in an open world filled with dinosaurs and other prehistoric creatures. Stranded on the mysterious shores of an island called ARK, you must hunt, harvest resources, craft items, grow crops, research technologies, and build shelters to withstand the elements. Tame and ride dinosaurs, from the mighty T-Rex to the swift Raptor, using them for transportation, combat, and resource gathering. Team up with other players or go it alone in both PvE and PvP environments. Explore vast landscapes filled with caves, underwater regions, and challenging boss arenas. With extensive character customization, breeding mechanics, and a massive world to explore, ARK offers hundreds of hours of gameplay. Build tribes with other players and work together to tame the ultimate dinosaur army.',
      developer: 'Studio Wildcard',
      publisher: 'Studio Wildcard',
      price: '29.99',
      releaseDate: '2017-08-29',
    },
    {
      title: 'No Mans Sky',
      genre: 'Exploration',
      description:
        "No Man's Sky is an exploration and survival game set in an infinite procedurally generated universe. Every planet, creature, and ship is unique, created by the game's algorithms. Explore planets teeming with life or barren wastelands, trade with alien races, engage in space combat, and build bases across the galaxy. Years of free updates have transformed the game into a massive multiplayer experience with base building, living ships, expeditions, settlements, and countless other features. Join the Anomaly to team up with other players for missions and share your discoveries. The Nexus connects you to a community of explorers, while the Atlas Path offers a mysterious story to uncover. With virtually unlimited planets to discover and constant updates adding new content, No Man's Sky offers an ever-expanding universe to explore.",
      developer: 'Hello Games',
      publisher: 'Hello Games',
      price: '59.99',
      releaseDate: '2016-08-09',
    },
    {
      title: 'Elite Dangerous',
      genre: 'Simulation',
      description:
        "Elite Dangerous is a massively multiplayer space flight simulation game set in a realistic 1:1 scale Milky Way galaxy containing 400 billion star systems. Take control of your own starship in a cutthroat galaxy. Command your ship and scour the galaxy for resources, engage in combat, or become a trader, miner, or bounty hunter. Every decision counts in this unforgiving simulation where you start with a small ship and work your way up to commanding massive vessels. Experience realistic flight physics, detailed ship systems, and a living galaxy that evolves based on player actions. Join a squadron with other commanders, influence the galaxy's political landscape, and discover the secrets hidden in the depths of space. With the Odyssey expansion, you can even step out of your ship and explore planets on foot. The galaxy awaits.",
      developer: 'Frontier Developments',
      publisher: 'Frontier Developments',
      price: '29.99',
      releaseDate: '2014-12-16',
    },
    {
      title: 'Star Citizen',
      genre: 'Simulation',
      description:
        'Star Citizen is the most ambitious space simulation game ever attempted, promising an unprecedented level of detail and immersion. Explore a vast universe in your own ship, from single-seat fighters to massive multi-crew capital ships. Experience first-person shooter gameplay on planets and space stations, mine asteroids for valuable resources, trade goods between systems, and engage in thrilling space combat. The game features stunning graphics, realistic physics, and a living universe where players shape the economy and politics. Multiple interconnected modules offer different gameplay experiences, from dogfighting in Arena Commander to FPS combat in Star Marine. With persistent universe servers running 24/7, your reputation, assets, and relationships carry forward. Join an organization with other players and make your mark on the galaxy in this groundbreaking space simulation.',
      developer: 'Cloud Imperium Games',
      publisher: 'Cloud Imperium Games',
      price: '45.00',
      releaseDate: '2024-12-01',
    },
    {
      title: 'Outer Wilds',
      genre: 'Exploration',
      description:
        "Outer Wilds is an award-winning open-world mystery about a solar system trapped in an endless time loop. You are the newest member of the space program of your small planet, about to embark on your first solo flight. But something is wrong - the sun is about to explode, and you only have 22 minutes before everything resets. Explore the secrets of a solar system where every planet has its own mysteries to uncover. From a planet that's falling into a black hole to one that's slowly being swallowed by sand, each location offers unique puzzles and discoveries. The game encourages exploration and curiosity, rewarding players who pay attention to details and connect the dots. With no combat and no hand-holding, Outer Wilds delivers a truly unique experience that has been praised for its incredible storytelling and ingenious design. Unravel the mystery before time runs out.",
      developer: 'Mobius Digital',
      publisher: 'Annapurna Interactive',
      price: '24.99',
      releaseDate: '2019-05-28',
    },
    {
      title: 'Disco Elysium',
      genre: 'RPG',
      description:
        'Disco Elysium is a groundbreaking role-playing game that combines innovative mechanics with a beautifully written narrative. You are a detective with a unique skill system at your disposal and a whole city block to carve your path across. Interrogate unforgettable characters, crack murders, or take bribes. Become a hero or an absolute disaster of a human being. The game features 24 skills that shape your internal monologue, from logical deduction to pure instinct. Every conversation becomes a battlefield where your thoughts clash and your personality emerges through your choices. With no combat in the traditional sense, the game focuses entirely on dialogue, investigation, and internal struggles. The Final Cut edition adds full voice acting for every character. Experience one of the most acclaimed RPGs ever made, with writing that sets a new standard for the medium.',
      developer: 'ZA/UM',
      publisher: 'ZA/UM',
      price: '39.99',
      releaseDate: '2019-10-15',
    },
    {
      title: 'Divinity Original Sin 2',
      genre: 'RPG',
      description:
        'Divinity: Original Sin 2 is a critically acclaimed tactical RPG that offers an incredibly deep and rewarding experience for fans of the genre. Set in the rich world of Rivellon, you and your party of adventurers must master the elements to defeat powerful enemies and solve intricate puzzles. Choose from six unique origin characters or create your own, each with their own backstory and personal quests. The turn-based combat system emphasizes environmental interactions - combine elements to create devastating effects like electrified water or poisonous clouds. Play alone or in cooperative multiplayer for up to four players, with full support for split-screen on consoles. The game features hundreds of hours of content, multiple endings, and a Game Master mode that lets you create your own adventures. Experience one of the greatest RPGs ever made.',
      developer: 'Larian Studios',
      publisher: 'Larian Studios',
      price: '44.99',
      releaseDate: '2017-09-14',
    },
    {
      title: 'Pillars of Eternity II',
      genre: 'RPG',
      description:
        "Pillars of Eternity II: Deadfire is an epic voyage of discovery and exploration in a vast archipelago of exotic islands. Pursue a rogue god over land and sea in the sequel to the critically acclaimed Pillars of Eternity. Captain your ship on a dangerous voyage across the Deadfire Archipelago, exploring new cultures and facing challenging foes. Recruit a colorful crew of adventurers, each with their own personal quests and motivations. Experience deep tactical combat that can be played in real-time with pause or turn-based modes. Your choices ripple outward across the game world, affecting factions, relationships, and the fate of the islands. With companion relationships, ship battles, and faction reputation systems, every playthrough offers new possibilities. Discover the conclusion to The Watcher's story in this sprawling, beautiful RPG.",
      developer: 'Obsidian Entertainment',
      publisher: 'Versus Evil',
      price: '39.99',
      releaseDate: '2018-05-08',
    },
    {
      title: 'Pathfinder Wrath of the Righteous',
      genre: 'RPG',
      description:
        'Pathfinder: Wrath of the Righteous is an epic CRPG based on the popular tabletop roleplaying game. Lead a crusade against demon armies threatening to consume the world. Embark on a journey to tear apart the veil that has corrupted the land. Mythic paths offer unprecedented power, transforming your character into an angel, demon, lich, or other legendary being. Build and manage your crusade, making strategic decisions that affect the war effort. Choose from 25 classes with seven mythic paths, crafting unique character builds with incredible depth. Lead a group of companions, each with their own story and moral compass. The game features challenging tactical combat, meaningful choices, and hundreds of hours of content. Whether you follow the path of righteousness or embrace darkness, your decisions shape the fate of the world. This is one of the most ambitious CRPGs ever made.',
      developer: 'Owlcat Games',
      publisher: 'META Publishing',
      price: '49.99',
      releaseDate: '2021-09-02',
    },
    {
      title: 'Wasteland 3',
      genre: 'RPG',
      description:
        'Wasteland 3 is a post-apocalyptic tactical RPG that continues the legendary series that inspired Fallout. The Desert Rangers, a faction devoted to rebuilding civilization, have been nearly wiped out. You are the survivors, traveling north to Colorado in a desperate bid for survival. Navigate the frozen wastelands of Colorado, making difficult choices that affect the world and its factions. Build a squad of Rangers, customizing their skills, perks, and equipment. Engage in tactical turn-based combat where positioning, cover, and environmental hazards can turn the tide of battle. The game features deep narrative choices, dark humor, and meaningful consequences for your decisions. Play solo or cooperatively with a friend online, sharing the story and the challenges. With multiple endings and paths through the game, Wasteland 3 offers excellent replayability.',
      developer: 'inXile Entertainment',
      publisher: 'Deep Silver',
      price: '39.99',
      releaseDate: '2020-08-28',
    },
    {
      title: 'Fallout 4',
      genre: 'RPG',
      description:
        'Fallout 4 is the next generation of open-world gaming from Bethesda Game Studios, set in a post-nuclear Boston known as the Commonwealth. As the sole survivor of Vault 111, you enter a world destroyed by nuclear war, searching for your kidnapped son. Experience the freedom to do whatever you want in a massive open world with hundreds of locations, characters, and quests. The new crafting system lets you build and manage entire settlements, creating safe havens for survivors or powerful bases for your faction. Collect and modify thousands of items, from weapons and armor to robots and power armor. The story features four distinct factions, each with their own vision for the future of the wasteland. With hundreds of hours of content, mod support, and endless character builds to explore, Fallout 4 offers an incredibly deep RPG experience.',
      developer: 'Bethesda Game Studios',
      publisher: 'Bethesda Softworks',
      price: '19.99',
      releaseDate: '2015-11-10',
    },
    {
      title: 'Fallout New Vegas',
      genre: 'RPG',
      description:
        'Fallout: New Vegas is widely considered one of the greatest RPGs ever made, combining deep storytelling with meaningful player agency. In the post-apocalyptic Mojave Wasteland, you are a courier left for dead after a mysterious attack. Track down your would-be killer while getting caught up in a power struggle between three major factions vying for control of New Vegas and its precious power source, Hoover Dam. The game features incredible writing, memorable characters, and choices that genuinely matter. Multiple factions, each with their own ideologies and goals, can be supported or opposed based on your decisions. The reputation system tracks how different groups perceive you, affecting gameplay and available options. With its compelling narrative, dark humor, and genuine role-playing depth, Fallout: New Vegas remains a beloved classic.',
      developer: 'Obsidian Entertainment',
      publisher: 'Bethesda Softworks',
      price: '9.99',
      releaseDate: '2010-10-19',
    },
    {
      title: 'The Elder Scrolls V Skyrim',
      genre: 'RPG',
      description:
        "The Elder Scrolls V: Skyrim is an epic fantasy RPG that has captivated millions of players worldwide. As the Dragonborn, a hero born with the soul of a dragon, you are the only one who can stand against the return of the dragons that threaten to destroy the world. Explore a vast open world filled with dungeons, cities, mountains, and forests. Join factions like the Companions, Thieves Guild, Dark Brotherhood, and College of Winterhold. Make choices that affect the civil war tearing Skyrim apart. With hundreds of quests, countless items to collect, and endless character builds to explore, Skyrim offers virtually unlimited gameplay. The extensive modding community has created thousands of additions, from simple improvements to massive expansions. Experience the freedom to be whoever you want in one of gaming's most beloved fantasy worlds.",
      developer: 'Bethesda Game Studios',
      publisher: 'Bethesda Softworks',
      price: '39.99',
      releaseDate: '2011-11-11',
    },
    {
      title: 'Mass Effect Legendary Edition',
      genre: 'RPG',
      description:
        "Mass Effect Legendary Edition is the definitive way to experience the acclaimed sci-fi RPG trilogy that defined a generation. Play as Commander Shepard, an elite human soldier tasked with saving the galaxy from an ancient threat. Your choices across all three games carry forward, affecting relationships, story outcomes, and the fate of entire species. Experience the complete single-player saga with over 40 DLC packs included, from additional missions to new squadmates. The games have been remastered with enhanced visuals, improved gameplay mechanics, and unified combat across all three titles. Build your squad from memorable companions, each with their own stories and loyalties. Explore the galaxy, negotiate peace between warring factions, or make the tough choices that no one else can. This is one of gaming's greatest stories, now better than ever.",
      developer: 'BioWare',
      publisher: 'Electronic Arts',
      price: '59.99',
      releaseDate: '2021-05-14',
    },
    {
      title: 'Dragon Age Inquisition',
      genre: 'RPG',
      description:
        'Dragon Age: Inquisition is an action RPG where you lead the Inquisition against a mysterious tear in the sky threatening to destroy the world of Thedas. As the only survivor of a cataclysmic explosion, you are marked with a mysterious power that lets you close these rifts. Build the Inquisition by recruiting agents, establishing outposts, and making alliances across the realm. Explore massive open regions filled with quests, secrets, and challenging enemies. Your party of companions each have their own stories, romances, and loyalty missions. The tactical combat system lets you pause and issue commands or play in real-time action mode. With multiple race and class options, meaningful choices that affect the world, and over 100 hours of content, Dragon Age: Inquisition offers an incredibly rich fantasy RPG experience.',
      developer: 'BioWare',
      publisher: 'Electronic Arts',
      price: '29.99',
      releaseDate: '2014-11-18',
    },
    {
      title: 'Dragon Age The Veilguard',
      genre: 'RPG',
      description:
        "Dragon Age: The Veilguard is the next chapter in BioWare's beloved fantasy RPG series. The ancient elven gods have been unleashed upon the world, threatening to destroy everything. Assemble a team of seven companions, each with unique abilities, backstories, and potential romances. Explore new regions of Thedas, from the magical streets of Minrathous to mysterious elven ruins. The evolved combat system offers fast-paced action with deep strategic elements. Make choices that shape the fate of nations and affect your relationships with allies and enemies alike. Experience BioWare's signature storytelling in a beautifully crafted fantasy world filled with political intrigue, ancient mysteries, and memorable characters. With stunning visuals, evolved gameplay, and the return of beloved elements from previous games, Dragon Age: The Veilguard promises to be an epic adventure.",
      developer: 'BioWare',
      publisher: 'Electronic Arts',
      price: '69.99',
      releaseDate: '2024-10-31',
    },
    {
      title: 'Borderlands 3',
      genre: 'FPS',
      description:
        "Borderlands 3 is a chaotic looter shooter with billions of guns and an endless variety of enemies to blast. As one of four new Vault Hunters, you'll travel across the galaxy searching for vaults filled with legendary loot. Team up with returning characters like Lilith, Claptrap, and more in the fight against the Calypso Twins, influencer-styled villains trying to unite the bandits of the galaxy. The game features four unique classes, each with three distinct skill trees offering wildly different playstyles. Every gun is procedurally generated, creating an endless variety of weapons with unique stats, elements, and effects. Play solo or cooperatively with up to four players in local or online multiplayer. With refined gunplay, a massive world to explore, and countless hours of endgame content, Borderlands 3 delivers the mayhem fans love.",
      developer: 'Gearbox Software',
      publisher: '2K Games',
      price: '29.99',
      releaseDate: '2019-09-13',
    },
    {
      title: 'Tiny Tinas Wonderlands',
      genre: 'FPS',
      description:
        "Tiny Tina's Wonderlands is a fantasy looter shooter adventure set in a tabletop-style world. Join the unpredictable Tiny Tina and her band of misfits on an epic quest where she serves as the Bunker Master, controlling and changing the world around you. Choose from six unique character classes and multiclass to create powerful combinations. Explore a vibrant fantasy world filled with dungeons, castles, and magical creatures. The game features all the chaotic gunplay Borderlands is known for, combined with fantasy elements like swords, spells, and mythical monsters. Melee weapons and magic join the arsenal of billions of guns for even more combat variety. Play solo or with up to four players in cooperative multiplayer. With Tiny Tina's wild imagination shaping every encounter, expect the unexpected in this hilarious and action-packed adventure.",
      developer: 'Gearbox Software',
      publisher: '2K Games',
      price: '59.99',
      releaseDate: '2022-03-25',
    },
    {
      title: 'Destiny 2',
      genre: 'FPS',
      description:
        'Destiny 2 is a free-to-play online multiplayer first-person shooter that combines MMO elements with fast-paced gunplay. As a Guardian, you wield powerful Light abilities and an arsenal of weapons to defend humanity against various alien threats. The game features three distinct classes - Titan, Warlock, and Hunter - each with unique subclasses and abilities. Experience cinematic story campaigns, challenging strikes, and endgame raids that require coordination and teamwork. The Crucible offers competitive PvP gameplay, while Gambit combines PvE and PvP elements. Seasonal content keeps the game fresh with new activities, weapons, and story developments. Build your Guardian with exotic weapons and armor that offer unique perks and playstyles. With millions of active players, regular events, and constant updates, Destiny 2 offers an ever-evolving shooter experience.',
      developer: 'Bungie',
      publisher: 'Bungie',
      price: '0.00',
      releaseDate: '2017-10-24',
    },
    {
      title: 'Warframe',
      genre: 'Action',
      description:
        'Warframe is a free-to-play cooperative third-person shooter set in an evolving sci-fi universe. As a Tenno, you control powerful biomechanical suits called Warframes, each with unique abilities and playstyles. Fast-paced movement systems let you wall-run, bullet-jump, and slide through levels with incredible agility. The game features over 80 Warframes to collect and customize, along with hundreds of weapons ranging from swords to explosive launchers. Play through an expansive story campaign that has grown significantly over the years, revealing the mysteries of the Tenno and the Origin System. Team up with up to four players for cooperative missions, or compete in PvP Conclave matches. With constant free updates adding new content, open-world areas, and gameplay systems, Warframe offers thousands of hours of gameplay without requiring any purchase.',
      developer: 'Digital Extremes',
      publisher: 'Digital Extremes',
      price: '0.00',
      releaseDate: '2013-03-25',
    },
    {
      title: 'Path of Exile',
      genre: 'Action RPG',
      description:
        'Path of Exile is a free-to-play action RPG set in the dark fantasy world of Wraeclast. Exiled from your homeland, you must fight to survive and uncover the mysteries of a corrupted continent. The game features an incredibly deep character customization system with a passive skill tree containing over 1,000 nodes and a unique skill gem system that lets you modify abilities in countless ways. Every quarter, new challenge leagues introduce fresh mechanics and content, keeping the game constantly evolving. Trade with other players, join guilds, and compete on ladders in seasonal leagues. The endgame Atlas of Worlds offers virtually unlimited content for dedicated players. With no pay-to-win mechanics and a fair monetization model, Path of Exile has become the gold standard for free-to-play games. Experience one of the deepest ARPGs ever created.',
      developer: 'Grinding Gear Games',
      publisher: 'Grinding Gear Games',
      price: '0.00',
      releaseDate: '2013-10-23',
    },
    {
      title: 'Path of Exile 2',
      genre: 'Action RPG',
      description:
        'Path of Exile 2 is the highly anticipated sequel that reimagines and expands upon everything that made the original legendary. Set years after the events of the first game, a new dark threat emerges in Wraeclast. Experience a completely new campaign with six acts of content, new character classes, and refined gameplay systems. The new skill gem system offers even more customization options, allowing players to create truly unique character builds. Improved graphics and animations bring the dark world of Wraeclast to life like never before. Play cooperatively with friends or tackle the challenges solo. While it shares an endgame with the original Path of Exile, Path of Exile 2 offers a completely standalone experience. With the same fair free-to-play model, Path of Exile 2 continues the legacy of depth and quality that defined its predecessor.',
      developer: 'Grinding Gear Games',
      publisher: 'Grinding Gear Games',
      price: '0.00',
      releaseDate: '2024-12-06',
    },
    {
      title: 'Lost Ark',
      genre: 'MMORPG',
      description:
        'Lost Ark is a free-to-play action MMORPG that combines fast-paced combat with a massive world to explore. Choose from multiple advanced classes, each with unique skills and playstyles, and embark on an epic quest to find the Lost Ark and save the world from darkness. The combat system emphasizes skill-based gameplay with flashy combos, dodges, and special abilities. Explore a vast world filled with continents, dungeons, and raids, each with their own challenges and rewards. The game features an extensive sailing system that lets you navigate the seas, discover islands, and engage in naval combat. Endgame content includes challenging raids, PvP arenas, and horizontal progression systems like collectibles and stronghold building. With regular content updates, seasonal events, and a passionate community, Lost Ark offers an incredible free-to-play MMORPG experience.',
      developer: 'Smilegate RPG',
      publisher: 'Amazon Games',
      price: '0.00',
      releaseDate: '2022-02-11',
    },
    {
      title: 'Guild Wars 2',
      genre: 'MMORPG',
      description:
        'Guild Wars 2 is a living world MMORPG that rewards exploration, cooperation, and personal story. The core game is completely free-to-play, offering hundreds of hours of content without subscription fees. Experience dynamic events that change based on player actions, creating a world that feels alive and responsive. Choose from nine professions and five races, each offering unique experiences and storylines. The combat system emphasizes active dodging, skill combos, and build customization. The game features World vs World massive battles between servers, structured PvP for competitive play, and challenging fractals and raids for PvE enthusiasts. Regular Living World updates continue the story and add new content at no additional cost. With beautiful art direction, engaging gameplay, and a welcoming community, Guild Wars 2 offers an accessible and rewarding MMORPG experience.',
      developer: 'ArenaNet',
      publisher: 'NCSOFT',
      price: '0.00',
      releaseDate: '2012-08-28',
    },
    {
      title: 'Black Desert Online',
      genre: 'MMORPG',
      description:
        "Black Desert Online is an action MMORPG known for its stunning graphics, deep systems, and extensive character customization. The game features one of the most detailed character creators ever made, allowing you to sculpt every aspect of your avatar's appearance. Combat is fast-paced and action-oriented, requiring skill and timing rather than tab-targeting. Explore a seamless open world filled with opportunities for life skills like fishing, farming, cooking, and trading. The node and worker system creates a complex economic simulation where you can build a trading empire. Engage in large-scale node wars and sieges with your guild, fighting for territory and resources. With regular updates adding new classes, regions, and content, Black Desert Online continues to expand. Experience one of the most ambitious MMORPGs with some of the best action combat in the genre.",
      developer: 'Pearl Abyss',
      publisher: 'Pearl Abyss',
      price: '9.99',
      releaseDate: '2016-03-03',
    },
    {
      title: 'The Crew Motorfest',
      genre: 'Racing',
      description:
        "The Crew Motorfest is an open-world racing game that transforms the Hawaiian island of O'ahu into the ultimate racing festival. Experience the thrill of driving in a tropical paradise with diverse terrains, from winding mountain roads to beautiful coastal highways. Compete in a variety of themed playlists celebrating different aspects of car culture, from classic American muscle to Japanese street racing. Choose from hundreds of vehicles, including cars, bikes, boats, and planes, each customizable to match your style. The seamless open world lets you explore freely, finding hidden challenges and photo opportunities across the island. Team up with friends in cooperative multiplayer or compete in PvP races. With regular content updates, seasonal events, and a passionate community, The Crew Motorfest offers an ever-expanding festival of speed.",
      developer: 'Ubisoft Ivory Tower',
      publisher: 'Ubisoft',
      price: '69.99',
      releaseDate: '2023-09-14',
    },
    {
      title: 'Gran Turismo 7',
      genre: 'Racing',
      description:
        "Gran Turismo 7 is the real driving simulator, offering the most authentic and complete car collecting and racing experience available. With over 420 cars and 97 track layouts, experience the thrill of motorsport from classic road cars to modern hypercars. The physics engine delivers unparalleled realism, accurately simulating tire grip, suspension dynamics, and weather conditions. Career mode takes you from beginner licenses to the pinnacle of racing competition. Experience stunning ray-traced graphics on PlayStation 5, with detailed interiors and realistic lighting. The livery editor lets you create custom designs, while tuning options allow you to modify every aspect of your vehicle's performance. With dynamic time and weather affecting track conditions, no two races are exactly alike. This is the ultimate experience for racing enthusiasts.",
      developer: 'Polyphony Digital',
      publisher: 'Sony Interactive',
      price: '69.99',
      releaseDate: '2022-03-04',
    },
    {
      title: 'F1 24',
      genre: 'Racing',
      description:
        "F1 24 is the official Formula 1 video game, offering the most authentic F1 experience available. Race as your favorite drivers on all the circuits from the current F1 calendar, from Monaco to Singapore. The game features improved physics modeling, delivering more realistic car handling and tire degradation. Experience the drama of a full F1 season in Career mode, managing your team, developing your car, and competing for the championship. My Team mode lets you create your own F1 team from the ground up, designing your livery and signing drivers. Split-screen and online multiplayer let you race against friends and players worldwide. With official teams, drivers, and tracks, plus enhanced presentation and commentary, F1 24 puts you at the heart of the world's most prestigious motorsport.",
      developer: 'Codemasters',
      publisher: 'Electronic Arts',
      price: '69.99',
      releaseDate: '2024-05-31',
    },
    {
      title: 'Dirt Rally 2.0',
      genre: 'Racing',
      description:
        "DiRT Rally 2.0 is the ultimate rally simulation, challenging you to master the art of off-road racing on the most challenging stages in the world. Experience authentic rally physics where every bump, jump, and surface change affects your car's behavior. Compete in official FIA World Rallycross Championship events and create your own custom championships. The game features incredibly detailed environments, from the forests of New Zealand to the deserts of Argentina. Your co-driver provides pace notes that are essential for navigating stages at high speed. Vehicle damage is realistically modeled, affecting handling and potentially ending your race. With a garage of licensed rally cars spanning multiple decades, from classic Group A machines to modern WRC vehicles, DiRT Rally 2.0 offers the most authentic rally experience available.",
      developer: 'Codemasters',
      publisher: 'Codemasters',
      price: '24.99',
      releaseDate: '2019-02-26',
    },
    {
      title: 'Assetto Corsa Competizione',
      genre: 'Racing',
      description:
        'Assetto Corsa Competizione is the official game of the GT World Challenge, offering the most realistic GT racing simulation available. Developed by Kunos Simulazioni, masters of racing physics, the game delivers an incredibly authentic driving experience. Every aspect of the GT3 and GT4 cars has been meticulously recreated, from engine sounds to suspension behavior. Race at legendary circuits like Spa-Francorchamps, Monza, and the Nürburgring 24-hour layout. Dynamic weather and day-night cycles affect track conditions and visibility, requiring constant adaptation. The competitive multiplayer features a sophisticated rating system matching you with drivers of similar skill. With laser-scanned tracks, licensed teams and drivers, and uncompromising simulation physics, Assetto Corsa Competizione is the definitive GT racing experience for serious sim racers.',
      developer: 'Kunos Simulazioni',
      publisher: '505 Games',
      price: '39.99',
      releaseDate: '2019-05-29',
    },
    {
      title: 'Rainbow Six Siege',
      genre: 'FPS',
      description:
        'Rainbow Six Siege is a tactical team-based shooter that emphasizes strategy, communication, and precise execution. Master dozens of unique operators, each with special gadgets and abilities that can turn the tide of battle. Attackers must breach and clear objectives while defenders fortify positions and create deadly traps. The destructible environment adds a layer of strategy, allowing you to create new sightlines and entry points. Regular content updates add new operators, maps, and seasonal events. The competitive ranked mode offers intense matches where teamwork and coordination are essential for victory. With millions of active players and a thriving esports scene, Rainbow Six Siege continues to be one of the most popular tactical shooters. Experience the tension of high-stakes tactical combat.',
      developer: 'Ubisoft Montreal',
      publisher: 'Ubisoft',
      price: '19.99',
      releaseDate: '2015-12-01',
    },
    {
      title: 'Counter-Strike 2',
      genre: 'FPS',
      description:
        'Counter-Strike 2 is the next evolution of the legendary tactical shooter that has defined competitive gaming for over two decades. Built on the Source 2 engine, the game features stunning visual upgrades, improved audio, and refined gameplay mechanics while maintaining the core Counter-Strike experience. Responsive smoke grenades now react to gunfire, explosions, and lighting in real-time. Classic maps have been completely rebuilt with new details and improved visibility. The tick-rate-independent gameplay ensures fair, responsive action regardless of server tick rate. Ranked competitive matchmaking matches you with players of similar skill level. With the same emphasis on teamwork, economy management, and precise gunplay that made the series legendary, Counter-Strike 2 represents the future of tactical shooters.',
      developer: 'Valve',
      publisher: 'Valve',
      price: '0.00',
      releaseDate: '2023-09-27',
    },
    {
      title: 'Valorant',
      genre: 'FPS',
      description:
        "VALORANT is a tactical hero shooter from Riot Games that combines precise gunplay with unique character abilities. Choose from a roster of agents, each with distinct powers that complement different playstyles and team compositions. The game features a 5v5 tactical format where teams alternate between attacking and defending objectives. Precise aim and strategic use of abilities are both essential for victory. The free-to-play model offers fair competition, with purchasable cosmetics that don't affect gameplay. Regular updates add new agents, maps, and game modes. The competitive ranked system and thriving esports scene offer paths to prove your skill at the highest levels. With Riot's commitment to anti-cheat measures and game integrity, VALORANT provides a fair and competitive environment for tactical shooter fans.",
      developer: 'Riot Games',
      publisher: 'Riot Games',
      price: '0.00',
      releaseDate: '2020-06-02',
    },
    {
      title: 'Overwatch 2',
      genre: 'FPS',
      description:
        'Overwatch 2 is a free-to-play team-based hero shooter where every match is an intense 5v5 battle. Choose from over 30 unique heroes, each with their own abilities and playstyles, and work with your team to complete objectives and outplay your opponents. The game features stunning visuals, colorful characters, and fast-paced action that rewards both individual skill and teamwork. Multiple game modes including Push, Escort, Control, and more offer varied gameplay experiences. Regular seasonal content adds new heroes, maps, and limited-time events. The competitive mode offers ranked matches for players seeking to climb the ladder. With an accessible learning curve but high skill ceiling, Overwatch 2 welcomes new players while offering depth for veterans. Join millions of players in the ultimate team-based action.',
      developer: 'Blizzard Entertainment',
      publisher: 'Blizzard Entertainment',
      price: '0.00',
      releaseDate: '2022-10-04',
    },
    {
      title: 'Apex Legends',
      genre: 'Battle Royale',
      description:
        'Apex Legends is a free-to-play battle royale hero shooter set in the Titanfall universe. Choose from a roster of powerful Legends, each with unique abilities that complement different playstyles and team compositions. Drop into fast-paced matches where 60 players compete to be the last squad standing. The innovative ping system allows for seamless communication without voice chat. Master advanced movement mechanics including sliding, climbing, and ziplines to outmaneuver opponents. Regular seasonal updates add new Legends, weapons, maps, and limited-time modes. The ranked system and ALGS esports circuit offer competitive paths for skilled players. With polished gunplay, excellent performance, and constant evolution, Apex Legends has established itself as one of the premier battle royale experiences available.',
      developer: 'Respawn Entertainment',
      publisher: 'Electronic Arts',
      price: '0.00',
      releaseDate: '2019-02-04',
    },
    {
      title: 'Fortnite',
      genre: 'Battle Royale',
      description:
        'Fortnite is a cultural phenomenon that combines battle royale gameplay with building mechanics and endless crossover content. Drop onto the island with 99 other players and fight to be the last one standing. The unique building system lets you construct walls, ramps, and structures for defense and mobility. Regular collaborations bring characters from movies, music, and other games into Fortnite, creating a constantly evolving universe. Zero Build mode offers a pure shooter experience without construction mechanics. Creative mode provides tools to build your own games and experiences. With multiple game modes, regular updates, and free-to-play accessibility, Fortnite offers something for everyone. The Item Shop features cosmetics from countless franchises, letting you express yourself with your favorite characters.',
      developer: 'Epic Games',
      publisher: 'Epic Games',
      price: '0.00',
      releaseDate: '2017-07-21',
    },
    {
      title: 'PUBG Battlegrounds',
      genre: 'Battle Royale',
      description:
        'PUBG: BATTLEGROUNDS is the original battle royale experience that popularized the genre and changed gaming forever. Land on strategic locations, loot weapons and equipment, and survive against up to 100 players on massive maps. The realistic gunplay emphasizes bullet physics, weapon attachments, and tactical positioning. Multiple maps offer different environments and gameplay experiences, from the classic Erangel to dense jungle and urban settings. Vehicle combat adds another dimension to battles, allowing for mobile firefights and quick rotations. The game now features free-to-play accessibility with optional cosmetic purchases. Regular updates add new content, weapons, and quality-of-life improvements. With millions of active players and a dedicated esports scene, PUBG: BATTLEGROUNDS remains a defining title in the battle royale genre.',
      developer: 'PUBG Studios',
      publisher: 'Krafton',
      price: '0.00',
      releaseDate: '2017-12-20',
    },
    {
      title: 'Hunt Showdown',
      genre: 'FPS',
      description:
        'Hunt: Showdown is a competitive first-person bounty hunting game with heavy PvPvE elements, set in a dark and brutal 19th-century Louisiana. Track and banish grotesque monsters across a sprawling open world while competing against other hunters seeking the same prizes. The unique Bounty Hunt mode creates intense, high-stakes matches where you risk losing everything upon death. Permanent character death and equipment loss raise the tension of every encounter. Period-appropriate weapons from pistols to shotguns to crossbows require precision and timing. The atmospheric sound design is crucial for survival, as every footstep and gunshot can reveal your position. Team up with partners or venture alone in this unforgiving world. With a dedicated community and regular content updates, Hunt: Showdown offers a unique and thrilling multiplayer experience.',
      developer: 'Crytek',
      publisher: 'Crytek',
      price: '39.99',
      releaseDate: '2019-08-27',
    },
    {
      title: 'Escape from Tarkov',
      genre: 'FPS',
      description:
        'Escape from Tarkov is a hardcore and realistic online first-person action RPG/Simulator with MMO features and a story-driven walkthrough. In the fictional Norvinsk region, you must survive raids in hazardous locations, managing your health, hydration, and energy while scavenging for loot. The incredibly detailed weapon customization system allows you to modify every aspect of your firearms. Combat is brutally realistic, with complex ballistics, realistic injury system, and permanent loss of gear upon death. The player economy is entirely player-driven, with a flea market for trading valuable items. Skill progression allows for long-term character development. Multiple maps offer different challenges and loot opportunities. With its uncompromising difficulty and depth, Escape from Tarkov attracts players seeking the ultimate hardcore survival shooter experience.',
      developer: 'Battlestate Games',
      publisher: 'Battlestate Games',
      price: '44.99',
      releaseDate: '2017-07-27',
    },
    {
      title: 'DayZ',
      genre: 'Survival',
      description:
        'DayZ is an unforgiving, authentic, open-world survival horror hybrid-MMO game where you must confront an infected post-Soviet country and survive. With no set objective, you must use whatever means available to stay alive. Explore the massive 230 square kilometer map of Chernarus, scavenging for food, water, weapons, and supplies. The infected pose a constant threat, but other survivors may be far more dangerous. Form alliances or become a bandit preying on others - the choice is yours. Disease, weather, and wildlife add additional survival challenges. Persistent servers maintain the state of the world and your character between sessions. Base building lets you establish secure hideouts to store your valuable gear. With its uncompromising difficulty and emergent player interactions, DayZ creates intense and memorable survival experiences.',
      developer: 'Bohemia Interactive',
      publisher: 'Bohemia Interactive',
      price: '44.99',
      releaseDate: '2018-12-13',
    },
    {
      title: 'Project Zomboid',
      genre: 'Survival',
      description:
        'Project Zomboid is an isometric zombie survival RPG that emphasizes realism and long-term survival over action. This is the ultimate zombie survival simulation, where you must manage hunger, thirst, mental health, and the ever-present threat of infection. The detailed skills and crafting systems allow for deep character progression, from carpentry to cooking to first aid. Fortify buildings, grow crops, and establish a sustainable community in the apocalypse. The bite transmission means one careless moment can spell the end of weeks of progress. Multiplayer servers allow you to team up or compete with other survivors. Regular updates continue to add features like NPCs, vehicles, and new areas. With its depth, challenge, and attention to detail, Project Zomboid offers the most comprehensive zombie survival experience available.',
      developer: 'The Indie Stone',
      publisher: 'The Indie Stone',
      price: '19.99',
      releaseDate: '2013-11-08',
    },
    {
      title: 'Left 4 Dead 2',
      genre: 'FPS',
      description:
        'Left 4 Dead 2 is a legendary cooperative first-person shooter that set the standard for zombie games. Team up with three friends to survive against hordes of infected across five campaigns, each telling its own story of the apocalypse. The AI Director dynamically adjusts the game to your performance, ensuring no two playthroughs are exactly alike. Special infected with unique abilities create deadly challenges that require teamwork to overcome. Versus mode lets players control the infected in asymmetric competitive battles. The Steam Workshop provides access to thousands of community-created campaigns, characters, and mods. Despite its age, the game maintains an active player community and remains incredibly fun. Experience the definitive cooperative zombie shooter that influenced countless games that followed.',
      developer: 'Valve',
      publisher: 'Valve',
      price: '9.99',
      releaseDate: '2009-11-17',
    },
    {
      title: 'Back 4 Blood',
      genre: 'FPS',
      description:
        "Back 4 Blood is a thrilling cooperative first-person shooter from the creators of the original Left 4 Dead. Humanity is on the brink of extinction, and you are part of a group of hardened veterans called the Cleaners fighting to take back the world from the Ridden. The card system adds a strategic layer, letting you build decks that customize your character's abilities and affect gameplay. Corruption cards modify each run, adding mutators and challenges for increased replayability. Four-player co-op challenges you to work together against the horde, while PvP mode lets you play as the Ridden. Multiple difficulty levels cater to casual players and those seeking extreme challenges. With regular updates adding new content and quality-of-life improvements, Back 4 Blood offers a fresh take on cooperative zombie shooting.",
      developer: 'Turtle Rock Studios',
      publisher: 'Warner Bros. Games',
      price: '59.99',
      releaseDate: '2021-10-12',
    },
    {
      title: 'Deep Rock Galactic',
      genre: 'FPS',
      description:
        'Deep Rock Galactic is a cooperative first-person shooter featuring badass space dwarves, mining, and intense cave combat. Team up with up to four players and take on perilous missions in procedurally generated cave systems. Each of the four classes offers unique abilities and equipment, requiring teamwork for success. The fully destructible environments let you dig through any terrain, creating your own paths and defenses. Complex cave systems are filled with valuable minerals to mine and dangerous creatures to fight. The core gameplay loop of completing missions, upgrading equipment, and tackling harder challenges is incredibly satisfying. Regular free updates add new biomes, enemies, and features. With its perfect blend of shooting, exploration, and cooperation, plus a healthy dose of dwarf humor, Deep Rock Galactic is a must-play for co-op fans. Rock and Stone!',
      developer: 'Ghost Ship Games',
      publisher: 'Coffee Stain Publishing',
      price: '29.99',
      releaseDate: '2020-05-13',
    },
    {
      title: 'Phasmophobia',
      genre: 'Horror',
      description:
        'Phasmophobia is a cooperative psychological horror game where you and your team of paranormal investigators enter haunted locations to gather evidence of ghost activity. Use authentic ghost hunting equipment including EMF readers, spirit boxes, and DOTS projectors to identify the type of ghost you are dealing with. Each ghost type has unique behaviors, strengths, and weaknesses that you must learn to survive. The ghost uses your microphone to listen to you, responding to questions and hunting when provoked. Higher difficulty levels remove safety features and make ghosts more aggressive. VR support provides an even more immersive and terrifying experience. Regular updates add new ghost types, equipment, and locations. With its unique gameplay, terrifying atmosphere, and emphasis on communication, Phasmophobia has become a beloved co-op horror experience.',
      developer: 'Kinetic Games',
      publisher: 'Kinetic Games',
      price: '13.99',
      releaseDate: '2020-09-18',
    },
    {
      title: 'Lethal Company',
      genre: 'Horror',
      description:
        'Lethal Company is a cooperative horror game where you and your crewmates explore abandoned moons to collect scrap for the Company. Work together to meet your profit quota while avoiding the deadly creatures that inhabit these forsaken facilities. The procedurally generated facilities offer endless variety, with different layouts, hazards, and monster combinations each run. Communication and coordination are essential as you navigate dark corridors and haul valuable scrap back to your ship. Various equipment from flashlights to stun grenades helps you survive, but the threat is always present. The unique atmosphere blends horror with dark humor, creating memorable moments of terror and hilarity. Regular updates from the solo developer add new content and features. Lethal Company has become a viral sensation for its perfect blend of co-op gameplay and horror.',
      developer: 'Zeekerss',
      publisher: 'Zeekerss',
      price: '9.99',
      releaseDate: '2023-10-23',
    },
    {
      title: 'Content Warning',
      genre: 'Horror',
      description:
        'Content Warning is a cooperative horror game where you and your friends film spooky content in the Old World to go viral on SpöökTube. Descend into procedurally generated underground facilities filled with monsters and hazards, capturing footage that will hopefully attract views. The more dangerous the content, the more views you get, creating a risk-reward system that encourages bold exploration. Work together to protect your camera operator while they film the horrors lurking in the darkness. Upload your footage and watch your view count grow, unlocking new equipment and customization options. The comedic tone balances the horror elements, creating hilarious moments of panic and failure. Short session length makes it perfect for quick gaming sessions with friends. Content Warning offers a unique twist on the co-op horror formula.',
      developer: 'Landfall',
      publisher: 'Landfall',
      price: '7.99',
      releaseDate: '2024-04-01',
    },
    {
      title: 'It Takes Two',
      genre: 'Adventure',
      description:
        "It Takes Two is a genre-bending platform adventure created for co-op only, following the story of Cody and May, a couple on the brink of divorce who are magically turned into dolls by their daughter. Work together through fantastical worlds, from inside a snow globe to a magical garden, each with unique gameplay mechanics and challenges. The game constantly reinvents itself, introducing new abilities and gameplay styles in every level. One moment you are piloting a pair of boots, the next you are shrunk to the size of insects battling wasps. Winner of numerous Game of the Year awards, the game is a masterclass in cooperative game design. Play locally on the same screen or online with a friend - only one copy is needed thanks to the Friend's Pass. Experience one of gaming's greatest co-op adventures.",
      developer: 'Hazelight Studios',
      publisher: 'Electronic Arts',
      price: '39.99',
      releaseDate: '2021-03-26',
    },
    {
      title: 'A Way Out',
      genre: 'Adventure',
      description:
        "A Way Out is an exclusively cooperative adventure where you play the roles of Leo and Vincent, two convicts who must break out of prison and stay on the run from authorities. Experience a gripping story written and directed by Josef Fares, known for his unique vision and emotional storytelling. The split-screen format is used innovatively, with both players seeing their character's perspective simultaneously even when separated. Gameplay varies wildly from stealth and combat to more peaceful activities like basketball and connect four. The narrative develops both characters deeply, exploring their motivations and the growing bond between them. Only one copy is required for online play with the Friend's Pass system. The emotional conclusion will stay with you long after the credits roll. Experience one of gaming's most unique cooperative narratives.",
      developer: 'Hazelight Studios',
      publisher: 'Electronic Arts',
      price: '29.99',
      releaseDate: '2018-03-23',
    },
    {
      title: 'Cuphead',
      genre: 'Action',
      description:
        'Cuphead is a classic run and gun action game heavily focused on boss battles, presented in a stunning 1930s cartoon art style. Play as Cuphead or Mugman (in local co-op) as you traverse strange worlds, acquire new weapons, learn powerful super moves, and uncover hidden secrets. The hand-drawn animation required years of painstaking work, creating a visual experience unlike anything else in gaming. Each boss battle is a unique challenge requiring pattern recognition, precise timing, and plenty of practice. Run and gun levels offer more traditional platforming challenges between boss encounters. The jazzy original soundtrack perfectly complements the vintage aesthetic. The Delicious Last Course DLC adds a new playable character and more challenging content. Despite its adorable appearance, Cuphead offers a serious challenge that will test even veteran players.',
      developer: 'Studio MDHR',
      publisher: 'Studio MDHR',
      price: '19.99',
      releaseDate: '2017-09-29',
    },
    {
      title: 'Celeste',
      genre: 'Platformer',
      description:
        "Celeste is a critically acclaimed platformer about climbing a mountain, both literally and figuratively. Help Madeline survive her inner demons on her journey to the top of Celeste Mountain in this challenging, hand-crafted adventure. The tight, responsive controls make every death feel fair, encouraging you to try again immediately. Each chapter introduces new mechanics and challenges, keeping the gameplay fresh throughout. The story deals thoughtfully with themes of anxiety and depression, resonating deeply with many players. Assist Mode provides accessibility options without judgment, allowing everyone to experience the story. Collectible strawberries and hidden B-sides offer extreme challenges for skilled players seeking more. The original soundtrack by Lena Raine is widely celebrated as one of gaming's best. Experience a masterpiece of game design that proves difficulty and accessibility can coexist.",
      developer: 'Maddy Makes Games',
      publisher: 'Maddy Makes Games',
      price: '19.99',
      releaseDate: '2018-01-25',
    },
    {
      title: 'Dead Cells',
      genre: 'Roguelike',
      description:
        "Dead Cells is a roguevania action platformer that combines the roguelike structure of permadeath and random generation with the interconnected world design of Metroidvanias. You are a failed experiment trying to escape a constantly evolving castle. Each run through the island generates a new layout while maintaining the player's accumulated unlocks and abilities. Combat is fast and fluid, rewarding aggressive play and precise dodge timing. Dozens of weapons, skills, and mutations offer countless build possibilities. Permanent upgrades persist between runs, gradually making you more powerful over time. Multiple bosses and branching paths encourage repeated exploration. Regular free updates have added new biomes, weapons, and content over the years. With its perfect blend of challenge, progression, and variety, Dead Cells has become a definitive title in the roguelike genre.",
      developer: 'Motion Twin',
      publisher: 'Motion Twin',
      price: '24.99',
      releaseDate: '2018-08-07',
    },
    {
      title: 'Slay the Spire',
      genre: 'Roguelike',
      description:
        'Slay the Spire is a revolutionary deck-building roguelike that fuses card games with traditional roguelike elements. Choose from four unique characters, each with their own starting deck and card pool, and climb the Spire through procedurally generated levels. Every decision matters - which cards to add, which to remove, which relics to collect, and which paths to take through the map. Combat is turn-based and strategic, requiring you to build synergies and adapt to different enemy types. The Daily Climb and custom game modifiers add endless variety to your runs. The modding community has created countless additional characters, cards, and challenges. With its accessible rules but deep strategy, Slay the Spire has inspired an entire genre of deck-building roguelikes. Experience the game that changed how we think about card games.',
      developer: 'Mega Crit Games',
      publisher: 'Mega Crit Games',
      price: '24.99',
      releaseDate: '2019-01-23',
    },
    {
      title: 'Vampire Survivors',
      genre: 'Roguelike',
      description:
        'Vampire Survivors is a gothic horror casual game with roguelike elements where your choices can allow you to quickly snowball against the hundreds of enemies that spawn around you. There is no place to hide, all you can do is try to survive as long as possible by collecting gems and leveling up your character. Choose from dozens of unlockable characters, each with different starting weapons and stats. Weapons automatically attack, allowing you to focus on movement and item choices. Combining weapons and passive items creates powerful evolved forms that clear the screen of enemies. Runs are short but incredibly replayable, with new content unlocking constantly. Despite its simple premise, the game offers surprising depth and satisfaction. Regular updates add new characters, stages, and mechanics. Experience the game that launched the survivor roguelike genre.',
      developer: 'poncle',
      publisher: 'poncle',
      price: '4.99',
      releaseDate: '2022-10-20',
    },
  ];

  for (let i = 0; i < games.length; i++) {
    const gameData = games[i];
    const game = await prisma.game.create({
      data: {
        keys: [
          `KEY-${i + 1}-001`,
          `KEY-${i + 1}-002`,
          `KEY-${i + 1}-003`,
          `KEY-${i + 1}-004`,
          `KEY-${i + 1}-005`,
        ],
        quantity: 5,
        title: gameData.title,
        genre: gameData.genre,
        buyCount: Math.floor(Math.random() * 1000),
        description: gameData.description,
        primaryImage: `/uploads/games/${gameData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
        additionalImages: [
          `/uploads/games/${gameData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-1.jpg`,
          `/uploads/games/${gameData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-2.jpg`,
        ],
        logo: `/uploads/logos/${gameData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-logo.png`,
        price: gameData.price,
        developer: gameData.developer,
        publisher: gameData.publisher,
        releaseDate: gameData.releaseDate,
        platforms: ['Windows', 'PlayStation 5', 'Xbox Series X'],
        minOS: 'Windows 10 64-bit',
        minCPU: 'Intel Core i5-4460 / AMD Ryzen 3 1200',
        minMemory: '8 GB RAM',
        minGPU: 'NVIDIA GTX 960 / AMD Radeon RX 470',
        minStorage: '50 GB',
        recOS: 'Windows 10/11 64-bit',
        recCPU: 'Intel Core i7-8700 / AMD Ryzen 5 3600',
        recMemory: '16 GB RAM',
        recGPU: 'NVIDIA RTX 2060 / AMD Radeon RX 5700 XT',
        recStorage: '100 GB SSD',
      },
    });
    console.log(`Created game ${i + 1}/123: ${game.title}`);
  }

  console.log(`\nSeeding completed! Total games: ${games.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
