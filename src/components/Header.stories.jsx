import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Твоя тема (якщо вона у тебе десь визначена окремо, краще імпортувати її звідти)
const theme = {
  colors: { primary: '#6200ea', secondary: '#03dac6' },
  shadows: { medium: '0 4px 6px rgba(0,0,0,0.1)' }
};

export default {
  title: 'Components/Header',
  component: Header,
  // Додаємо декоратори, щоб Header "знав" про стилі та роутер
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
};

export const Default = {};