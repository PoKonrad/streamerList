import { styled } from '@mui/material';

const FooterContainer = styled('footer')({
  background: 'url(/bg.svg)',
  backgroundPosition: 'bottom',
  height: '40rem',
  backgroundSize: 'cover'
});

const Footer = () => {
  return <FooterContainer />;
};

export default Footer;
