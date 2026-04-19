export type GameLayout = "feature-list" | "two-up-grid" | "poster-grid";

export interface AboutGame {
  title: string;
  poster: string;
  description: string;
}

export interface AboutGameGroup {
  title: string;
  layout: GameLayout;
  games: AboutGame[];
}

const favoriteDescription = "在这里写你对这款游戏的短评。";
const shooterDescription = "在这里写你和朋友一起玩这款游戏的短评。";

export const aboutGameGroups: AboutGameGroup[] = [
  {
    title: "最喜欢的",
    layout: "feature-list",
    games: [
      {
        title: "The Last of Us Part II",
        poster: "/images/games/favorites/the-last-of-us-part-ii.jpg",
        description: favoriteDescription,
      },
      {
        title: "Death Stranding",
        poster: "/images/games/favorites/death-stranding.jpg",
        description: favoriteDescription,
      },
      {
        title: "League of Legends",
        poster: "/images/games/favorites/league-of-legends.jpg",
        description: favoriteDescription,
      },
    ],
  },
  {
    title: "射击游戏",
    layout: "feature-list",
    games: [
      {
        title: "Tom Clancy’s Rainbow Six Siege",
        poster: "/images/games/shooters/rainbow-six-siege.jpg",
        description: shooterDescription,
      },
      {
        title: "Counter-Strike 2",
        poster: "/images/games/shooters/counter-strike-2.jpg",
        description: shooterDescription,
      },
      {
        title: "PUBG: Battlegrounds",
        poster: "/images/games/shooters/pubg-battlegrounds.jpg",
        description: shooterDescription,
      },
      {
        title: "Apex Legends",
        poster: "/images/games/shooters/apex-legends.jpg",
        description: shooterDescription,
      },
      {
        title: "Overwatch 2",
        poster: "/images/games/shooters/overwatch-2.jpg",
        description: shooterDescription,
      },
      {
        title: "Delta Force",
        poster: "/images/games/shooters/delta-force.jpg",
        description: shooterDescription,
      },
    ],
  },
  {
    title: "完美通关",
    layout: "two-up-grid",
    games: [
      {
        title: "Death Stranding",
        poster: "/images/games/completion/death-stranding.jpg",
        description: favoriteDescription,
      },
      {
        title: "Death Stranding 2: On the Beach",
        poster: "/images/games/completion/death-stranding-2-on-the-beach.jpg",
        description: favoriteDescription,
      },
      {
        title: "God of War",
        poster: "/images/games/completion/god-of-war-2018.jpg",
        description: favoriteDescription,
      },
      {
        title: "God of War Ragnarök",
        poster: "/images/games/completion/god-of-war-ragnarok.jpg",
        description: favoriteDescription,
      },
      {
        title: "Black Myth: Wukong",
        poster: "/images/games/completion/black-myth-wukong.jpg",
        description: favoriteDescription,
      },
      {
        title: "Ghost of Tsushima",
        poster: "/images/games/completion/ghost-of-tsushima.jpg",
        description: favoriteDescription,
      },
      {
        title: "The Last of Us Part II",
        poster: "/images/games/completion/the-last-of-us-part-ii.jpg",
        description: favoriteDescription,
      },
      {
        title: "Stellar Blade",
        poster: "/images/games/completion/stellar-blade.jpg",
        description: favoriteDescription,
      },
      {
        title: "DEATHLOOP",
        poster: "/images/games/completion/deathloop.jpg",
        description: favoriteDescription,
      },
      {
        title: "Ratchet & Clank: Rift Apart",
        poster: "/images/games/completion/ratchet-and-clank-rift-apart.jpg",
        description: favoriteDescription,
      },
      {
        title: "Resident Evil 2",
        poster: "/images/games/completion/resident-evil-2.jpg",
        description: favoriteDescription,
      },
      {
        title: "Kingdom Come: Deliverance",
        poster: "/images/games/completion/kingdom-come-deliverance.jpg",
        description: favoriteDescription,
      },
      {
        title: "Kingdom Come: Deliverance II",
        poster: "/images/games/completion/kingdom-come-deliverance-ii.jpg",
        description: favoriteDescription,
      },
      {
        title: "Cyberpunk 2077",
        poster: "/images/games/completion/cyberpunk-2077.jpg",
        description: favoriteDescription,
      },
      {
        title: "Baldur’s Gate 3",
        poster: "/images/games/completion/baldurs-gate-3.jpg",
        description: favoriteDescription,
      },
      {
        title: "Hades",
        poster: "/images/games/completion/hades.jpg",
        description: favoriteDescription,
      },
      {
        title: "Hades II",
        poster: "/images/games/completion/hades-ii.jpg",
        description: favoriteDescription,
      },
      {
        title: "Dark Souls III",
        poster: "/images/games/completion/dark-souls-iii.jpg",
        description: favoriteDescription,
      },
      {
        title: "Elden Ring",
        poster: "/images/games/completion/elden-ring.jpg",
        description: favoriteDescription,
      },
      {
        title: "The Witcher 3: Wild Hunt",
        poster: "/images/games/completion/the-witcher-3-wild-hunt.jpg",
        description: favoriteDescription,
      },
      {
        title: "Demon’s Souls",
        poster: "/images/games/completion/demons-souls.jpg",
        description: favoriteDescription,
      },
    ],
  },
  {
    title: "通关过",
    layout: "poster-grid",
    games: [
      {
        title: "Sekiro: Shadows Die Twice",
        poster: "/images/games/finished/sekiro-shadows-die-twice.jpg",
        description: "",
      },
      {
        title: "Assassin’s Creed II",
        poster: "/images/games/finished/assassins-creed-ii.jpg",
        description: "",
      },
      {
        title: "Assassin’s Creed IV: Black Flag",
        poster: "/images/games/finished/assassins-creed-iv-black-flag.jpg",
        description: "",
      },
      {
        title: "Assassin’s Creed Unity",
        poster: "/images/games/finished/assassins-creed-unity.jpg",
        description: "",
      },
      {
        title: "Assassin’s Creed Origins",
        poster: "/images/games/finished/assassins-creed-origins.jpg",
        description: "",
      },
      {
        title: "Assassin’s Creed Odyssey",
        poster: "/images/games/finished/assassins-creed-odyssey.jpg",
        description: "",
      },
      {
        title: "Assassin’s Creed Valhalla",
        poster: "/images/games/finished/assassins-creed-valhalla.jpg",
        description: "",
      },
      {
        title: "Assassin’s Creed Mirage",
        poster: "/images/games/finished/assassins-creed-mirage.jpg",
        description: "",
      },
      {
        title: "Assassin’s Creed Shadows",
        poster: "/images/games/finished/assassins-creed-shadows.jpg",
        description: "",
      },
      {
        title: "Watch Dogs",
        poster: "/images/games/finished/watch-dogs.jpg",
        description: "",
      },
      {
        title: "Far Cry 6",
        poster: "/images/games/finished/far-cry-6.jpg",
        description: "",
      },
      {
        title: "It Takes Two",
        poster: "/images/games/finished/it-takes-two.jpg",
        description: "",
      },
      {
        title: "Split Fiction",
        poster: "/images/games/finished/split-fiction.jpg",
        description: "",
      },
      {
        title: "Battlefield 1",
        poster: "/images/games/finished/battlefield-1.jpg",
        description: "",
      },
      {
        title: "Battlefield V",
        poster: "/images/games/finished/battlefield-v.jpg",
        description: "",
      },
      {
        title: "Battlefield 2042",
        poster: "/images/games/finished/battlefield-2042.jpg",
        description: "",
      },
      {
        title: "Marvel’s Spider-Man: Miles Morales",
        poster: "/images/games/finished/marvels-spider-man-miles-morales.jpg",
        description: "",
      },
      {
        title: "Grand Theft Auto V",
        poster: "/images/games/finished/grand-theft-auto-v.jpg",
        description: "",
      },
      {
        title: "Red Dead Redemption 2",
        poster: "/images/games/finished/red-dead-redemption-2.jpg",
        description: "",
      },
      {
        title: "The Legend of Zelda: Breath of the Wild",
        poster: "/images/games/finished/the-legend-of-zelda-breath-of-the-wild.jpg",
        description: "",
      },
      {
        title: "The Legend of Zelda: Tears of the Kingdom",
        poster: "/images/games/finished/the-legend-of-zelda-tears-of-the-kingdom.jpg",
        description: "",
      },
      {
        title: "Kirby and the Forgotten Land",
        poster: "/images/games/finished/kirby-and-the-forgotten-land.jpg",
        description: "",
      },
      {
        title: "Sifu",
        poster: "/images/games/finished/sifu.jpg",
        description: "",
      },
      {
        title: "Tale of Immortal",
        poster: "/images/games/finished/tale-of-immortal.jpg",
        description: "",
      },
      {
        title: "Borderlands 3",
        poster: "/images/games/finished/borderlands-3.jpg",
        description: "",
      },
    ],
  },
];
