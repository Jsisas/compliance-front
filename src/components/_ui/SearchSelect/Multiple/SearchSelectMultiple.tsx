import { Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

const { Option } = Select;

export type SearchProps<T> = {
	onChange(selectedData: T[]): void;
	allowClear?: boolean;
	placeholder?: string;
	selectedData?: T[];
	data: T[];
	valueKey: keyof T;
	displayKey: keyof T;
};

export function SearchSelectMultiple<T>(props: SearchProps<T>): JSX.Element {
	const [selectedData, setSelectedData] = useState<T[]>(props.selectedData || []);
	const [filteredData, setFilteredData] = useState<T[]>(props.data);

	const triggerOnChange = useCallback(() => {
		if (props.onChange && selectedData) {
			props.onChange(selectedData);
		}
	}, [selectedData, props]);

	useEffect(() => {
		setFilteredData(props.data);
	}, [props]);

	useEffect(() => {
		triggerOnChange();
	}, [selectedData, triggerOnChange]);

	function getDisplayText(obj: T): string {
		return (obj[props.displayKey] as unknown) as string;
	}

	function getObjValue(obj: T): string {
		return (obj[props.valueKey] as unknown) as string;
	}

	function onChange(value: string) {
		if (value.length > 0) {
			const data = props.data.filter((tmpData: T) => value.includes(getObjValue(tmpData)));
			setSelectedData(data);
		} else {
			setSelectedData([]);
		}
		triggerOnChange();
	}

	function onSearch(input: string) {
		if (!input || input.length < 1) {
			setFilteredData(props.data);
		} else {
			setFilteredData(props.data.filter((obj) => getDisplayText(obj).toLowerCase().includes(input.toLowerCase())));
		}
	}

	const results = filteredData.map((data: T) => (
			<Option key={getObjValue(data)} value={getObjValue(data)}>
				{getDisplayText(data)}
			</Option>
		));

	return (
		<Select
			mode={'multiple'}
			allowClear={props.allowClear}
			placeholder={props.placeholder || 'Search users'}
			filterOption={false}
			style={{ width: '100%' }}
			onSearch={onSearch}
			onChange={onChange}
			data-testid={'select'}
			defaultValue={selectedData[0] ? getObjValue(selectedData[0]) : undefined}
		>
			{results}
		</Select>
	)
}
