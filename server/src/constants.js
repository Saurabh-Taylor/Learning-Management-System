export const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
}