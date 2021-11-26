import { useEffect, useRef, useState } from "react";
import { capitalize, formatAccountNumber, formatBalance } from "./../utils";

import TransactionItem from "../components/TransactionItem";

import "./App.scss";

const App = () => {
  const [accountType, setAccountType] = useState([]);
  const [creditCardType, setCreditCardType] = useState([]);
  const [accountDetail, setAccountDetail] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const transactionsSection = useRef();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://indra-a01eo.herokuapp.com/indra-recruitment/api/accounts"
        );
        const result = await response.json();
        if (result) {
          const accounts = result.filter((item) => item.type === "ACCOUNT");
          setAccountType(accounts);
          const creditCards = result.filter(
            (item) => item.type === "CREDIT_CARD"
          );
          setCreditCardType(creditCards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const getTransactions = async (id, type) => {
    try {
      const response = await fetch(
        "https://indra-a01eo.herokuapp.com/indra-recruitment/api/account-detail?id=" +
          id
      );
      const result = await response.json();
      if (result) {
        if (type === "ACCOUNT") {
          const details = accountType.find((item) => item.id === id);
          setAccountDetail(details);
        } else if (type === "CREDIT_CARD") {
          const details = creditCardType.find((item) => item.id === id);
          setAccountDetail(details);
        }

        setTransactions(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo({
        behavior: "smooth",
        top: transactionsSection.current.offsetTop - 15,
      });
    }
  };

  const handleClose = () => {
    setTransactions([]);
  };

  return (
    <main className="main">
      <section className="container">
        <section className="accounts">
          <header className="section-white client-detail">
            <div>
              <h1 className="m-0 user">Hola Renzo</h1>
              <h3 className="m-0 welcome">Bienvenido!</h3>
            </div>
          </header>

          {accountType.length > 0 && (
            <section className="section-white">
              <h3 className="account-type color-grey">Cuentas</h3>

              {accountType.map((item) => {
                if (item.status === "ACTIVE") {
                  return (
                    <div
                      className="account-item"
                      key={item.id}
                      onClick={() => getTransactions(item.id, "ACCOUNT")}
                    >
                      <div className="account-item-details">
                        <p className="m-0 account-name">
                          {capitalize(item.name)}
                        </p>
                        <p className="m-0 text-italic text-bold">
                          {formatAccountNumber(item.number)}
                        </p>
                      </div>
                      <div className="account-item-balance">
                        <p className="m-0 text-bold">{`S/${formatBalance(
                          item.balance
                        )}`}</p>
                        <span className="color-grey text-help">
                          Saldo disponible
                        </span>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </section>
          )}

          {creditCardType.length > 0 && (
            <section className="section-white">
              <h3 className="account-type color-grey">Tarjetas</h3>

              {creditCardType.map((item) => {
                if (item.status === "ACTIVE") {
                  return (
                    <div
                      className="account-item"
                      key={item.id}
                      onClick={() => getTransactions(item.id, "CREDIT_CARD")}
                    >
                      <div className="account-item-details">
                        <p className="m-0 account-name">
                          {capitalize(item.name)}
                        </p>
                        <p className="m-0 text-italic text-bold">
                          {formatAccountNumber(item.number)}
                        </p>
                      </div>
                      <div className="account-item-balance">
                        <p className="m-0 text-bold">{`S/${formatBalance(
                          item.balance
                        )}`}</p>
                        <span className="color-grey text-help">
                          Saldo disponible
                        </span>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </section>
          )}
        </section>

        {transactions.length > 0 && (
          <section className="account-transactions" ref={transactionsSection}>
            <aside>
              <div className="close-header">
                <button className="btn-close" onClick={handleClose}>
                  X
                </button>
              </div>
              {accountDetail && (
                <header className="section-white account-balance">
                  <p className="m-0 text-bold account-detail-name">
                    {capitalize(accountDetail.name)}
                  </p>
                  <p className="m-0 text-bold account-detail-balance">{`S/${formatBalance(
                    accountDetail.balance
                  )}`}</p>
                  <strong className="text-help color-grey">
                    Saldo disponible
                  </strong>
                </header>
              )}

              <h3>ÚLTIMOS MOVIMIENTOS</h3>

              <section>
                <TransactionItem transactions={transactions} />
              </section>
            </aside>
          </section>
        )}
      </section>
    </main>
  );
};

export default App;
