export interface JwtPayload {
	userId: number;
	role: number;
}

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload;
		}
	}
}
