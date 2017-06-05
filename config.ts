/**
 * Created by yuhogyun on 2017. 2. 3..
 */
const CONFIG = {
  BCRYPT_SALT_ROUNDS: 10,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  FACEBOOK_REDIRECT_URL: process.env.FACEBOOK_REDIRECT_URL || 'http://localhost:3000/auth/facebook/callback',
  SESSION_SECRET_KEY: 'sdnfsdjfpdsfijdp!@#',
  AWS_REGION: 'ap-northeast-2',
  // Todo: 하드코딩 되어있는 config를 환경변수로 바꾸기
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || 'key-5071c2d41b08df0671c75464deda33f3',
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN || 'sandbox9c41f305e6c04852a25aa8d705b3a4c7.mailgun.org',
  PROTOCOL_TOKEN: process.env.PROTOCOL_TOKEN || 'dfisdfn2@#23sdfbjsdfj23klnSDFn1l32nlkndskdskfjs@#f@!#dsf',
  IMAGE_PROCESSING_API: 'http://ec2-52-78-155-90.ap-northeast-2.compute.amazonaws.com'
};

export default CONFIG;