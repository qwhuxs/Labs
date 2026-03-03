import React from "react";
import GameFinishModal from "./GameFinishModal";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { MemoryRouter } from "react-router-dom";
import { GameSettingsContext } from "../context/GameSettingsContext";

const mockSettings = { rounds: 5 };

// Компонент-заглушка для Storybook
const MockPortal = ({ children }) => <>{children}</>;

const withProviders = (Story) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <GameSettingsContext.Provider value={{ settings: mockSettings }}>
        <Story />
      </GameSettingsContext.Provider>
    </ThemeProvider>
  </MemoryRouter>
);

export default {
  title: "Components/GameFinishModal",
  component: GameFinishModal,
  decorators: [withProviders],
};

// Передаємо MockPortal у проп Portal для всіх історій
const Template = (args) => <GameFinishModal {...args} Portal={MockPortal} />;

export const LowScore = Template.bind({});
LowScore.args = { score: 1 };

export const MediumScore = Template.bind({});
MediumScore.args = { score: 3 };

export const HighScore = Template.bind({});
HighScore.args = { score: 5 };