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
        console.log("get all transactions ", res.data);
        saveToLocalStorage("transactions", res.data)
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
    console.log("data", data);
    return API.delete("/transactions/delete", {data} )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Transactions service err", err);
      });
  },
};

const saveToLocalStorage = (name, data) => {
  //we cannot store a JS object. Must convert to string.
  localStorage.setItem(name, JSON.stringify(data));
};


export default TransactionsService;
