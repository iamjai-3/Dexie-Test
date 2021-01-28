import React from 'react';
import './App.css';
import axios from 'axios';
import Dexie from 'dexie';
import { useEffect, useState } from 'react';
// import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import Paging from './Paging';

function App() {
	// const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [tableData, setTableData] = useState([]);
	const pageSize = 3;
	const [itemsCount, setItemsCount] = useState(0);
	const [checked, setChecked] = useState(true);
	const [name, setName] = useState('');
	let db = new Dexie('dexie-test');
	db.version(1).stores({
		datas: 'id,email,first_name,last_name,avatar'
	});

	// Fetching Data from API and Adding it to IndexedDB
	const loadDexie = async () => {
		axios.get('https://reqres.in/api/users?page=2').then((res) => {
			var d = res.data.data;
			// setData(d);
			// setTableData(d.slice((currentPage - 1) * pageSize, (currentPage - 1 + 1) * pageSize));
			db.datas.bulkPut(d);
		});
	};

	// Fetching Data from IndexedDB and Saving to useState
	const loadDatafromDexietoState = async () => {
		const value = await db.datas.toArray();
		// console.log(value.slice((currentPage - 1) * pageSize, (currentPage - 1 + 1) * pageSize));
		setItemsCount(value.length);
		setTableData(value.slice((currentPage - 1) * pageSize, (currentPage - 1 + 1) * pageSize));
	};

	// Handles on Page Change
	const handlePageChange = (page, e) => {
		e.preventDefault();
		setCurrentPage(page);
		getDataFromDexie(page);
	};

	// Get Data from dexie according to Page Number and updates useState
	const getDataFromDexie = async (page) => {
		console.log('Pagination Get');
		// const value = await db.datas.offset(page).limit(2).toArray();
		const pg = await db.datas.toArray();
		setTableData(pg.slice((page - 1) * pageSize, (page - 1 + 1) * pageSize));
	};

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	const onNameChange = (e) => {
		setName(e.target.value);
	};

	useEffect(() => {
		loadDexie();
		loadDatafromDexietoState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="App">
			<h2>Dexie Test</h2>
			<input type="text" id="name" value={name} onChange={onNameChange} />
			<input type="checkbox" id="ccb" checked={checked} onChange={handleChange} />

			<br />
			<br />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Active</th>
						<th>Id</th>
						<th>Email</th>
						<th>FirstName</th>
						<th>SecondName</th>
					</tr>
				</thead>
				<tbody>
					{tableData.map((d, i) => (
						<tr key={i}>
							<td>
								<input type="checkbox" id="cb" checked={checked} onChange={handleChange} />
							</td>
							<td>{d.id}</td>
							<td>{d.email}</td>
							<td>{d.first_name}</td>
							<td>{d.last_name}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Paging
				itemsCount={itemsCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

export default App;
