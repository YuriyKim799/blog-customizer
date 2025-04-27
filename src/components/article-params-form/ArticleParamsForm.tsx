import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent } from 'react';
import { Select } from 'src/ui/select';
import {
	defaultArticleState,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	currentState: typeof defaultArticleState;
	onStateChange: (newState: Partial<typeof defaultArticleState>) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onStateChange,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		currentState.fontFamilyOption
	);

	const handleChange = (e: OptionType) => {
		setSelectedFont(e);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onStateChange({
			fontFamilyOption: selectedFont,
		});
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
						selected={selectedFont}
						options={fontFamilyOptions}
						placeholder={
							selectedFont.value
								? selectedFont.value
								: defaultArticleState.fontFamilyOption.value
						}
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
