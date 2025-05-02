import { CSSProperties, useState } from 'react';
import { Article } from 'components/article/Article';
import { ArticleParamsForm } from 'components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const updateState = (newState: Partial<typeof defaultArticleState>) => {
		setArticleState((prev) => ({ ...prev, ...newState }));
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentState={articleState}
				onStateChange={updateState}
			/>
			<Article />
		</main>
	);
};
