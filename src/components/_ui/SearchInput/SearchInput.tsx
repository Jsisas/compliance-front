import * as React from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Input } from 'antd';
import styles from './SearchInput.module.scss';
import { ReactComponent as SearchIcon } from './../../../assets/icons/search.svg';
import { ReactComponent as CheckmarkIcon } from '../../../assets/icons/checkmark.svg';

export interface SearchInput<T> {
	data: T[];
	displayKey: string;
	idKey: string;
	filterByKeys: string[];
	onSelect: (data: T[]) => void;
}

export function SearchInput<T>(props: SearchInput<T>): JSX.Element {
	const [filteredData, setFilteredData] = useState<T[]>([]);
	const [selectedData, setSelectedData] = useState<T[]>([]);

	function onChange(value: string) {
		if (value.length > 0) {
			const filtered = props.data.filter((obj: T) => filterObj(obj, value));
			setFilteredData(filtered);
		} else {
			setFilteredData([]);
		}
	}

	function filterObj(obj: T, value: string) {
		const matchedKeys = props.filterByKeys.filter((key) => getObjKeyValue(obj, key).includes(value));
		return matchedKeys.length > 0;
	}

	function getObjKeyValue(obj: T, key: string): string {
		const tmpObj = (obj as unknown) as Record<string, unknown>;
		return tmpObj[key] as string;
	}

	function onSelect(data: T) {
		if (data) {
			if (selectedData.includes(data)) {
				setSelectedData(selectedData.filter((obj) => obj !== data));
			} else {
				setSelectedData([...selectedData, data]);
			}
		} else {
			console.error('Search input result should have an ID property defined');
		}
	}

	const triggerOnSelect = useCallback(() => {
		if (props.onSelect) {
			props.onSelect(selectedData);
		}
	}, [selectedData, props]);

	useEffect(() => {
		triggerOnSelect();
	}, [selectedData, triggerOnSelect]);

	return (
		<>
			<Input
				placeholder='Search by control'
				allowClear={true}
				suffix={<SearchIcon />}
				onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
				data-testid='input'
			/>
			<div className={styles.resultBody} data-testid='results'>
				{filteredData.map((data) => {
					const value = getObjKeyValue(data, props.displayKey);
					const id = getObjKeyValue(data, props.idKey);
					return (
						<div
							key={id}
							onClick={() => onSelect(data)}
							style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
						>
							<span>{value}</span>
							{selectedData.includes(data) && <CheckmarkIcon />}
						</div>
					);
				})}
			</div>
		</>
	);
}
