import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  min-height: 100vh;
  background: #121212;
  padding: 4rem 2rem;
  color: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Feature = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4facfe;
`;

const Description = styled.p`
  color: #b3b3b3;
  line-height: 1.6;
`;

const GameInfo = () => {
  const features = [
    {
      title: "Competitive Gameplay",
      description: "Engage in thrilling battles against other players, pushing the boundaries of your skills and strategy."
    },
    {
      title: "Stunning Visuals",
      description: "Immerse yourself in breathtaking environments rendered in stunning detail with next-generation graphics technology."
    },
    {
      title: "Epic Story",
      description: "Embark on an unforgettable journey through space and time, uncovering mysteries and facing impossible odds."
    },
    {
      title: "Dynamic Combat",
      description: "Engage in fluid, strategic combat that combines traditional fighting with innovative time-warping abilities."
    }
  ];

  return (
    <Section>
      <Container>
        <Title
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About the Game
        </Title>
        <Grid>
          {features.map((feature, index) => (
            <Feature
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureTitle>{feature.title}</FeatureTitle>
              <Description>{feature.description}</Description>
            </Feature>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default GameInfo;
