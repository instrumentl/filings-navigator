import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function DataExplorer() {
	const [dataRows, setDataRows] = useState([]);

	return(
		<div>
			<table className="table-auto">
				<thead>
					<tr>
						<th>Name</th>
						<th>EIN</th>
						<th>Total Giving</th>
					</tr>
				</thead>
				<tbody>
					{ dataRows.map((item) => {
						<tr>{item.name}</tr>
					})}
				</tbody>
			</table>
		</div>
	);
}