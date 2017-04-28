import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo) =>
	  <ul>
	    <li key={repo.repoId}><a href = {`https://github.com/${repo.repoURL}`}>{repo.repoName}</a></li>
	  </ul>
    	)}
  </div>
)

export default RepoList;