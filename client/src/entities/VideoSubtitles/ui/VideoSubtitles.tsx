import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './VideoSubtitlesCard.module.scss';

interface VideoSubtitlesCardProps {
    className?: string;
}

export const VideoSubtitlesCard = memo((props: VideoSubtitlesCardProps) => {
    const { t } = useTranslation();

    const { className } = props;

    return (
        <div className={classNames(classes.VideoSubtitlesCard, {}, [className])}>
            {t('VideoSubtitlesCard')}
        </div>
    );
});
