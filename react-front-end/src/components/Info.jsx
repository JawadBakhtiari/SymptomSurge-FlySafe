import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    name: 'Frequent Flier Plan',
    desc: 'Monthly subscription',
    price: '$25.00',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Frequent Flier Plan',
    price: 'Free',
  },
  {
    name: '5 country alerts',
    desc: 'Included in the Frequent Flier Plan',
    price: 'Free',
  },
  {
    name: 'Help Center Access Key',
    desc: 'Included in the Frequent Flier Plan',
    price: 'Free',
  },
];

function Info({ totalPrice }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        $25.00
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" fontWeight="medium">
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
