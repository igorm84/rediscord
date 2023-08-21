const translation = {
  user: {
    status: {
      online: "Online",
      idle: "Idle",
      dnd: "Don't Disturb",
      offline: "Offline",
      mobile: "Mobile",
    },
  },
};

type TranslationKeys = keyof typeof translation;

export const t = (key: string) => {
  try {
    const keys = key.toLowerCase().split(".") as TranslationKeys[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = translation;
    for (const k of keys) {
      result = result[k];
    }
    return result;
  } catch (error) {
    console.error(error);
    return key;
  }
};
