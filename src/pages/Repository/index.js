import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';

export default class Repository extends Component {
  constructor() {
    super();

    this.state = {
      repository: {},
      issues: [],
      loading: 1,
    };
  }

  async componentDidMount() {
    const params = useParams();
    const repoName = decodeURIComponent(params.repository);

    // promisses are used when I have two await functions
    // that don't depend on each other to run and I wanna
    // that the both of them run at thee same time
    const [repository, issues] = await Promise.all([
      api.get(`repo/${repoName}`),
      api.get(`repo/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        }
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: 0,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    // will return till 'loading' is true.
    // when it be false, it'll return the 'h1' tag
    if (loading) {
      return <Loading>Loading...</Loading>
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to the Repos List</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          { issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  {/** we add 'a' tag when we are redirecting the user
                   * to another web page.
                   *
                   * and we use 'Link' container when we are redirecting
                   * the user to another route of the same page!
                   */}
                  <a href={issue.html_url}>{issue.title}</a>

                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          )) }
        </IssueList>
      </Container>
    );
  }
}
