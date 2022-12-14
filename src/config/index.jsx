export default class Config {
  static Amplify = () => ({
    Auth: {
      userPoolId: "us-east-2_f3uSVDg1t",
      userPoolWebClientId: "40gk9atadsefb9oj6nf2chgv6m",
    },
  });
  static Express = () => ({
    getConfig: () =>
      process.env.NODE_ENV === "development"
        ? {
            url: "http://localhost:3001",
          }
        : {
            url: "https://44.203.92.208.nip.io",
          },
  });
}
