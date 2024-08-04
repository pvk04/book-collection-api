export const filterUserData = (user: any) => {
	const { password, ...filteredData } = user;
	return filteredData;
};
