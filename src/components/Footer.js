import React from 'react';
import styled from 'styled-components';

const FooterComp = styled.div`
    width: 100%;
    height: 45px;
    text-align: center;
    color: #6ACC87;
    margin: auto;
    box-shadow: 3px 0px 5px 3px #555; 
    padding-top: 30px;
    font-size: small;
    background-color: #284D33;
`;


const Footer = () => {
  return (
    <FooterComp>
        &copy; Movie Plug 2022., All Rights Reserved         
    </FooterComp>
  )
}

export default Footer;