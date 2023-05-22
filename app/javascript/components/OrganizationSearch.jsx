import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DataExplorer from './DataExplorer.jsx'

export default function OrganizationSearch() {
	const [filers, setFilers] = useState([{}]);
	const [selectedFiler, setSelectedFiler] = useState();
	const [filerData, setFilerData] = useState([]);

	useEffect(() => {
		getFilers();
	}, []);

	// In production app, we would probably put all api calls in their own wrapper class
	async function getFilers(){
		const response = await fetch(`/api/filers/`);
		const data = await response.json();
		setFilers(data["filers"]);
	}

	async function clickExplore(){
		const response = await fetch(`/api/filers/${selectedFiler}/filings`);
		const data = await response.json();
		setFilerData(data["filings"]);
	}

	return(
		<>
			<div className="flex flex-row my-10">
				<div className="basis-1/4">
				</div>

				<div className="basis-1/2 mt-5">
					<select 
						className="bg-neutral-100 focus:bg-neutral-200 border-slate-300 p-1 rounded" 
						defaultValue="choose" 
						onChange={(e) => setSelectedFiler(e.target.value)}>
							<option value="choose" disabled>-- Choose a Filer --</option>
							{ filers.map((filer, i) => {
								return <option key={i} value={filer["id"]}>{filer["name"]}</option>
							})}
					</select>
					<button
						className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 ml-5 rounded-full font-semibold text-white"
						onClick={clickExplore}>Explore
					</button>
				</div>

				<div className="basis-1/4">
				</div>
			</div>
			<div className="flex flex-row">
				<div className="basis-1/4">
				</div>
				<div className="basis-1/2">
					<DataExplorer data={filerData}/>
				</div>
				<div className="basis-1/4">
				</div>
			</div>
		</>
	);
}