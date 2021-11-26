import PropTypes from "prop-types";
import { ellipsis, formatDate, transactionAmount } from "../utils";

const TransactionItem = ({ transactions }) => {
  let date = "";
  return transactions.map((item, index) => {
    if (item.status === "COMPLETED") {
      if (date === item.dateoperation) {
        return (
          <div className="transaction-item">
            <div className="transaction-item-details">
              <p className="m-0 account-name">{ellipsis(item.description)}</p>
            </div>
            <div className="transaction-item-balance text-bold">
              <p className="m-0">{transactionAmount(item.amount)}</p>
            </div>
          </div>
        );
      } else {
        date = item.dateoperation;
        return (
          <>
            <p className="m-0 date-operation text-bold mt-1">
              {formatDate(item.dateoperation)}
            </p>
            <div className="transaction-item">
              <div className="transaction-item-details">
                <p className="m-0 account-name">{ellipsis(item.description)}</p>
              </div>
              <div className="transaction-item-balance text-bold">
                <p className="m-0">{transactionAmount(item.amount)}</p>
              </div>
            </div>
          </>
        );
      }
    } else {
      return null;
    }
  });
};

TransactionItem.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionItem;
