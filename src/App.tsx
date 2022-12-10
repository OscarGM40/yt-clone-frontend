import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";

import { AppRouter } from "./routes/Routes";
import { darkTheme, lightTheme } from "./utils/Theme";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

export const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu setDarkMode={setDarkMode} darkMode={darkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <AppRouter />
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};
