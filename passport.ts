import passportCustom from "passport-custom";
const CustomStrategy = passportCustom.Strategy;
import passport from "passport";

export default (function (passport: any): any {
  passport.use(
    "secret-key",
    new CustomStrategy(function (req, done) {
      const secretKey: any = req.headers["secret_key"];

      if (secretKey !== process.env.SECREY_KEY) {
        return done(null, false);
      }

      return done(null, { message: "Admin is authenticated" });
    })
  );
})(passport);











// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { PassportStatic } from 'passport';
// import { prisma } from '@prisma/client';

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'secret_key' // Use environment variable in production
// };

// export default function(passport: PassportStatic): void {
//   passport.use(
//     new JwtStrategy(options, async (jwt_payload, done) => {
//       try {
//         const user = await prisma.user.findUnique({
//           where: { id: jwt_payload.id }
//         });
//         if (user) {
//           return done(null, user);
//         } else {
//           return done(null, false);
//         }
//       } catch (error) {
//         console.error(error);
//         return done(error, false);
//       }
//     })
//   );
// }
