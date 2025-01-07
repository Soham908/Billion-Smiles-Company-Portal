export const formatToINR = (num: number): string => {
  let formattedNumber = num.toLocaleString('en-IN', { currency: 'INR' });
  return formattedNumber;
};