export const splitString = (inputString: string) => {
  const separatorIndex = inputString.indexOf(':');
  if (separatorIndex !== -1) {
    const title = inputString.substring(0, separatorIndex).trim();
    const rest = inputString.substring(separatorIndex + 1).trim();

    if (title.split('').some((char) => char.toUpperCase() !== char)) {
      return { title: '', rest: inputString.trim() };
    } else {
      return { title, rest };
    }
  } else {
    return { title: '', rest: inputString.trim() };
  }
};
