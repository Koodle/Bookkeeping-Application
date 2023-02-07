// interface transactions {
//   transactions: string;
// }

// import { Dispatch, SetStateAction } from "react";

//TODO: change props from "any" to a specific interface
export default function TransactonsTable(props: any) {
  //TODO: Filters, Search bar, Links to specific ledger

  console.log("props", props.transactions);
  //TODO: put this data in the table
  //1) loop through the transactions array. for each() create html row

  return (
    <div className=" mt-10 h-96 bg-white rounded-lg w-fit mx-auto shadow-sm">
      <div className="text-center">
        <p className="text-lg pt-4 pb-6 pl-4">Transactions</p>
      </div>
      <table className="table-fixed border-none text-center mx-auto">
        <thead>
          <tr className="bg-cyan-100">
            <th className="px-2 w-44 border-none font-semibold">Date</th>
            <th className="px-2 w-36 border-none font-semibold">Reference</th>
            <th className="px-2 w-80 border-none font-semibold">Details</th>
            <th className="px-2 w-44 border-none font-semibold">Amount</th>
            <th className="px-2 w-44 border-none font-semibold">Dr</th>
            <th className="px-2 w-44 border-none font-semibold">Cr</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 border-l-2 border-r-2 border-b-2 overflow-hidden text-ellipsis break-words">
              31/03/2021
            </td>
            <td className="px-2 border-l-2 border-r-2 border-b-2">1</td>
            <td className="px-2 border-l-2 border-r-2 border-b-2">
              Fuel Expense
            </td>
            <td className="px-2 border-l-2 border-r-2 border-b-2">£20.00</td>
            <td className="px-2 border-l-2 border-r-2 border-b-2">
              4000 - Fuel
            </td>
            <td className="px-2 border-l-2 border-r-2 border-b-2">
              2000 - Bank
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
