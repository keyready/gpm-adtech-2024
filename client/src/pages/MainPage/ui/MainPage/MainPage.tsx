import { Page } from 'widgets/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/UI/Text';
import { HStack, VStack } from 'shared/UI/Stack';
import { YouTubePlayer } from 'shared/UI/YouTubePlayer';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from 'shared/UI/PageLoader';
import { createSubtitles } from 'entities/VideoSubtitles/model/service/createSubtitles';
import { useSelector } from 'react-redux';
import {
    getVideoSubtitlesData,
    getVideoSubtitlesError,
    VideoSubtitlesReducer,
} from 'entities/VideoSubtitles';
import { InputTextarea } from 'primereact/inputtextarea';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import classes from './MainPage.module.scss';

interface Country {
    label: string;
    code: string;
}

const MainPage = () => {
    const [videoUrl, setVideoUrl] = useState<string>('');

    const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
    const [isVideoProcessing, setIsVideoProcessing] = useState<boolean>(false);

    const subtitles = useSelector(getVideoSubtitlesData);
    const videoError = useSelector(getVideoSubtitlesError);

    const dispatch = useAppDispatch();

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsVideoProcessing(true);
            const result = await dispatch(createSubtitles({ url: videoUrl }));
            setIsVideoProcessing(false);
        },
        [dispatch, videoUrl],
    );

    const groupedCities: Country[] = [
        {
            label: 'Germany',
            code: 'DE',
        },
        {
            label: 'USA',
            code: 'US',
        },
        {
            label: 'Japan',
            code: 'JP',
        },
    ];

    const groupedItemTemplate = (option: Country) => (
        <div className="flex align-items-center">
            {/* <img */}
            {/*    alt={option.label} */}
            {/*    src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" */}
            {/*    className={`flag flag-${option.code.toLowerCase()}`} */}
            {/*    style={{ width: '18px' }} */}
            {/* /> */}
            <div>{option.label}</div>
        </div>
    );

    return (
        <DynamicModuleLoader reducers={{ video: VideoSubtitlesReducer }}>
            <Page className={classNames(classes.MainPage, {}, [])}>
                {isVideoProcessing && <PageLoader />}
                <span className="fi fi-gr" /> <span className="fi fi-gr fis" />
                <form onSubmit={handleFormSubmit}>
                    <VStack gap="32" maxW justify="center" align="center">
                        <InputText
                            placeholder="Введите ID-видео YouTube"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                        />
                        <div className={classes.videoWrapper}>
                            {videoUrl && (
                                <YouTubePlayer
                                    setIsVideoReady={setIsVideoReady}
                                    videoId={videoUrl}
                                />
                            )}
                        </div>
                        {!subtitles?.subtitles && (
                            <Button disabled={!isVideoReady}>Отправить на перевод</Button>
                        )}
                        <Dropdown
                            options={groupedCities}
                            optionGroupChildren="items"
                            optionGroupTemplate={groupedItemTemplate}
                            className="w-full md:w-14rem"
                            placeholder="Select a City"
                        />
                    </VStack>
                </form>
                {subtitles?.subtitles && (
                    <>
                        <VStack className={classes.subtitles} maxW justify="start" gap="8">
                            {subtitles?.subtitles.map((st) => (
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
                                        rows={5}
                                    />
                                </HStack>
                            ))}
                        </VStack>
                        <Button>Отправить на озвучку</Button>
                    </>
                )}
                {videoError && <Text title={videoError} variant="error" />}
            </Page>
        </DynamicModuleLoader>
    );
};

export default MainPage;
