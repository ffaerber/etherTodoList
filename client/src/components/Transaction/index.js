import React, { useContext, useEffect, useState } from 'react';
import { ToastMessage } from 'rimble-ui';
import { MyContext } from '../../store/store';

export default function Transaction() {
  const { state, actions } = useContext(MyContext);
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    setTxs(state.txs)
  }, [state.txs]);


  return (
    <div>
      {txs ? (
        txs.map(tx => ( <TransactionMessage tx={tx}/> ))
      ) : (
        <div>no open tx found</div>
      )}
    </div>
  )
}


const TransactionMessage = ({tx}) => {
  return (
      <ToastMessage
        message={"Transaction started"}
        secondaryMessage={"Check on its progress using Etherscan"}
        my={3}
        actionText={"Check"}
        actionHref={"#!"}
      />
  )
}
