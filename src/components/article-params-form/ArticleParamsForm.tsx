import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent } from 'react';
import { Select } from 'src/ui/select';
import {
	// defaultArticleState,
	fontFamilyOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [open, setOpen] = useState(false);
	// const [options, setOptions] = useState('');

	const handleChange = (e) => {
		console.log(e);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<ArrowButton
				isOpen={open}
				onClick={() => {
					setOpen(!open);
				}}
			/>
			<aside className={open ? styles.container_open : styles.container}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={null}
						options={fontFamilyOptions}
						// placeholder={
						// 	select ? select : defaultArticleState.fontFamilyOption.value
						// }
						onChange={handleChange}
						title={'Шрифт'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
