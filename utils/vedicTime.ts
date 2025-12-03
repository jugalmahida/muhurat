export type MuhuratStatus = "Good" | "Bad" | "Neutral";

export interface Choghadiya {
  name: string;
  startTime: Date;
  endTime: Date;
  status: MuhuratStatus;
  isNight: boolean;
}

// Choghadiya Names in Hindi
const CHOGHADIYA_NAMES = {
  UDVEG: "उद्वेग",
  CHAL: "चल",
  LABH: "लाभ",
  AMRIT: "अमृत",
  KAAL: "काल",
  SHUBH: "शुभ",
  ROG: "रोग",
};

// Day-wise sequences (Daytime)
// Sunday (0) to Saturday (6)
const DAY_SEQUENCES = [
  [
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.UDVEG,
  ], // Sun
  [
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.AMRIT,
  ], // Mon
  [
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.ROG,
  ], // Tue
  [
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.LABH,
  ], // Wed
  [
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.SHUBH,
  ], // Thu
  [
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.CHAL,
  ], // Fri
  [
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.KAAL,
  ], // Sat
];

// Night-wise sequences (Sunset to Sunrise)
const NIGHT_SEQUENCES = [
  [
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.SHUBH,
  ], // Sun
  [
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.CHAL,
  ], // Mon
  [
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.KAAL,
  ], // Tue
  [
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.UDVEG,
  ], // Wed
  [
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.AMRIT,
  ], // Thu
  [
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.ROG,
  ], // Fri
  [
    CHOGHADIYA_NAMES.LABH,
    CHOGHADIYA_NAMES.UDVEG,
    CHOGHADIYA_NAMES.SHUBH,
    CHOGHADIYA_NAMES.AMRIT,
    CHOGHADIYA_NAMES.CHAL,
    CHOGHADIYA_NAMES.ROG,
    CHOGHADIYA_NAMES.KAAL,
    CHOGHADIYA_NAMES.LABH,
  ], // Sat
];

const GOOD_MUHURATS = ["शुभ", "अमृत", "चल", "लाभ"];

export const getStatus = (name: string): MuhuratStatus => {
  return GOOD_MUHURATS.includes(name) ? "Good" : "Bad";
};

export const getMuhuratDescription = (name: string): string => {
  switch (name) {
    case "उद्वेग":
      return "Anxiety inducing, avoid important tasks.";
    case "चल":
      return "Dynamic energy, good for travel and movement.";
    case "लाभ":
      return "Beneficial for business, education and skills.";
    case "अमृत":
      return "Highly auspicious, best for all types of work.";
    case "काल":
      return "Inauspicious time, avoid new beginnings.";
    case "शुभ":
      return "Auspicious for weddings and religious activities.";
    case "रोग":
      return "Indicates disease or conflict, avoid treatment.";
    default:
      return "Neutral time.";
  }
};

export const getTodaysChoghadiya = (
  currentDate: Date = new Date()
): Choghadiya[] => {
  // Hardcoded Sunrise/Sunset for simplicity: 6:00 AM / 6:00 PM
  const sunrise = new Date(currentDate);
  sunrise.setHours(6, 0, 0, 0);

  const sunset = new Date(currentDate);
  sunset.setHours(18, 0, 0, 0);

  const nextSunrise = new Date(sunrise);
  nextSunrise.setDate(nextSunrise.getDate() + 1);

  const dayOfWeek = currentDate.getDay(); // 0 = Sun, 1 = Mon...

  const daySequence = DAY_SEQUENCES[dayOfWeek];
  const nightSequence = NIGHT_SEQUENCES[dayOfWeek];

  const durationDay = (sunset.getTime() - sunrise.getTime()) / 8;
  const durationNight = (nextSunrise.getTime() - sunset.getTime()) / 8;

  const choghadiyas: Choghadiya[] = [];

  // Generate Day Choghadiyas
  daySequence.forEach((name, index) => {
    const start = new Date(sunrise.getTime() + index * durationDay);
    const end = new Date(start.getTime() + durationDay);
    choghadiyas.push({
      name,
      startTime: start,
      endTime: end,
      status: getStatus(name),
      isNight: false,
    });
  });

  // Generate Night Choghadiyas
  nightSequence.forEach((name, index) => {
    const start = new Date(sunset.getTime() + index * durationNight);
    const end = new Date(start.getTime() + durationNight);
    choghadiyas.push({
      name,
      startTime: start,
      endTime: end,
      status: getStatus(name),
      isNight: true,
    });
  });

  return choghadiyas;
};

export const getCurrentMuhurat = (
  list: Choghadiya[],
  now: Date
): Choghadiya | undefined => {
  return list.find((m) => now >= m.startTime && now < m.endTime);
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatTimeWithSeconds = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
