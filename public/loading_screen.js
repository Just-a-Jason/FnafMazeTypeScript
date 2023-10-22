"use strict";
const SPINER_PATH = 'Images/Assets/spinner.gif';
const BANER_PATH = 'Images/Assets/baner.webp';
let LoadingScreen_Instance = null;
function Init() {
    const spinner = document.createElement('img');
    const baner = document.createElement('img');
    const ls = document.createElement('div');
    baner.classList.add("loading-baner");
    baner.src = BANER_PATH;
    baner.alt = 'baner';
    spinner.alt = 'loading spinner';
    spinner.src = SPINER_PATH;
    spinner.classList.add('loading-spinner');
    const loadingText = document.createElement('p');
    loadingText.innerText = 'Loading..';
    ls.appendChild(loadingText);
    ls.classList.add("loadingScreen");
    ls.appendChild(spinner);
    ls.appendChild(baner);
    document.body.appendChild(ls);
    LoadingScreen_Instance = ls;
    document.addEventListener('DOMContentLoaded', (e) => {
        console.info('Page loaded!');
        setTimeout(() => {
            DoneLoading();
        }, 200);
    });
}
function DoneLoading() {
    LoadingScreen_Instance.style["transform"] = "translateY(-1000px)";
    setTimeout(() => {
        LoadingScreen_Instance?.remove();
    }, 500);
}
Init();
