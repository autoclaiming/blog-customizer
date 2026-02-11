import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import React, { useState, FormEvent, useRef } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	articleStyles: ArticleStateType;
	setArticleStyles: (newStyles: ArticleStateType) => void;
	isFormOpen: boolean;
	toggleFormVisibility: () => void;
};

export const ArticleParamsForm = ({
	articleStyles,
	setArticleStyles,
	isFormOpen,
	toggleFormVisibility,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(articleStyles);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef,
		onClose: toggleFormVisibility,
		onChange: () => { },
	});

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleStyles(defaultArticleState);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleStyles(formState);
	};

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isFormOpen} onClick={toggleFormVisibility} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.spacing}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) => handleChange('fontFamilyOption', option)}
						/>
						<div className={styles.radioGroupSpacing}>
							<RadioGroup
								name='fontSize'
								title='Размер шрифта'
								options={fontSizeOptions}
								selected={formState.fontSizeOption}
								onChange={(option) => handleChange('fontSizeOption', option)}
							/>
						</div>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) => handleChange('fontColor', option)}
						/>
						<Separator />
						<div className={styles.separatorSpacing}>
							<Select
								title='Цвет фона'
								options={backgroundColors}
								selected={formState.backgroundColor}
								onChange={(option) => handleChange('backgroundColor', option)}
							/>
						</div>
						<div className={styles.contentWidthSpacing}>
							<Select
								title='Ширина контента'
								options={contentWidthArr}
								selected={formState.contentWidth}
								onChange={(option) => handleChange('contentWidth', option)}
							/>
						</div>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
