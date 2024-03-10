import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    alignsMapper,
    colorMapper,
    headerTagMapper,
    sizeMapper,
    variantsMapper,
} from '../types/TextMappers';
import { TextAlign, TextSize, TextVariant, TextColor } from '../types/Text.types';
import classes from './Text.module.scss';

interface TextProps {
    className?: string;
    titleClassname?: string;
    textClassname?: string;
    title?: string;
    text?: string;
    color?: TextColor;
    align?: TextAlign;
    size?: TextSize;
    variant?: TextVariant;
    type?: 'textType' | 'titleType';
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        align = 'left',
        size = 'medium',
        variant = 'primary',
        textClassname,
        titleClassname,
        type = 'title',
        color = 'primary',
    } = props;

    const variantsClasses = variantsMapper[variant];
    const alignsClasses = alignsMapper[align];
    const sizeClasses = sizeMapper[size];
    const HeaderTag = headerTagMapper[size];
    const ColorClasses = colorMapper[color];

    const add = [
        className,
        variantsClasses,
        alignsClasses,
        sizeClasses,
        ColorClasses,
        type === 'textType' ? classes.textType : '',
    ];

    return (
        <div className={classNames(classes.Text, {}, add)}>
            {title && (
                <HeaderTag className={classNames(classes.title, {}, [titleClassname])}>
                    {title}
                </HeaderTag>
            )}
            {text && <p className={classNames(classes.text, {}, [textClassname])}>{text}</p>}
        </div>
    );
});
