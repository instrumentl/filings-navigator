import React from 'react';
import ReactDOM from 'react-dom';
import OrganizationSearch from './components/OrganizationSearch.jsx'
import DataExplorer from './components/DataExplorer.jsx'

function App() {
  return (
  	<>
  		<div className="flex flex-row">
  			<div className="basis-1/4">
  			</div>
  			<div className="basis-1/2">
		  		<h1 className="text-4xl font-light mt-10">Filings Navigator</h1>
		  	</div>
		  	<div className="basis-1/4">
  			</div>
  		</div>
  		<OrganizationSearch />
  	</>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);