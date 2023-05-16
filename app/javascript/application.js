import React from 'react';
import ReactDOM from 'react-dom';
import OrganizationSearch from './components/OrganizationSearch.jsx'
import DataExplorer from './components/DataExplorer.jsx'

function App() {
  return (
  	<>
  		<div className="flex flex-row">
	  		<h1 className="text-3xl font-bold underline">Filings Navigator</h1>
  		</div>
  		<OrganizationSearch />
  		<DataExplorer />
  	</>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);