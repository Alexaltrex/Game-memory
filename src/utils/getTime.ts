export const getTime = (secs: number): string => {
    let date = new Date(secs*1000);
    let secondsNumber = date.getSeconds();
    let secondsString = secondsNumber > 9 ? String(secondsNumber) : `0${secondsNumber}`;
    let minutesNumber = date.getMinutes();
    let minutesString = minutesNumber > 9 ? String(minutesNumber) : `0${minutesNumber}`;
    return `${minutesString} : ${secondsString}`
};
export const getSeconds = (secs: number): string => {
    return secs > 9 ? String(secs) : `0${secs}`;
};
