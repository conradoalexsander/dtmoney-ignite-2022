import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import {useTransactions} from "../../hooks/useTransactions";
import {toCurrencyFormat} from "../../utils/IntlUtils";
import {Container} from "./styles";

export function Summary() {
  const {transactions} = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      const {type, amount} = transaction;

      if (type === "deposit") {
        acc.deposits += amount;
        acc.total += amount;
      }

      if (type === "withdraw") {
        acc.withdraws += amount;
        acc.total -= amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Incomes</p>
          <img src={incomeImg} alt="Incomes" />
        </header>
        <strong>{toCurrencyFormat(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Outcomes</p>
          <img src={outcomeImg} alt="Outcomes" />
        </header>

        <strong>
          {summary.withdraws > 0 ? "-" : ""}{" "}
          {toCurrencyFormat(summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{toCurrencyFormat(summary.total)}</strong>
      </div>
    </Container>
  );
}
