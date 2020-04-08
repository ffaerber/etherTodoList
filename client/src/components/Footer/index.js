import React, { useContext, useEffect, useState } from 'react';
import { Box } from 'rimble-ui';

export default function Footer({children}) {

  return (
    <Box bottom='0' zIndex={2} position='fixed' bg="white" width={'500px'}>
      {children}
    </Box>

  );
}
