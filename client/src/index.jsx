import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentWillMount () {
    // var context = this;
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:1128/repos',
      contentType: 'application/JSON',
      success: (data) => {
        console.log(data);
        this.setState({
          repos: data
        });
      },
      error: () => {
        console.log('Error sending GET to Express server!')
      }
    });

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:1128/repos/import',
      contentType: 'application/JSON',
      data: JSON.stringify({'username': term}),
      success: (data) => {
        console.log('Post successful!')
      },
      error: (error) => {
        console.log('Error sending POST to Express server!')
      }
    });  

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:1128/repos',
      contentType: 'application/JSON',
      success: (data) => {
        console.log(data);
        this.setState({
          repos: data
        });
      },
      error: () => {
        console.log('Error sending GET to Express server!')
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
   }
  }

ReactDOM.render(<App />, document.getElementById('app'));