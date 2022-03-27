import {useTransactions} from "../../hooks/useTransactions";
import {toCurrencyFormat, toDateFormat} from "../../utils/IntlUtils";
import {Container} from "./styles";

export function TransactionsTable() {
  const {transactions} = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(
            ({id, title, amount, category, type, createdAt}) => (
              <tr key={id}>
                <td>{title}</td>
                <td className={type}>{toCurrencyFormat(amount)}</td>
                <td>{category}</td>
                <td>{toDateFormat(new Date(createdAt))}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Container>
  );
}
