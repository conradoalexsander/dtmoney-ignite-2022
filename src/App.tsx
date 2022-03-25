import {createServer, Model} from "miragejs";
import {useState} from "react";
import Modal from "react-modal";
import {Dashboard} from "./components/Dashboard";
import {Header} from "./components/Header";
import {NewTransactionModal} from "./components/NewTransactionModal";
import {GlobalStyle} from "./styles/global";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Website freelance",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createdAt: new Date("2021-02-12 09:00:00"),
        },
        {
          id: 2,
          title: "Loan",
          type: "deposit",
          category: "Pension",
          amount: 5000,
          createdAt: new Date("2021-02-14 11:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      data.createdAt = new Date();

      return schema.create("transaction", data);
    });
  },
});

Modal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    return setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    return setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}

export default App;
