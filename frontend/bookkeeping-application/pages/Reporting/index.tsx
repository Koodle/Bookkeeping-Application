import SideBar from "../../components/Layout/SideBar";
// import LedgersTable from "../../components/Ledgers/LedgersTable";
// import TAccounts from "../../components/Ledgers/TAccounts";
import Accordion from "../../components/Reporting/Accordion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

//API
import axios from "axios";
import { useEffect, useState } from "react";
import AuthService from "../../services/authService";

//redux
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTransactions } from "../../store/slices/transactionsSlice";

import Link from "next/link";
import { log } from "console";

//PDF
import { jsPDF } from "jspdf";

export default function Ledgers() {
  const ledgersFromState = useAppSelector(
    (state) => state.transactions.ledgers
  );

  // const [ledgers, setLedgers] = useState<any[]>(ledgersFromState);
  // const [selectedAccounts, setSelectedAccounts] = useState<any[]>([]);

  useEffect(() => {
    // console.log("ledgers from state");
    // console.log(ledgersFromState);
    // const generatePDF = () => {
    //   const component = document.querySelector("#PL")!;
    //   console.log(component);
    //   const report = new jsPDF('portrait',"pt",'a4');
    //   report.html(component).then(() => {
    //       report.save('PL.pdf');
    //   });
    // }
  
    // generatePDF()
    
  
  }, [ledgersFromState]);

  let organizedLedgers = organizeLedgersByAccount(ledgersFromState)
    



  return (
    <div>
      <div className="flex">
        <SideBar />
      </div>

      {/* <div className="fixed ml-44 bg-orange-300">filters: date/YE, Download to excell or pdf</div> */}

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

                          // console.log(ledger);
                          
                        
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

      
            {/* <div className="flex border-b-2 my-auto pt-4">
              <h1 className="font-bold text-xl w-3/4">Equity</h1>
              <div className="w-1/4 text-center"></div>
            </div> */}
            
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

                          // console.log(ledger);
                          
                        
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

            {/* <Accordion title={"Income"} ledgers={organizedLedgers}></Accordion>
            <Accordion title={"Cost of Sales"} ledgers={ledgersFromState}></Accordion>
            <Accordion title={"Gross Profit"} ledgers={ledgersFromState}></Accordion>
            <Accordion title={"Expenses"} ledgers={ledgersFromState}></Accordion> */}
      
            <div className="flex border-b-2 my-auto pt-8">
              <h1 className="font-bold text-xl w-3/4">{getTotalProfit(organizedLedgers.PL) <= 0 ? "Profit" : "Loss"}</h1>
              <div className="w-1/4 text-center font-bold">{Math.abs(getTotalProfit(organizedLedgers.PL))}</div>
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
    // console.log(`${key}: ${ledgersFromState[key]}`);

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

  // for (const subGroup in organizedLedgers.PL){
  //   console.log(subGroup);
    
  //   //total balance for Subgroup
  //   let totalBalance = subGroupBalance(Object.values(organizedLedgers.PL[subGroup]))
  //   console.log("totalBalance");
    
  //   console.log(totalBalance);
  //   console.log(organizedLedgers.PL[subGroup]
  // }

  // for (const subGroup in organizedLedgers.BS){
  //   //total balance for Subgroup
  //   let totalBalance = parseFloat(subGroupBalance(Object.values(organizedLedgers.BS[subGroup])))
  //   organizedLedgers.BS[subGroup]["subGroupBalance"] = totalBalance
  // }

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