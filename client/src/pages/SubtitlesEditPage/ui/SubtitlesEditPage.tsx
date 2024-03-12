import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import { Icon } from 'shared/UI/Icon/Icon';
import MainLogoIcon from 'shared/assets/icons/main-logo.svg';
import { Divider } from 'primereact/divider';
import { HStack, VStack } from 'shared/UI/Stack';
import { getVideoSubtitlesData, VideoSubtitles } from 'entities/VideoSubtitles';
import { useSelector } from 'react-redux';
import { Text } from 'shared/UI/Text';
import YouTube from 'react-youtube';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import classes from './SubtitlesEditPage.module.scss';

interface SubtitlesEditPageProps {
    className?: string;
}

const SubtitlesEditPage = memo((props: SubtitlesEditPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Проверьте перевод видео';
    }, []);

    const [videoId, setVideoId] = useState<string>('');
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [editedSubtitles, setEditedSubtitles] = useState<VideoSubtitles>();

    const subtitles = useSelector(getVideoSubtitlesData);

    useEffect(() => {
        setEditedSubtitles(subtitles);
    }, [subtitles]);

    useEffect(() => {
        if (subtitles?.videoId) {
            const id = subtitles?.videoId.match(
                /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/,
            );
            if (id) setVideoId(id[1]);
        }
    }, [subtitles?.videoId]);

    const handleSubtitleChange = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        // if (editedSubtitles) {
        //     setEditedSubtitles((prevSubtitles) => {
        //         const newSubtitles = [...prevSubtitles.subtitles];
        //         newSubtitles[index].text = event.target.value;
        //         return { ...prevSubtitles, subtitles: newSubtitles };
        //     });
        // }
    };

    if (!subtitles?.subtitles?.length) {
        return (
            <Page className={classNames(classes.SubtitlesEditPage, {}, [className])}>
                <VStack maxW align="center">
                    <Icon Svg={MainLogoIcon} className={classes.logo} />
                    <Divider className={classes.divider} />

                    <Text
                        align="center"
                        title="Не найдены результаты обработки видео"
                        text="Попробуйте перейти на главную и начать заново"
                    />
                </VStack>
            </Page>
        );
    }

    return (
        <Page className={classNames(classes.SubtitlesEditPage, {}, [className])}>
            <VStack maxW align="center">
                <Icon Svg={MainLogoIcon} className={classes.logo} />
                <Divider className={classes.divider} />

                {editedSubtitles?.videoId && (
                    <>
                        <Text title={videoTitle} className={classes.videoTitle} />
                        <div className={classes.videoWrapper}>
                            <YouTube
                                key={videoId}
                                className={classes.video}
                                videoId={videoId}
                                onReady={(event: any) => setVideoTitle(event.target.videoTitle)}
                            />
                        </div>

                        <Divider className={classes.divider} />
                        <VStack className={classes.subtitles} maxW justify="start" gap="8">
                            {editedSubtitles?.subtitles &&
                                editedSubtitles?.subtitles.map((st, index) => (
                                    <HStack
                                        align="start"
                                        key={st.startAt + st.endAt}
                                        justify="start"
                                        gap="16"
                                        maxW
                                    >
                                        <InputText disabled value={`${st.startAt} - ${st.endAt}`} />
                                        <InputTextarea
                                            className={classes.textarea}
                                            autoResize
                                            value={st.text}
                                            onChange={(e) => handleSubtitleChange(e, index)}
                                            rows={5}
                                        />
                                    </HStack>
                                ))}
                            <Button className={classes.button} severity="secondary">
                                Продолжить
                            </Button>
                        </VStack>
                    </>
                )}
            </VStack>
        </Page>
    );
});

export default SubtitlesEditPage;
