import API from "./api";

const TransactionsService = {
  create: (data) => {
    return API.post("/transactions/create", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Transactions service err", err);
      });
  },
  getAll: () => {
    return API.get("/transactions")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Transactions service err", err);
      });
  },
  // getLedgers:  TODO:
};

export default TransactionsService;
