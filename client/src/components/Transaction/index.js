import React, { useContext, useEffect, useState } from 'react';
import { ToastMessage } from 'rimble-ui';

export default function Transaction() {


  return (
    <div>
      <ToastMessage
        message={"Transaction started"}
        secondaryMessage={"Check on its progress using Etherscan"}
        my={3}
        actionText={"Check"}
        actionHref={"#!"}
      />
    </div>
  )
}
