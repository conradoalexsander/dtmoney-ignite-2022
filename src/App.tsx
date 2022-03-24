import {createServer} from "miragejs";
import {useState} from "react";
import Modal from "react-modal";
import {Dashboard} from "./components/Dashboard";
import {Header} from "./components/Header";
import {NewTransactionModal} from "./components/NewTransactionModal";
import {GlobalStyle} from "./styles/global";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "Transaction 1",
          amount: 400,
          type: "deposit",
          category: "Food",
          createdAt: new Date(),
        },
      ];
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
