import React from 'react';
import { StepperForm } from '../components';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Page = styled.div`
    display: grid;
    grid-template-columns: repeat(1fr, 12);
    grid-template-areas: 
        'h h h h h h h h h h h h'
        '. . b b b b b b b b . .';

    @media only screen and (max-width: 800px) {
        grid-template-areas: 
            'h h h h h h h h h h h h'
            'b b b b b b b b b b b b';
    }
`;

const Header = styled.div`
    grid-area: h;
`;

const Body = styled.div`
    grid-area: b;
`;

export default () => (
    <Page>
        <Header>
            <Typography component="h2" variant="h1" gutterBottom>Boilerplate Engine</Typography>
        </Header>
        <Body>
            <StepperForm />
        </Body>
    </Page>
);
