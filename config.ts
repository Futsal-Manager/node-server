/**
 * Created by yuhogyun on 2017. 2. 3..
 */


const LOCAL_IMAGE_PROCESSING_API = 'http://localhost:8000';
const REMOTE_IMAGE_PROCESSING_API = 'http://ec2-52-78-155-90.ap-northeast-2.compute.amazonaws.com';
export const AWS_NODE_SERVER_API = 'http://ec2-52-79-77-112.ap-northeast-2.compute.amazonaws.com';

export const REMOTE_MODE:string = 'REMOTE';
export const LOCAL_MODE:string = 'LOCAL';

export const NOWMODE = REMOTE_MODE;

const CONFIG = {
  BCRYPT_SALT_ROUNDS: 10,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  FACEBOOK_REDIRECT_URL: process.env.FACEBOOK_REDIRECT_URL || 'http://localhost:3000/auth/facebook/callback',
  SESSION_SECRET_KEY: 'sdnfsdjfpdsfijdp!@#',
  AWS_REGION: 'ap-northeast-2',
  // Todo: 하드코딩 되어있는 config를 환경변수로 바꾸기
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || 'key-5d99fcd73fd65d11493671447d2b56c5',
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN || 'sandboxdf9f79ef23284aa9b72cb75b725befd5.mailgun.org',
  PROTOCOL_TOKEN: process.env.PROTOCOL_TOKEN || 'dfisdfn2@#23sdfbjsdfj23klnSDFn1l32nlkndskdskfjs@#f@!#dsf',
  IMAGE_PROCESSING_API: (NOWMODE === LOCAL_MODE)? LOCAL_IMAGE_PROCESSING_API : REMOTE_IMAGE_PROCESSING_API // Local: http://localhost: 8000
};

export default CONFIG;