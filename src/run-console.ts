import * as os from 'os';

export const Run = () => {
    const { APP_NAME, APP_PORT, APP_HOST, NODE_ENV } = process.env;
    
    console.log('\n');
    console.log(`========== [${APP_NAME}] ==========`, '\n');
    console.log("Env\t\t ⇢", NODE_ENV);
    console.log("PORT\t\t ⇢", APP_PORT);
    console.log("HOST\t\t ⇢", os.hostname() || APP_HOST);
    console.log("Platform\t ⇢", `${os.type()} ${os.arch()}`);
    console.log("OS Version\t ⇢", os.release() || APP_HOST);
    console.log("Tmp Dir\t\t ⇢", os.tmpdir() || APP_HOST);
    console.log('\n');
    console.log("Status\t\t ⇢", "Running 🚀🚀🚀");
}