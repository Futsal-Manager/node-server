/**
 * Created by yuhogyun on 2017. 2. 3..
 */
const CONFIG = {
  BCRYPT_SALT_ROUNDS: 10,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  FACEBOOK_REDIRECT_URL: process.env.FACEBOOK_REDIRECT_URL || 'http://localhost:3000/auth/facebook/callback',
  SESSION_SECRET_KEY: 'sdnfsdjfpdsfijdp!@#',
  AWS_REGION: 'ap-northeast-2'
};

export default CONFIG;
