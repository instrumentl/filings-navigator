import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function DataExplorer(props) {
	const [dataRows, setDataRows] = useState([{}]);

	useEffect(() => {
		if(props["data"][0] === undefined) {
		}
		setDataRows(props["data"]);
	}, [props["data"]]);

	// Comments: Due to time constraints the awards link simply opens the api call rather than another front-end piece

	return(
		<div>
			<table className="table-auto border-spacing-1 w-full text-left border-collapse">
				<thead>
					<tr>
						<th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
							<div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">ID</div>
						</th>
						<th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
							<div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">Amended Return?</div>
						</th>
						<th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
							<div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">Returned On</div>
						</th>
						<th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
							<div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">Total Awards Value</div>
						</th>
						<th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
							<div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">Awards Link</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{ dataRows.map((item, i) => {
						return(
							<tr key={i}>
								<td className="py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300 border-t border-slate-100 dark:border-slate-400/10">
									{item["id"]}
								</td>
								<td className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400 border-t border-slate-100 dark:border-slate-400/10">
									{item["amended_return"]}
								</td>
								<td className="py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300 border-t border-slate-100 dark:border-slate-400/10">
									{item["return_timestamp"]}
								</td>
								<td className="py-2 pl-2 font-mono text-xs leading-6 text-indigo-600 whitespace-pre dark:text-indigo-300 border-t border-slate-100 dark:border-slate-400/10">
									$ {item["total_value"]}
								</td>
								<td>
									<a className="hover:underline" href={`/api/filings/${item["id"]}/awards`} target="_blank">Awards</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}