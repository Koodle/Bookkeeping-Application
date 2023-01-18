export default function TransactonsTable() {
  return (
    <div className="ml-4 mr-9 mt-10 h-72 bg-white rounded-lg w-auto inline-block shadow-sm">
      <div>
        <p className="text-lg font-semibold pt-4 pb-6 pl-4">Transactions</p>
      </div>
      <table className="table-fixed border text-center">
        <thead>
          <tr>
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
            <td className="px-2 border-2 overflow-hidden text-ellipsis break-words">
              31/03/2021
            </td>
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
