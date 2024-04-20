import passport from "passport";
//   passport.authenticate('custom', { failureRedirect: '/login' }),
export const auth = passport.authenticate("secret-key", { session: false });
