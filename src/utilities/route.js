import browserHistory from './browser-history';

export const setRoute = (url, state) => {
    browserHistory.push(url, state);
};

export const goBack = () => {
    browserHistory.goBack();
};
