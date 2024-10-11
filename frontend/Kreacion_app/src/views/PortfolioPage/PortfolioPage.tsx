import React from 'react';

import Main from 'layouts/Main';
import Container from 'components/Container';
import { Folio } from './components';

const PortfolioPage = (): JSX.Element => (
  <Main colorInvert={true}>
    <Container>
      <Folio />
    </Container>
  </Main>
);

export default PortfolioPage;
