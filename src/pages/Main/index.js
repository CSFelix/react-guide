import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      newRepo: '',
      repositories: [],
      loading: 0,
    };

    this.handleInputChange = event => {
      this.setState({ newRepo: event.target.value });
    };

    this.handleSubmit = async event => {
      event.preventDefault();

      this.setState({ loading: 1 });

      // getting repo info from git hub
      const { newRepo, repositories } = this.state;
      const response = await api.get(`/repos/${ newRepo }`);

      // from all info, we will extract just a few ones
      const data = {
        name: response.data.full_name,
      };

      // updating repositories state
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: 0,
      });

    };
  }

  // gets data from LocalStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // stores data into LocalStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repos
        </h1>

        <Form onSubmit={ this.handleSubmit }>

          <input
            type="text"
            placeholder="Add Repo"
            value={ newRepo }
            onChange={ this.handleInputChange }
          />

          <SubmitButton loading={ loading }>
            { loading ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                <FaPlus color="#fff" size={14} />
              )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Details</Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
