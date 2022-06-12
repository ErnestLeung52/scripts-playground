class Interval {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	get_interval() {
		return '[' + this.start + ', ' + this.end + ']';
	}
}

/* ------ 1. Smallest Subarray With a Greater Sum ----- Leetcode 56
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
// let result = merge([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]);

const mergedIntervals = (intervals) => {
	if (intervals.length < 2) return intervals;

	intervals.sort((a, b) => a[0] - b[0]);

	const result = [];
	let [start, end] = intervals[0];
	// 8 , 10
	for (let i = 1; i < intervals.length; i++) {
		const interval = intervals[i];
		if (interval[0] <= end) {
			end = Math.max(interval[1], end);
		} else {
			result.push([start, end]);
			start = interval[0];
			end = interval[1];
		}
	}
	result.push([start, end]);
	return result;
};
// console.log(mergedIntervals([[1, 3],[2, 6],[8, 10],[15, 18],]));
