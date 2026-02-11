import { useState, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
  defaultArticleState,
  ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
  const [params, updateParams] = useState<ArticleStateType>(defaultArticleState);
  const [formShown, flipForm] = useState(false);

  const styleVars = {
    '--font-family': params.fontFamilyOption.value,
    '--font-size': params.fontSizeOption.value,
    '--font-color': params.fontColor.value,
    '--container-width': params.contentWidth.value,
    '--bg-color': params.backgroundColor.value,
  } as CSSProperties;

  return (
    <main className={clsx(styles.main)} style={styleVars}>
      <ArticleParamsForm
        articleStyles={params}
        setArticleStyles={updateParams}
        isFormOpen={formShown}
        toggleFormVisibility={() => flipForm(v => !v)}
      />
      <Article />
    </main>
  );
};