import type { Position } from "@/lib/questionnaire-data"

export type Candidate = {
  id: string
  aboutCandidateLink: string
  balotaNumber: string
  profileLink: string
  lastName: string
  partyList: string
  fullName: string
  party: string
  positions: Record<string, Position>
  bio?: string
  achievements?: string[]
  advocacies?: string[]
}

// Extract full name and party from partyList string
function extractNameAndParty(partyList: string): { fullName: string; party: string } {
  const match = partyList.match(/(.+?)\s*$$(.+?)$$/)
  if (match) {
    return {
      fullName: match[1].trim(),
      party: match[2].trim(),
    }
  }
  return {
    fullName: partyList,
    party: "Independent",
  }
}

// Generate random positions for the 13 specific questions
function generateRandomPositions(): Record<string, Position> {
  const positions: Record<string, Position> = {}
  const options: Position[] = ["Pabor", "Di Pabor", "Wala"]

  const issues = [
    "abortion",
    "death-penalty",
    "same-sex-unions",
    "divorce",
    "impeach-sara-duterte",
    "defend-ph-sea",
    "icc-cooperation",
    "sexuality-education",
    "mandatory-rotc",
    "mining",
    "sogie-bill",
    "charter-change",
    "political-dynasties",
  ]

  issues.forEach((issue) => {
    positions[issue] = options[Math.floor(Math.random() * 3)]
  })

  return positions
}

// Add mock data for demonstration purposes
function addMockData(candidate: Partial<Candidate>): Candidate {
  const { fullName, party } = extractNameAndParty(candidate.partyList || "")

  // Generate a generic bio based on the candidate's name and party
  const bio = `${fullName} is a dedicated public servant and member of the ${party} party. With years of experience in Philippine politics, ${fullName.split(" ")[0]} has been an advocate for various social and economic reforms aimed at improving the lives of Filipino citizens.`

  // Generate generic achievements
  const achievements = [
    `Served as a ${Math.random() > 0.5 ? "local" : "national"} elected official`,
    `Authored ${Math.floor(Math.random() * 20) + 1} bills in the ${Math.random() > 0.5 ? "Senate" : "House of Representatives"}`,
    `Recognized for outstanding ${Math.random() > 0.5 ? "public service" : "community leadership"}`,
    `Led initiatives for ${Math.random() > 0.5 ? "economic development" : "social welfare"}`,
  ]

  // Generate generic advocacies
  const advocacies = [
    `${Math.random() > 0.5 ? "Education" : "Healthcare"} reform`,
    `${Math.random() > 0.5 ? "Environmental" : "Economic"} sustainability`,
    `${Math.random() > 0.5 ? "Anti-corruption" : "Transparency in governance"}`,
    `${Math.random() > 0.5 ? "Poverty alleviation" : "Job creation"}`,
  ]

  return {
    id: candidate.balotaNumber || "",
    aboutCandidateLink: candidate.aboutCandidateLink || "",
    balotaNumber: candidate.balotaNumber || "",
    profileLink: candidate.profileLink || "",
    lastName: candidate.lastName || "",
    partyList: candidate.partyList || "",
    fullName,
    party,
    positions: generateRandomPositions(),
    bio,
    achievements,
    advocacies,
  }
}

// Raw candidate data from the provided JSON
const rawCandidatesData = [
  {
    aboutCandidateLink: "https://www.rappler.com/people/n12735728-benhur-abalos/",
    balotaNumber: "1",
    profileLink: "https://www.rappler.com/tachyon/2025/01/ABALOS-BENHUR.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Abalos",
    partyList: "Benhur (PFP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/n34273576-bong-revilla/",
    balotaNumber: "11",
    profileLink: "https://www.rappler.com/tachyon/2025/01/BONGREVILLA-BONG.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Bong Revilla",
    partyList: "Ramon (LAKAS)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p75592354-jerome-adonis/",
    balotaNumber: "2",
    profileLink: "https://www.rappler.com/tachyon/2025/01/ADONIS-JEROME.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Adonis",
    partyList: "Jerome (MKBYN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p82791780-bonifacio-bosita/",
    balotaNumber: "12",
    profileLink: "https://www.rappler.com/tachyon/2025/01/BOSITA-BONIFACIO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Bosita",
    partyList: "Bonifacio (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p77743701-wilson-amad/",
    balotaNumber: "3",
    profileLink: "https://www.rappler.com/tachyon/2025/01/AMAD-WILSON.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Amad",
    partyList: "Wilson (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p44646012-arlene-brosas/",
    balotaNumber: "13",
    profileLink: "https://www.rappler.com/tachyon/2025/01/BROSAS-ARLENE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Brosas",
    partyList: "Arlene (MKBYN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p44725703-jocelyn-adamo/",
    balotaNumber: "4",
    profileLink: "https://www.rappler.com/tachyon/2025/01/ANDAMO-ALYN.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Andamo",
    partyList: "Nars Alyn (MKBYN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p34326970-roy-cabonegro/",
    balotaNumber: "14",
    profileLink: "https://www.rappler.com/tachyon/2025/01/CABONEGRO-ROY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Cabonegro",
    partyList: "Roy (DPP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/n26867214-bam-aquino/",
    balotaNumber: "5",
    profileLink: "https://www.rappler.com/tachyon/2025/01/AQUINO-BAM.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Aquino",
    partyList: "Bam (KNP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p13870911-allen-capuyan/",
    balotaNumber: "15",
    profileLink: "https://www.rappler.com/tachyon/2025/01/CAPUYAN-ALLEN.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Capuyan",
    partyList: "Allen (PPP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p21504305-ronnel-arambulo/",
    balotaNumber: "6",
    profileLink: "https://www.rappler.com/tachyon/2025/01/ARAMBULO-RONNEL.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Arambulo",
    partyList: "Ronnel (MKBYN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p78645871-teddy-casino/",
    balotaNumber: "16",
    profileLink: "https://www.rappler.com/tachyon/2025/01/CASINO-TEDDY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Casiño",
    partyList: "Teddy (MKBYN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p16263797-ernesto-arellano/",
    balotaNumber: "7",
    profileLink: "https://www.rappler.com/tachyon/2025/01/ARELLANO-ERNESTO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Arellano",
    partyList: "Ernesto (KTPNAN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p00263645-france-castro/",
    balotaNumber: "17",
    profileLink: "https://www.rappler.com/tachyon/2025/01/CASTRO-FRANCE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Castro",
    partyList: "Teacher France (MKBYN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p12969872-roberto-ballon/",
    balotaNumber: "8",
    profileLink: "https://www.rappler.com/tachyon/2025/01/BALLON-ROBERTO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Ballon",
    partyList: "Roberto (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p87395073-pia-cayetano/",
    balotaNumber: "18",
    profileLink: "https://www.rappler.com/tachyon/2025/01/CAYETANO-PIA.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Cayetano",
    partyList: "Pia (NP)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/n56231786-abby-binay",
    balotaNumber: "9",
    profileLink: "https://www.rappler.com/tachyon/2025/01/BINAY-ABBY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Binay",
    partyList: "Abby (NPC)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p75398820-david-d-angelo/",
    balotaNumber: "19",
    profileLink: "https://www.rappler.com/tachyon/2025/01/D-ANGELO-DAVID.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "D'Angelo",
    partyList: "David (BUNYOG)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p64692742-jimmy-bondoc/",
    balotaNumber: "10",
    profileLink: "https://www.rappler.com/tachyon/2025/01/BONDOC-JIMMY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Bondoc",
    partyList: "Jimmy (PDPLBN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p27546679-angelo-de-alban/",
    balotaNumber: "20",
    profileLink: "https://www.rappler.com/tachyon/2025/01/DE-ALBAN-ANGELO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "De Alban",
    partyList: "Attorney Angelo (IND)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/n30635729-leody-de-guzman",
    balotaNumber: "21",
    profileLink: "https://www.rappler.com/tachyon/2025/01/DE-GUZMAN-LEODY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "De Guzman",
    partyList: "Ka Leody (PLM)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p62701759-gringo-honasan/",
    balotaNumber: "31",
    profileLink: "https://www.rappler.com/tachyon/2025/01/HONASAN-GRINGO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Honasan",
    partyList: "Gringo (RP)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/n34147697-ronald-dela-rosa",
    balotaNumber: "22",
    profileLink: "https://www.rappler.com/tachyon/2025/01/DELAROSA-BATO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Dela Rosa",
    partyList: "Bato (PDPLBN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p40514825-relly-jose-jr/",
    balotaNumber: "32",
    profileLink: "https://www.rappler.com/tachyon/2025/01/RELLY-JOSE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Jose",
    partyList: "Relly Jr. (KBL)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p18828948-mimi-doringo/",
    balotaNumber: "23",
    profileLink: "https://www.rappler.com/tachyon/2025/01/DORINGO-MIMI.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Doringo",
    partyList: "Nanay Mimi (MKBYN)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/n61661752-panfilo-lacson",
    balotaNumber: "33",
    profileLink: "https://www.rappler.com/tachyon/2025/01/LACSON-PING.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Lacson",
    partyList: "Ping (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p87298399-arnel-escobal/",
    balotaNumber: "24",
    profileLink: "https://www.rappler.com/tachyon/2025/01/ESCOBAL-ARNEL.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Escobal",
    partyList: "Arnel (PM)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p80654400-raul-lambino/",
    balotaNumber: "34",
    profileLink: "https://www.rappler.com/tachyon/2025/01/LAMBINO-RAUL.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Lambino",
    partyList: "Raul (PDPLBN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p55643788-luke-espiritu/",
    balotaNumber: "25",
    profileLink: "https://www.rappler.com/tachyon/2025/01/ESPIRITU-LUKE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Espiritu",
    partyList: "Luke (PLM)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/p46987649-lito-lapid",
    balotaNumber: "35",
    profileLink: "https://www.rappler.com/tachyon/2025/01/LAPID-LITO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Lapid",
    partyList: "Lito (NPC)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p18272308-mody-floranda/",
    balotaNumber: "26",
    profileLink: "https://www.rappler.com/tachyon/2025/01/FLORANDA-MODY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Floranda",
    partyList: "Mody Piston (MKBYN)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/p43786492-wilbert-lee",
    balotaNumber: "36",
    profileLink: "https://www.rappler.com/tachyon/2025/01/LEE-WILBERT.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Lee",
    partyList: "Manoy Wilbert (AKSYON)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p45832637-marc-gamboa/",
    balotaNumber: "27",
    profileLink: "https://www.rappler.com/tachyon/2025/01/GAMBOA-MARC-LOUIE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Gamboa",
    partyList: "Marc Louie (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p58779206-amirah-lidasan/",
    balotaNumber: "37",
    profileLink: "https://www.rappler.com/tachyon/2025/01/LIDASAN-AMIRA.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Lidasan",
    partyList: "Amirah (MKBYN)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/n98336404-bong-go",
    balotaNumber: "28",
    profileLink: "https://www.rappler.com/tachyon/2025/01/GO-BONG.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Go",
    partyList: "Bong Go (PDPLBN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/n91130011-rodante-marcoleta/",
    balotaNumber: "38",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MARCOLETA-RODANTE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Marcoleta",
    partyList: "Rodante (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/n50319899-norberto-gonzales/",
    balotaNumber: "29",
    profileLink: "https://www.rappler.com/tachyon/2025/01/GONZALES-NORBERTO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Gonzales",
    partyList: "Norberto (PDSP)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/p69315340-imee-marcos",
    balotaNumber: "39",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MARCOS-IMEE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Marcos",
    partyList: "Imee R (NP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p41367627-jayvee-hinlo/",
    balotaNumber: "30",
    profileLink: "https://www.rappler.com/tachyon/2025/01/HINLO-JAYVEE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Hinlo",
    partyList: "Jayvee (PDPLBN)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/p65484824-norman-marquez",
    balotaNumber: "40",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MARQUEZ-NORMAN.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Marquez",
    partyList: "Norman (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p42318706-eric-martinez/",
    balotaNumber: "41",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MARTINEZ-ERIC.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Martinez",
    partyList: "Eric (IND)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/n19496311-kiko-pangilinan",
    balotaNumber: "51",
    profileLink: "https://www.rappler.com/tachyon/2025/01/PANGILINAN-KIKO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Pangilinan",
    partyList: "Kiko (LP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p39971197-marites-mata/",
    balotaNumber: "42",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MATA-RICHARD.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Mata",
    partyList: "Doc Marites (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p70563814-ariel-querubin/",
    balotaNumber: "52",
    profileLink: "https://www.rappler.com/tachyon/2025/01/QUERUBIN-ARIEL.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Querubin",
    partyList: "Ariel Porfirio (NP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p11508832-sonny-matula/",
    balotaNumber: "43",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MATULA-SONNY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Matula",
    partyList: "Atty. Sonny (WPP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/n98653484-apollo-quiboloy/",
    balotaNumber: "53",
    profileLink: "https://www.rappler.com/tachyon/2025/01/QUIBOLOY-APOLLO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Quiboloy",
    partyList: "Apollo (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p75976736-liza-maza/",
    balotaNumber: "44",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MAZA-LIZA.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Maza",
    partyList: "Liza (MKBYN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p70813894-danilo-ramos/",
    balotaNumber: "54",
    profileLink: "https://www.rappler.com/tachyon/2025/01/RAMOS-DANILO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Ramos",
    partyList: "Danilo (MKBYN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p15528438-heidi-mendoza/",
    balotaNumber: "45",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MENDOZA-HEIDI.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Mendoza",
    partyList: "Heidi (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p69249448-willie-revillame/",
    balotaNumber: "55",
    profileLink: "https://www.rappler.com/tachyon/2025/01/REVILLAME-WILLIE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Revillame",
    partyList: "Willie Wil (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p92869356-jose-montemayor/",
    balotaNumber: "46",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MONTEMAYOR-JOEY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Montemayor",
    partyList: "Joey (IND)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/p66508391-vic-rodriguez",
    balotaNumber: "56",
    profileLink: "https://www.rappler.com/tachyon/2025/01/RODRIGUEZ-VIC.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Rodriguez",
    partyList: "Atty. Vic (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p82710540-subair-mustapha/",
    balotaNumber: "47",
    profileLink: "https://www.rappler.com/tachyon/2025/01/MUSTAPHA-SUBAIR.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Mustapha",
    partyList: "Subair (WPP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p80570743-nur-ana-sahidulla/",
    balotaNumber: "57",
    profileLink: "https://www.rappler.com/tachyon/2025/01/SAHIDULLA-NUR-ANA.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Sahidulla",
    partyList: "Nur-Ana (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p78985059-jose-jessie-olivar/",
    balotaNumber: "48",
    profileLink: "https://www.rappler.com/tachyon/2025/01/OLIVAR-JOSE-JESSIE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Olivar",
    partyList: "Jose Jessie (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p74740007-phillip-salvador/",
    balotaNumber: "58",
    profileLink: "https://www.rappler.com/tachyon/2025/01/SALVADOR-PHILIP.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Salvador",
    partyList: "Phillip Ipe (PDPLBN)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/n97241858-willie-ong/",
    balotaNumber: "49",
    profileLink: "https://www.rappler.com/tachyon/2025/01/ONG-WILLIE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Ong",
    partyList: "Doc Willie (AKSYON)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/n70112766-tito-sotto",
    balotaNumber: "59",
    profileLink: "https://www.rappler.com/tachyon/2025/01/SOTTO-TITO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Sotto",
    partyList: "Tito (NPC)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/n63338002-manny-pacquiao/",
    balotaNumber: "50",
    profileLink: "https://www.rappler.com/tachyon/2025/01/PACQUIAO-MANNY.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Pacquiao",
    partyList: "Manny Pacman (PFP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p43929736-michael-tapado/",
    balotaNumber: "60",
    profileLink: "https://www.rappler.com/tachyon/2025/01/TAPADO-MICHAEL.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Tapado",
    partyList: "Michael Bongbong (PM)",
  },
  {
    aboutCandidateLink: "https://rappler.com/people/p33309379-francis-tolentino",
    balotaNumber: "61",
    profileLink: "https://www.rappler.com/tachyon/2025/01/TOLENTINO-FRANCIS.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Tolentino",
    partyList: "Francis (PFP)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p36706786-ben-tulfo/",
    balotaNumber: "62",
    profileLink: "https://www.rappler.com/tachyon/2025/01/TULFO-BEN.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Tulfo",
    partyList: "Ben Bitag (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p54824881-erwin-tulfo/",
    balotaNumber: "63",
    profileLink: "https://www.rappler.com/tachyon/2025/01/TULFO-ERWIN.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Tulfo",
    partyList: "Erwin (LAKAS)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p18485652-mar-valbuena/",
    balotaNumber: "64",
    profileLink: "https://www.rappler.com/tachyon/2025/01/VALBUENA-MAR.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Valbuena",
    partyList: "Mar Manibela (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p70396374-leandro-verceles/",
    balotaNumber: "65",
    profileLink: "https://www.rappler.com/tachyon/2025/01/VERCELES-LEANDRO.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Verceles",
    partyList: "Leandro (IND)",
  },
  {
    aboutCandidateLink: "https://www.rappler.com/people/p87014514-camille-villar/",
    balotaNumber: "66",
    profileLink: "https://www.rappler.com/tachyon/2025/01/VILLAR-CAMILLE.jpg?fit=300%2C300&w=3840&q=75",
    lastName: "Villar",
    partyList: "Camille (NP)",
  },
]

// Process the raw data to create the full candidate objects
export const candidatesData: Candidate[] = rawCandidatesData.map((candidate) => addMockData(candidate))

// Get a specific candidate by ID (balota number)
export function getCandidateById(id: string): Candidate | undefined {
  return candidatesData.find((candidate) => candidate.balotaNumber === id)
}

// Get all candidates
export function getAllCandidates(): Candidate[] {
  const sortedByBalotaNumber = candidatesData.sort((a, b) => a.balotaNumber - b.balotaNumber)
  return sortedByBalotaNumber
}

// Get candidates by party
export function getCandidatesByParty(party: string): Candidate[] {
  return candidatesData.filter((candidate) => candidate.party === party)
}

// Get all unique parties
export function getAllParties(): string[] {
  const parties = new Set(candidatesData.map((candidate) => candidate.party))
  return Array.from(parties)
}

// Calculate match percentage between user answers and candidate positions
export function calculateMatchPercentage(
  userAnswers: Record<string, Position>,
  candidatePositions: Record<string, Position>,
): number {
  let totalPoints = 0
  let maxPossiblePoints = 0

  // Compare each answer
  Object.keys(userAnswers).forEach((questionId) => {
    const userValue = userAnswers[questionId]
    const candidateValue = candidatePositions[questionId]

    // Award points for matching positions
    if (userValue === candidateValue) {
      totalPoints += 2
    } else if (userValue === "Wala" || candidateValue === "Wala") {
      totalPoints += 1 // Partial match if either has no position
    }

    maxPossiblePoints += 2
  })

  // Calculate match percentage
  return (totalPoints / maxPossiblePoints) * 100
}

// Get top matching candidates
export function getTopMatches(
  userAnswers: Record<string, Position>,
  candidates: Candidate[],
  limit = 12,
): Array<{ candidate: Candidate; matchPercentage: number }> {
  const candidatesWithScores = candidates.map((candidate) => {
    const matchPercentage = calculateMatchPercentage(userAnswers, candidate.positions)
    return { candidate, matchPercentage }
  })

  // Sort by match percentage (highest first) and take top matches
  return candidatesWithScores.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, limit)
}
