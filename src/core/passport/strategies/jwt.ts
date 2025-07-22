import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { UserRepository } from '../../../domains/user/reposetories/userRepository.js';
import { IUser } from '../../../domains/user/models/User.js';
import { IJwtPayload } from '../../../core/types/jwt.js';
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const userRepo = new UserRepository();

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

passport.use(
  new JwtStrategy(
    opts,
    async (jwt_payload: IJwtPayload, done: (error: any, user?: IUser | false) => void) => {
      try {
        const user = await userRepo.findUserByID(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport;
