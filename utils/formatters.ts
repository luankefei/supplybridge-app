export const FormatDate = (date: any) => {
  if (date) {
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: 'numeric'
    });
  }
  return "";
};

export const FormatDateRange = (startDate: string, endDate: string) => {
  if (startDate) {
    return `${new Date(startDate).toLocaleDateString("tr-TR", {
      day: "numeric",
    })} - ${new Date(endDate).toLocaleDateString("tr-TR", {
      day: "numeric",
    })} ${new Date(endDate).toLocaleDateString("tr-TR", {
      month: "long",
    })}`;
  }
  return "";
};

export function FormatPhoneNumber(number: string) {
  if (!number) {
    return '';
  }

  let formattedNumber = number.toString(); // Ex Number: 905319556464
  //Remove first digit 9
  formattedNumber = formattedNumber.slice(2, number.length);
  // 0 (531) 955 64 64
  return `${formattedNumber.substr(0, 1)}${formattedNumber.substr(1, 3)} ${formattedNumber.substr(4, 3)} ${formattedNumber.substr(7, 2)} ${formattedNumber.substr(9, 2)}`;
}

export function pxToRem(px: number): number {
  return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function remToPx(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
