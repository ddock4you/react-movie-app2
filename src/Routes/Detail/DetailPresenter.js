// import React from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import Helmet from 'react-helmet';

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const IMDB = styled.a`
    display: inline-block;
    padding: 5px 8px;
    background: rgb(245, 197, 24);
    border-radius: 2px;
    font-size: 12px;
    font-weight: 700;
    color: #000;
`;

const ListContainer = styled.div``;

const DetailPresenter = ({ result, loading, error }) =>
    loading ? (
        <>
            <Helmet>
                <title>Loading | Movie App</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>
                    {result.original_title
                        ? result.original_title
                        : result.original_name}{' '}
                    | Movie App
                </title>
            </Helmet>
            <Backdrop
                bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            />
            <Content>
                <Cover
                    bgImage={
                        result.poster_path
                            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                            : require('../../assets/noPosterSmall.png')
                    }
                />
                <Data>
                    <Title>
                        {result.original_title
                            ? result.original_title
                            : result.original_name}
                    </Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date
                                ? result.release_date.substring(0, 4)
                                : result.first_air_date.substring(0, 4)}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.runtime
                                ? result.runtime
                                : result.episode_run_time[0]}{' '}
                            min
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.genres.map((genres, index) =>
                                index === result.genres.length - 1
                                    ? genres.name
                                    : `${genres.name} / `
                            )}
                        </Item>
                        <Divider>•</Divider>
                        <Item className='imdb'>
                            <IMDB
                                href={`https://www.imdb.com/title/${result.imdb_id}`}
                                target='_blank'
                            >
                                imDb
                            </IMDB>
                        </Item>
                    </ItemContainer>
                    <Overview>{result.overview}</Overview>
                    <ListContainer>
                        {result.production_companies.map(production => (
                            <div>
                                <p>
                                    {production.logo_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${production.logo_path}`}
                                        />
                                    ) : null}
                                </p>
                                <p>{production.name}</p>
                            </div>
                        ))}
                        {result.videos.results.map(youtube => (
                            <div>
                                <iframe
                                    width='480'
                                    height='360'
                                    src={`https://www.youtube.com/embed/${youtube.key}`}
                                    frameborder='0'
                                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                    allowfullscreen
                                ></iframe>
                            </div>
                        ))}
                    </ListContainer>
                </Data>
            </Content>
        </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default DetailPresenter;
