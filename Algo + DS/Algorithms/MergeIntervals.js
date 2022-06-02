class Interval {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	get_interval() {
		return '[' + this.start + ', ' + this.end + ']';
	}
}

/*
Given a list of intervals, merge all the overlapping intervals to produce a list that has only mutually exclusive intervals.
Intervals: [[1,4], [2,5], [7,9]]
Output: [[1,5], [7,9]]
Explanation: Since the first two intervals [1,4] and [2,5] overlap, we merged them into 
one [1,5].
*/
const merge = function (intervals) {
	if (intervals.length < 2) return intervals;

	// Sort the Intervals
	intervals.sort((a, b) => a.start - b.start);

	const mergedIntervals = [];
	let start = intervals[0].start,
		end = intervals[0].end;

	for (let i = 1; i < intervals.length; i += 1) {
		const interval = intervals[i];

		if (interval.start <= end) {
			// overlapping intervals, adjust the 'end'
			end = Math.max(interval.end, end);
		} else {
			// non-overlapping interval, add the previous interval and reset
			mergedIntervals.push(new Interval(start, end));
			start = interval.start;
			end = interval.end;
		}
	}

	mergedIntervals.push(new Interval(start, end));
	return mergedIntervals;
};
