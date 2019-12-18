import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import Section from '../../Components/Section';

const Container = styled.div`
  padding: 0 10px;
`;

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title='TV TopRated'>{topRated.map(tv => <span>{tv.name}</span>)}</Section>
      )}
      {popular && popular.length > 0 && (
        <Section title='TV popular'>{popular.map(tv => <span>{tv.name}</span>)}</Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title='TV airingToday'>{airingToday.map(tv => <span>{tv.name}</span>)}</Section>
      )}
    </Container>
  );

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TVPresenter;
