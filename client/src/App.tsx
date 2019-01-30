import React, { Component } from 'react';
import AppRouter from './router/Router';
// import styled from './theme';
import styled from 'styled-components';

const StyledApp = styled.div`
  text-align: center;
`;

class App extends Component {
  public render() {
    return (
      <StyledApp>
        <AppRouter />
      </StyledApp>
    );
  }
}


export default App;
