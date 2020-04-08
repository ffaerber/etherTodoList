import React, { useContext, useEffect, useState } from 'react';
import { Card, Box, Text, Icon } from 'rimble-ui';

import { Link } from 'react-router-dom';

export default function Item({ list }) {

  return (
    <Link to={`list/${list.id}`}>
      <Box key={list.id} color="black" pl={3} pb={3}>
        <Text fontWeight={"bold"} display={"flex"}>
          <Icon name={"FormatListBulleted"} mr={2} />
          {list.title}
        </Text>
      </Box>
    </Link>
  );
}
