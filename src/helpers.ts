export const truncate = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
};

export const arrayToStringWithQuotes = (arr: string[]) => {
    return arr.map(str => `"${str}"`).join(',');
};