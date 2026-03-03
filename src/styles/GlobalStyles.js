import styled, { createGlobalStyle, keyframes } from 'styled-components';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    overflow-x: hidden;
    color: ${props => props.theme.colors.text};
  }

  #root {
    min-height: 100vh;
  }
`;

export const PinkBlueBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primaryLight} 0%,
    ${props => props.theme.colors.secondaryLight} 25%,
    ${props => props.theme.colors.primary} 50%,
    ${props => props.theme.colors.secondary} 75%,
    ${props => props.theme.colors.primaryDark} 100%
  );
  background-size: 400% 400%;
  animation: ${gradientShift} 8s ease-in-out infinite;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 15%;
    right: 10%;
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    animation: ${float} 7s ease-in-out infinite 1s;
  }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;