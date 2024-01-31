// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Roboto', Arial, sans-serif;
  max-width: 90%;
  height: 90%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;


const Button = styled.button`
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: ${(props) => (props.primary ? '#4CAF50' : '#2196F3')};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

const DeleteButton = styled(Button)`
  background-color: #ff2b2b;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const MovieItem = styled.li`
  margin-bottom: 15px;
`;
const Strong = styled.strong`
  margin-bottom: 15px;
`;

const RatedText = styled.span`
  color: #2196F3;
  font-weight: bold;
  margin-right: 10px;
`;

const NotRatedText = styled.span`
  color: red;
  font-weight: bold;
`;

const RateButton = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
`;

const FormContainer = styled.div`
  margin-top: 30px;
`;

const SubHeading = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  width: 98.5%;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
`;

const CreateButton = styled.button`
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  width: 100%;
  border-radius: 4px;
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', description: '' });
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/movies/with-rating-status');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchUnratedMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/movies/unrated');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching unrated movies:', error);
    }
  };

  const handleCreateMovie = async () => {
    try {
      await axios.post('http://localhost:3000/movies', newMovie);
      fetchMovies();
      setNewMovie({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  const handleRateMovie = async (id) => {
    try {
      await axios.post(`http://localhost:3000/movies/${id}/rate`, { value: rating });
      fetchMovies();
      setRating(0);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <Container>
      <Heading>Filmes</Heading>
      <Button onClick={fetchMovies} primary>
        Todos os filmes
      </Button>
      <Button onClick={fetchUnratedMovies}>Filmes sem avaliação</Button>
      <List>
        {movies.map((movie) => (
          <MovieItem key={movie.id}>
            <Strong>{movie.title}</Strong> - {movie.description}
            <br />
            Nota: {movie.averageRating}
            {movie.rated ? (
              <RatedText> - Avaliado</RatedText>
            ) : (
              <NotRatedText> - Não avaliado</NotRatedText>
            )}
            {!movie.rated && (
              <>
                <RateButton onClick={() => handleRateMovie(movie.id)}>Avaliar</RateButton>
                <br />
              </>
            )}
            <DeleteButton onClick={() => handleDeleteMovie(movie.id)}>Excluir</DeleteButton>
          </MovieItem>
        ))}
      </List>

      <FormContainer>
        <SubHeading>Adicionar novo filme</SubHeading>
        <Input
          type="text"
          placeholder="Título"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={newMovie.description}
          onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
        />
        <CreateButton onClick={handleCreateMovie}>Adicionar</CreateButton>
      </FormContainer>

      <FormContainer>
        <SubHeading>Avalie o filme</SubHeading>
        <Select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={0}>Selecione nota</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Select>
      </FormContainer>
    </Container>
  );
};

export default App;
