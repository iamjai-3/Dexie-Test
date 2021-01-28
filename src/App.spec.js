/* eslint-disable jest/valid-expect */
import App from './App';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

configure({ adapter: new Adapter() });

describe('app', () => {
	let wrapper;

	// const expectedData = [
	// 	{
	// 		id: 7,
	// 		email: 'michael.lawson@reqres.in',
	// 		first_name: 'Michael',
	// 		last_name: 'Lawson',
	// 		avatar: 'https://reqres.in/img/faces/7-image.jpg'
	// 	},
	// 	{
	// 		id: 8,
	// 		email: 'lindsay.ferguson@reqres.in',
	// 		first_name: 'Lindsay',
	// 		last_name: 'Ferguson',
	// 		avatar: 'https://reqres.in/img/faces/8-image.jpg'
	// 	}
	// ];
	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	afterEach(() => wrapper.unmount());

	// test('table render', () => {
	// 	expect(wrapper.find('Table')).toHaveLength(1);
	// });

	test('Name', () => {
		expect(wrapper.find('div > input[id="name"]')).toHaveLength(1);
		wrapper.find('input[id="name"]').simulate('change', {
			target: { value: 'testName' }
		});
		expect(wrapper.find('input[id="name"]').props().value).toEqual('testName');
	});

	// test('checkbox', () => {
	// 	wrapper.find('input[type="checkbox"]').forEach((node) => {
	// 		expect(node.props().checked).toBeFalsy();
	// 	});
	// });

	// test('should', () => {
	// 	const wP = shallow(<App />);
	// 	// expect(wP.find('tbody').children()).toHaveLength(5);
	// 	const table = wP.find('tbody');
	// 	const row = table.find('tr');
	// 	expect(table.children.length).toBe(1);
	// 	// expect(row.children.length).toHaveLength(5);

	// 	row.map((t) => {
	// 		console.log(t.debug());
	// 	});
	// 	// rows.map((row) => console.log('hehe', row.find('tr').at(0)));
	// 	// rows.map((row) => expect(row.find('tr').at(0).find('input[type=checkbox"]').props().checked).toBe(false));
	// });

	// test('table', () => {
	// 	const wrapper = mount(<App />);
	// 	expect(wrapper.find('tbody').find('tr')).toHaveLength(2);
	// });

	test('should have the `th` "Items"', () => {
		expect(wrapper.contains(<th>Active</th>)).toBe(true);
		expect(wrapper.contains(<th>Id</th>)).toBe(true);
		expect(wrapper.contains(<th>Email</th>)).toBe(true);
		expect(wrapper.contains(<th>FirstName</th>)).toBe(true);
		expect(wrapper.contains(<th>SecondName</th>)).toBe(true);
	});

	test('useState', () => {
		const setTableData = jest.fn();
		const onLoad = jest.spyOn(React, 'useState');
		onLoad.mockImplementation((tableData) => [tableData, setTableData]);
		expect(setTableData).toBeTruthy();
	});

	test('checkBox', () => {
		const d = shallow(<App />);

		// expect(d.find("tbody > input[type='checkbox']").map((dat) => dat.props().checked)).toEqual(true);

		const table = d.find('Table');
		const tbody = table.find('tbody');
		expect(tbody).toHaveLength(1);
		const rows = tbody.find('tr');
		expect(rows).toHaveLength(3);

		// expect(d.find("input[type='checkbox']").map((el) => el.props().checked)).toBe([true, false, false]);

		// expect(d.find("div > input[id='ccb']").props().checked).toEqual(true);
	});
});
