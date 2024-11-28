import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  min-height: 100vh;
  background: #0a0a0a;
  padding: 4rem 2rem;
  color: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const Role = styled.p`
  color: #4facfe;
  margin-bottom: 1rem;
`;

const Bio = styled.p`
  color: #b3b3b3;
  line-height: 1.6;
`;

const Team = () => {
  const team = [
    {
      name: "Bahaa Najjar",
      role: "Main Coder",
      bio: "NAH I'd WIN"
    },
    {
      name: "Abdulaziz Al-amri",
      role: "UI Designer",
      bio: "Award-winning artist passionate about creating immersive visual experiences."
    },
    {
      name: "Amer",
      role: "Main Level Designer",
      bio: "Expert in game engine development and performance optimization."
    },
    {
      name: "Saud",
      role: "Writer & Level Designer Assistant",
      bio: "Storyteller extraordinaire with a background in sci-fi literature and game writing."
    },
    {
      name: "Mousa",
      role: "Pixel Artist",
      bio: "Passionate about creating engaging and challenging game levels."
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
          Meet the Team
        </Title>
        <TeamGrid>
          {team.map((member, index) => (
            <TeamMember
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Avatar>{member.name[0]}</Avatar>
              <Name>{member.name}</Name>
              <Role>{member.role}</Role>
              <Bio>{member.bio}</Bio>
            </TeamMember>
          ))}
        </TeamGrid>
      </Container>
    </Section>
  );
};

export default Team;
