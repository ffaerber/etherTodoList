import React, { useContext, useEffect, useState } from 'react';
import { Box } from 'rimble-ui';

export default function Header({children}) {

  return (
    <Box bottom='0' zIndex={2} position='fixed' bg="white" >
      {children}
    </Box>

  );
}
