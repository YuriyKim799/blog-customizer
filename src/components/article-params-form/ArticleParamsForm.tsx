import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent, useEffect } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	currentState: typeof defaultArticleState;
	onStateChange: (newState: Partial<typeof defaultArticleState>) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onStateChange,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [formState, setFormState] = useState(currentState);

	const arrowBtnClick = () => {
		setOpen(!open);
	};

	const handleChange =
		(type: keyof typeof formState) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[type]: {
					...prev[type],
					// Если нужно сохранить другие свойства опции
					...option,
				},
			}));
		};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onStateChange(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onStateChange(defaultArticleState);
	};

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	return (
		<>
			<ArrowButton isOpen={open} onClick={arrowBtnClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
						placeholder={formState.fontFamilyOption.title}
						title={'ШРИФТ'}
					/>
					<RadioGroup
						key={formState.fontSizeOption.value}
						name={formState.fontSizeOption.title}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title={'РАЗМЕР ШРИФТА'}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder={formState.fontColor.title}
						onChange={handleChange('fontColor')}
						title={'ЦВЕТ ШРИФТА'}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder={formState.backgroundColor.title}
						onChange={handleChange('backgroundColor')}
						title={'ЦВЕТ ФОНА'}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder={formState.contentWidth.title}
						onChange={handleChange('contentWidth')}
						title={'ШИРИНА КОНТЕНТА'}
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
