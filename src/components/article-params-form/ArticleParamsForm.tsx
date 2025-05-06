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
	articleState: ArticleStateType;
	setArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [openAside, setOpenAside] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const asideFormRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!openAside) {
			setFormState(articleState);
		}
	}, [articleState]);

	useEffect(() => {
		if (!openAside) return;

		const handleDocumentClick = (e: MouseEvent) => {
			if (
				asideFormRef.current &&
				!asideFormRef.current.contains(e.target as Node)
			) {
				setOpenAside(false);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenAside(false);
			}
		};

		document.addEventListener('click', handleDocumentClick);
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleKeyDown(e);
			}
		});

		return () => {
			document.removeEventListener('click', handleDocumentClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [openAside]);

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
					...option,
				},
			}));
		};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

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
					<Text size={31} weight={800} uppercase={true} as={'h2'}>
						{'Задайте параметры'}
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
