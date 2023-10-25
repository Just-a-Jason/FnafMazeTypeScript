const SPINER_PATH:string = '../Images/Assets/spinner.gif';
const BANER_PATH:string = '../Images/Assets/baner.webp';

let LoadingScreen_Instance:Nullable<LoadingScreen> = null;

function Init():void {
    const spinner:HTMLImageElement = document.createElement('img');
    const baner: HTMLImageElement = document.createElement('img');
    const ls:HTMLDivElement = document.createElement('div');

    baner.src = BANER_PATH;
    baner.alt = 'baner';


    spinner.alt = 'loading spinner';
    spinner.src = SPINER_PATH;
    spinner.classList.add('loading-spinner');

    const loadingText:HTMLParagraphElement = document.createElement('p');
    loadingText.innerText = 'Loading..';
    ls.appendChild(loadingText);

    ls.classList.add("loadingScreen");
    ls.appendChild(spinner);
    ls.appendChild(baner);

    document.body.appendChild(ls);
    LoadingScreen_Instance = ls;

    document.addEventListener('DOMContentLoaded', (e:Event) => {
        console.log('%c Page loaded!', 'color: #f00;');
        setTimeout(() => {
            DoneLoading();
        }, 200);
    });
}

function DoneLoading():void {
    LoadingScreen_Instance!.style["transform"] = "translateY(-1000px)";
    setTimeout(() => {
        LoadingScreen_Instance?.remove();
    }, 500);
}

Init();