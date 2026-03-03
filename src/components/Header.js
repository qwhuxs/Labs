import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.secondary} 100%
  );
  color: white;
  text-align: center;
  padding: 25px 0;
  font-size: 2.5rem;
  font-weight: bold;
  box-shadow: ${props => props.theme.shadows.medium};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-top: 8px;
  opacity: 0.9;
  font-weight: normal;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderLink to="/">
        🧠 Гра Анаграми
        <Subtitle>Тренуй свій мозок!</Subtitle>
      </HeaderLink>
    </HeaderContainer>
  );
}