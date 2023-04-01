import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export default function Example(props: any) {

    let ledgers = props
    console.log("accordian ledger");
    console.log(ledgers);
    
    //find each ledgers b/bd

    //display ledger name and b/bd

  const [open, setOpen] = useState(1);
 
  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };



  // {Object.values(ledgers).length > 0 ? (
  //   Object.values(ledgers).map((ledger) => {
  //     //calculate Balances:
  //     let debitBalance = 0;
  //     let creditBalance = 0;

  //     if (ledger.Debit.length > 0) {
  //       ledger.Debit.forEach((transaction: any) => {
  //         debitBalance += parseInt(transaction.amount);
  //       });
  //     }

  //     if (ledger.Credit.length > 0) {
  //       ledger.Credit.forEach((transaction: any) => {
  //         creditBalance += parseInt(transaction.amount);
  //       });
  //     }
  //     let balance = debitBalance - creditBalance;

  //     return (
  //       <Link
  //         href={"#" + ledger.nominalAccount.code.toString()}
  //         onClick={() => {
  //           setSelectedAccounts((selectedAccounts) => [
  //             ...selectedAccounts,
  //             ledger.nominalAccount.code,
  //           ]);
  //         }}
  //         key={ledger.id}
  //       >
  //         <div
  //           className="flex p-2 border"
  //           key={ledger.nominalAccount.code}
  //         >
  //           {/* FIXME: add sub headers for "each: group name" */}
  //           {/* <div className=""></div> */}
  //           <div className="flex">
  //             {ledger.nominalAccount.accountName}
  //           </div>
  //           <div className="ml-auto pr-2">
  //             {balance > 0
  //               ? String(balance) + " D"
  //               : String((balance *= -1)) + " C"}
  //           </div>
  //         </div>
  //       </Link>
  //     );
  //   })
  // ) : (
  //   <div></div>
  // )}





 
  return (
    <Fragment>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          What is Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
      {/* <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          What can I do with Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion> */}
    </Fragment>
  );
}