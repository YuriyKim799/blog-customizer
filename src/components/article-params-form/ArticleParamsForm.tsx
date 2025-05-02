import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
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
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onStateChange: (newState: Partial<typeof defaultArticleState>) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onStateChange,
}: ArticleParamsFormProps) => {
	const [openAside, setOpenAside] = useState(false);
	const [formState, setFormState] = useState(currentState);

	const asideFormRef = useRef<HTMLElement | null>(null);

	const arrowBtnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setOpenAside(!openAside);
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

	useEffect(() => {
		if (openAside) {
			const handleDocumentClick = (e: Event) => {
				const target = e.target as HTMLElement;
				if (
					!asideFormRef.current?.contains(e.target as Node) &&
					!target.closest('select, input, button, li')
				) {
					setOpenAside(false);
				}
			};
			document.addEventListener('click', handleDocumentClick);
			document.addEventListener('keydown', (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					handleDocumentClick(e);
				}
			});
			return () => {
				document.removeEventListener('click', handleDocumentClick);
			};
		}
	}, [openAside]);

	return (
		<>
			<ArrowButton isOpen={openAside} onClick={(e) => arrowBtnClick(e)} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: openAside,
				})}
				ref={asideFormRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						<h2>{'Задайте параметры'}</h2>
					</Text>
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
