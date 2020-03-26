// single-spa-config.js
import * as singleSpa from 'single-spa'; //导入single-spa
import axios from 'axios';
/*
 * runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
 * */
const runScript = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};
const getManifest = async (url, bundle) => {
    return new Promise(async (resolve) => {
        const {data} = await axios.get(url);
        const {entrypoints,publicPath} = data;
        const assets = entrypoints[bundle].assets;
        for (let i = 0; i < assets.length; i++) {
            await runScript(publicPath + assets[i]).then(() => {
                if (i === assets.length - 1) {
                    resolve()
                }
            })
        }
    });
}
// const getManifest = async (url, bundle) => {
//     return new Promise( (resolve) => {
//         axios.get(url).then(({data})=>{            
//             const {entrypoints,publicPath} = data;
//             const assets = entrypoints[bundle].assets;
//             async ()=>{
//                 for (let i = 0; i < assets.length; i++) {
//                     await runScript(publicPath + assets[i]).then(() => {
//                         if (i === assets.length - 1) {
//                             resolve()
//                         }
//                     })
//                 }
//              }
//         });
        
       
//     });
// }

singleSpa.registerApplication( //注册微前端服务
    'singleDemo',
    async () => {
            // await runScript('http://127.0.0.1:3000/js/chunk-vendors.js');
            //  await runScript('http://127.0.0.1:3000/js/app.js');
            //  return window.singleVue;


            let singleVue = null;
            await getManifest('/app1/manifest.json?time='+ +new Date(), 'app').then(() => {
                singleVue = window.singleVue;
            });
            return singleVue;
        },
        location => location.pathname.startsWith('/vue') // 配置微前端模块前缀
);

singleSpa.registerApplication( //注册微前端服务
    'twoDemo',
    async () => {
            // await runScript('http://127.0.0.1:3001/js/chunk-vendors.js');
            //  await runScript('http://127.0.0.1:3001/js/app.js');
            //  return window.twoVue;

             
            let singleVue = null;
            await getManifest('/app2/manifest.json?time='+ +new Date(), 'app').then(() => {
                singleVue = window.twoVue;
            });
            return singleVue;
        },
        location => location.pathname.startsWith('/two') // 配置微前端模块前缀
);
singleSpa.start(); // 启动