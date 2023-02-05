export function getTrimester() {
	const currentMonth = new Date().getMonth(); // 0-11
	let trimester;
	if (currentMonth <= 2) trimester = 1;
	else if (currentMonth > 2 && currentMonth <= 5)
		// 0,1,2
		trimester = 2;
	else if (currentMonth > 5 && currentMonth <= 8)
		//3,4,5
		trimester = 3;
	else if (currentMonth > 8)
		//6,7,8
		trimester = 4; //9,10,11
	return trimester;
}
