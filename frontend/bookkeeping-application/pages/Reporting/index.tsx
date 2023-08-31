//components
import SideBar from "../../components/Layout/SideBar";

//Hooks
import { useEffect } from "react";

//redux
import { useAppSelector } from "../../store/hooks";

export default function Ledgers() {
  const ledgersFromState = useAppSelector(
    (state) => state.transactions.ledgers
  );

  let organizedLedgers = organizeLedgersByAccount(ledgersFromState)
    
  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>

      <div className="ml-44 box-border h-screen bg-gray-200 pl-4">
        
        <div className="mr-12 flex h-full space-x-4">

          <div className="my-4 w-full overflow-y-scroll bg-white px-2">

            <h1 className="text-center text-xl font-semibold leading-norma pt-4 pb-2">Balance Sheet</h1>
            <p className="text-center font-semibold text-sm">YE: Mar 2022</p>

              {
                Object.keys(organizedLedgers.BS).map(subGroup => {
          
                  return(
                    <div key={subGroup}>
                      <h1  className="font-bold pt-2 text-xl">{subGroup}</h1>
                      
                      {Object.values(organizedLedgers.BS[subGroup]).length > 0 ? Object.values(organizedLedgers.BS[subGroup]).map(ledger => {

                        return(
                          <div key={ledger.nominalAccount.id} className="flex">
                            <div className="w-1/2 border ">{ledger.nominalAccount.accountName}</div>
                            <div className="w-1/4 text-center border">{Math.abs(parseFloat(ledger.balance))}</div>
                            <div className="w-1/4 text-center border"></div>
                          </div>
                        )
                      }) : <div></div>
                      }
                      <div className="flex">
                          <h1 className="font-semibold w-1/2 border"></h1>
                          <h1 className="font-semibold w-1/4 border"></h1>
                          <div className="w-1/4 text-center border font-semibold">{Math.abs(parseFloat(subGroupBalance(Object.values(organizedLedgers.BS[subGroup]))))}</div>
                      </div>
                    

                    </div>
                  )
                })
              }
            
          </div>

          <div className="my-4 w-full overflow-y-scroll bg-white px-2" id="PL">

            <h1 className="text-center text-xl font-semibold leading-norma pt-4 pb-2">Profit & Loss</h1>
            <p className="text-center font-semibold text-sm">YE: Mar 2022</p>

              {
                Object.keys(organizedLedgers.PL).map(subGroup => {
          
                  return(
                    <div key={subGroup}>
                      <h1  className="font-bold pt-2 pb-2 text-xl">{subGroup}</h1>
                      
                      {Object.values(organizedLedgers.PL[subGroup]).length > 0 ? Object.values(organizedLedgers.PL[subGroup]).map(ledger => {

                        return(
                          <div key={ledger.nominalAccount.id} className="flex">
                            <div className="w-1/2 border ">{ledger.nominalAccount.accountName}</div>
                            <div className="w-1/4 text-center border">{Math.abs(parseFloat(ledger.balance))}</div>
                            <div className="w-1/4 text-center border"></div>
                          </div>
                        )
                      }) : <div></div>
                      }
                      <div className="flex">
                          <h1 className="font-semibold w-1/2 border"></h1>
                          <h1 className="font-semibold w-1/4 border"></h1>
                          <div className="w-1/4 text-center border font-semibold">{Math.abs(parseFloat(subGroupBalance(Object.values(organizedLedgers.PL[subGroup]))))}</div>
                      </div>
                    

                    </div>
                  )
                })
              }
      
            <div className="flex border-b-2 my-auto pt-8">
              <h1 className="font-bold text-xl w-3/4">{getTotalProfit(organizedLedgers.PL) <= 0 ? "Profit" : "Loss"}</h1>
              <div className="w-1/4 text-center font-bold">{Math.abs(getTotalProfit(organizedLedgers.PL)).toFixed(2)}</div>
            </div>
            
          </div>          
        </div>
      </div>
    </div>
  );
}


function organizeLedgersByAccount(ledgersFromState : any){
  //organize ledgers under account names
  let organizedLedgers :any = {
    BS:{},
    PL:{}
  }    
  for (const key in ledgersFromState) {

    //b/bd
    let balance = ledgerBalance(ledgersFromState[key])

    //organize
    if (ledgersFromState[key].nominalAccount.financialStatement == "Balance sheet"){
      if(Object.keys(organizedLedgers.BS).includes(ledgersFromState[key].nominalAccount.groupName)){
        console.log(organizedLedgers.BS[ledgersFromState[key].nominalAccount.groupName]);
        
        organizedLedgers.BS[ledgersFromState[key].nominalAccount.groupName].push({...ledgersFromState[key], balance:balance})
      }else{
        organizedLedgers.BS[ledgersFromState[key].nominalAccount.groupName] = [{...ledgersFromState[key], balance:balance}]
      }
    }else{
      if(Object.keys(organizedLedgers.PL).includes(ledgersFromState[key].nominalAccount.groupName)){    
        organizedLedgers.PL[ledgersFromState[key].nominalAccount.groupName].push({...ledgersFromState[key], balance:balance})
      }else{    
        organizedLedgers.PL[ledgersFromState[key].nominalAccount.groupName] = [{...ledgersFromState[key], balance:balance}]
      }
    } 
  }

  console.log("organizedLedgers", organizedLedgers);
  return organizedLedgers 
}


function ledgerBalance(ledger: any){

    //calculate Balances:
    let debitBalance = 0;
    let creditBalance = 0;

    if (ledger.Debit.length > 0) {
      ledger.Debit.forEach((transaction: any) => {
        debitBalance += parseFloat(transaction.amount);
      });
    }

    if (ledger.Credit.length > 0) {
      ledger.Credit.forEach((transaction: any) => {
        creditBalance += parseFloat(transaction.amount);
      });
    }
    let balance = (debitBalance - creditBalance).toFixed(2);
    
    return balance
}

function subGroupBalance(subGroup: any){
  let total = 0
  subGroup.forEach(element => {
    total += parseFloat(element.balance)
  });
  return total
}

function getTotalProfit(subGroup: any) {
  let total = 0
  Object.values(subGroup).map((ledgers)=>{
    total += subGroupBalance(ledgers)
  })
  return total;
}