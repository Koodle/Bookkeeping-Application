export default function TransactonsTable() {
  return (
    <div className="ml-4 mr-9 mt-10 h-72 bg-slate-100 rounded-lg w-auto inline-block shadow-lg">
      <div>
        <p className="text-lg font-bold mb-2 pt-2 text-center">Transactions</p>
      </div>
      <table className="table-fixed border">
        <thead>
          <tr className="bg-slate-100">
            <th className="px-2 w-44 border-4 border-solid font-semibold">
              Date
            </th>
            <th className="px-2 w-36 border-4 font-semibold">Reference</th>
            <th className="px-2 w-80 border-4 font-semibold">Details</th>
            <th className="px-2 w-44 border-4 font-semibold">Amount</th>
            <th className="px-2 w-44 border-4 font-semibold">Dr</th>
            <th className="px-2 w-44 border-4 font-semibold">Cr</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 border-2 text-center">31/03/2021</td>
            <td className="px-2 border-2">PIN 1</td>
            <td className="px-2 border-2">Fuel Expense</td>
            <td className="px-2 border-2">£20.00</td>
            <td className="px-2 border-2">4000 - Fuel</td>
            <td className="px-2 border-2">2000 - Bank</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
