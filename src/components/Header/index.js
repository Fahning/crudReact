import React from 'react';
import './styles.css';

const Header = ({ title }) => (
  <header>
    <h1 className="font-weight-bold text-center mt-4 mb-0 pb-0">{ title?title:'Escolha um titulo' }</h1>
  </header>
);

export default Header;