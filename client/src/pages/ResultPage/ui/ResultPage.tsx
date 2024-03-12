import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { memo, useEffect } from 'react';
import { Text } from 'shared/UI/Text';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { getVideoSubtitlesData } from 'entities/VideoSubtitles';
import classes from './ResultPage.module.scss';

interface ResultPageProps {
    className?: string;
}

const ResultPage = memo((props: ResultPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Скачайте результат';
    }, []);

    const result = useSelector(getVideoSubtitlesData);

    return (
        <Page className={classNames(classes.ResultPage, {}, [className])}>
            <VStack maxW gap="32">
                <Text title="Принимайте результат" />
                <video src={`http://localhost:5000/files/${result?.result?.videoSrc}`} controls />
                <HStack maxW>
                    <Button severity="info">
                        <a
                            className={classes.link}
                            target="_blank"
                            href={`http://localhost:5000/files/${result?.result?.voiceoverSrc}`}
                            download
                            rel="noreferrer"
                        >
                            Скачать озвучку
                        </a>
                    </Button>
                    <Button>
                        <a
                            className={classes.link}
                            target="_blank"
                            href={`http://localhost:5000/files/${result?.result?.videoSrc}`}
                            download
                            rel="noreferrer"
                        >
                            Скачать видео
                        </a>
                    </Button>
                    <Button severity="secondary">
                        <a
                            className={classes.link}
                            target="_blank"
                            href={`http://localhost:5000/files/${result?.result?.subtitlesSrc}`}
                            download
                            rel="noreferrer"
                        >
                            Скачать перевод
                        </a>
                    </Button>
                </HStack>
            </VStack>
        </Page>
    );
});

export default ResultPage;
