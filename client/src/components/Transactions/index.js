import React, { useContext } from 'react';
import { ToastMessage } from 'rimble-ui';
import { MyContext } from '../../store/store';

export default function Transactions() {
  const { state, dispatch, actions, thunks } = useContext(MyContext);

  return (
    <div>
      {state.txs.map(tx => (
        <TransactionMessage key={tx.tx} tx={tx} />
      ))}
    </div>
  );
}

const TransactionMessage = ({ tx }) => {
  return (
    <ToastMessage
      message={'Transaction started'}
      secondaryMessage={'Check on its progress using Etherscan'}
      my={3}
      actionText={'Check'}
      actionHref={'#!'}
    />
  );
};
