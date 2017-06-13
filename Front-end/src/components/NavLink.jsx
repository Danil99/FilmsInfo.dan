import React from 'react';
import { NavLink } from 'react-router-dom';

function NavLinks(props) {
  return <NavLink activeClassName="active" {...props} />
}

export default NavLinks;
