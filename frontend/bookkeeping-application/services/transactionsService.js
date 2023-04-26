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
  edit: (data) => {
    return API.patch("/transactions/edit", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Transactions service err", err);
      });
  },
  delete: (data) => {
    return API.delete("/transactions/delete", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Transactions service err", err);
      });
  },
};

export default TransactionsService;
