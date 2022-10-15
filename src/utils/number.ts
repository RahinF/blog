/**
 * @param number
 * @description abbreviates number e.g 1000 => 1k
 * @returns string
 */
export const abbreviateNumber = (number: number) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(number);
};
