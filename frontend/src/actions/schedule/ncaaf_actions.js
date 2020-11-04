import * as ncaafAPIUtil from '../../util/schedule/ncaaf';

export const RECEIVE_NCAAF_SCHEDULE = "RECEIVE_NCAAF_SCHEDULE";
export const RECEIVE_NCAAF_WEEK = "RECEIVE_NCAAF_WEEK";

export const receiveNCAAFSchedule = schedule => ({
    type: RECEIVE_NCAAF_SCHEDULE,
    schedule
});

export const receiveNCAAFWeek = week => ({
    type: RECEIVE_NCAAF_WEEK,
    week
});

export const fetchOddsNCAAF = (week) => dispatch => (
    ncaafAPIUtil.preGameOddsNCAAF(week)
        .then(Schedule => dispatch(receiveNCAAFSchedule(Schedule)))
        .catch(err => console.log(err))
)

export const fetchNCAAFWeek = () => dispatch => (
    ncaafAPIUtil.getWeekNCAAF()
        .then(week => dispatch(receiveNCAAFWeek(week)))
        .catch(err => console.log(err))
)