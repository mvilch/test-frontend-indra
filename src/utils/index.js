import * as dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export const capitalize = (str) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

export const formatAccountNumber = (num) => {
  const subNum = num.substr(-4, 4);
  return `*${subNum}`;
};

export const formatBalance = (num) => {
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

export const ellipsis = (str) => {
  const count = 13;
  return str.length > count ? `${str.substring(0, count)}...` : str;
};

export const transactionAmount = (amount) => {
  const value = Number.parseFloat(amount);
  if (value < 0) {
    return <span className="text-error">{`S/ ${value.toFixed(2)}`}</span>;
  } else {
    return <span>{`S/ ${value.toFixed(2)}`}</span>;
  }
};

export const formatDate = (d) => {
  return dayjs(d).format("DD MMMM YYYY");
};
