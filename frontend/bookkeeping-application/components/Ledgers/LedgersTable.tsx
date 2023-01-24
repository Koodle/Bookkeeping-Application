export default function LedgersTable() {
  return (
    <div className="">
      <p>Date</p>
      <p>Sort</p>

      <div className="ml-4 mr-9 mt-10 h-72 bg-white rounded-lg shadow-sm">
        <div className="text-center">
          <p className="text-lg pt-4 pb-6 pl-4">Ledger Summary</p>
        </div>
        <table className="table-fixed border-none mx-auto">
          <thead>
            <tr className="bg-cyan-200">
              <th className="px-2 w-3/5 border-none font-semibold">Account</th>
              <th className="px-2 w-36 border-none font-semibold">Debit</th>
              <th className="px-2 w-36 border-none font-semibold">Credit</th>
              <th className="px-2 w-36 border-none font-semibold">
                Balance B/D
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 border-2">Bank Account</td>
              <td className="px-2 border-2">£3250</td>
              <td className="px-2 border-2">£2250</td>
              <td className="px-2 border-2">£1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
