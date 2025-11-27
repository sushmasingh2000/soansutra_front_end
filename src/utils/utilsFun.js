export const areYouSureFn = (sw, fn, params) => {
  sw.fire({
    title: "Are you sure?",
    text: "Do you want to proceed?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, proceed",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "z-[2000]", // higher than MUI dialogs
    },
  }).then((result) => {
    if (result.isConfirmed) {
      fn(params);
    }
  });
};
export const swalAlert = (
  sw,
  type = "Warning",
  msg = "Something is missing.",
  fn = null,
  params = null
) => {
  sw.fire({
    title: type,
    text: msg,
    icon: String(type)?.toLocaleLowerCase(),
    customClass: {
      popup: "z-[2000]", // higher than MUI dialogs
    },
  }).then((result) => {
    if (result.isConfirmed && fn && typeof fn === "function") {
      fn(params && params);
    }
  });
};

export const numberToWords = (amount) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const numToWords = (num) => {
    if (num < 20) return ones[num];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
      );
    if (num < 1000)
      return (
        ones[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 ? " " + numToWords(num % 100) : "")
      );
    return "";
  };

  if (isNaN(amount)) return "Invalid amount";

  const parts = amount.toString().split(".");
  let num = parseInt(parts[0]);
  let paise = parts[1] ? parseInt(parts[1].substring(0, 2)) : 0;

  if (num === 0) return "Zero Only";

  let str = "";

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const hundred = num;

  if (crore) str += numToWords(crore) + " Crore ";
  if (lakh) str += numToWords(lakh) + " Lakh ";
  if (thousand) str += numToWords(thousand) + " Thousand ";
  if (hundred) str += numToWords(hundred) + " ";

  str = str.trim() + " Only";

  if (paise > 0) {
    str += ` and ${numToWords(paise)} Paise Only`;
  }

  return str.replace(/\s+/g, " ");
};
