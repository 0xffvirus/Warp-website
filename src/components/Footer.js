import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  z-index: 1000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #b3b3b3;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  color: #4facfe;
  font-size: 1.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #00f2fe;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Content>
        <Copyright>
          © {currentYear} ByteVectors Studio. All rights reserved.
        </Copyright>
        <SocialLinks>
          <SocialLink
            href="https://twitter.com/ByteVectors"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-twitter"></i>
          </SocialLink>
          <SocialLink
            href="https://instagram.com/ByteVectors"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-instagram"></i>
          </SocialLink>
          <SocialLink
            href="https://discord.gg/ByteVectors"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-discord"></i>
          </SocialLink>
        </SocialLinks>
      </Content>
    </FooterContainer>
  );
};

export default Footer;
