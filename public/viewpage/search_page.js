import * as Elements from './elements.js';
import * as Util from './util.js';
import { routePath } from '../controller/route.js';
import { currentUser } from '../controller/firebase_auth.js';
import * as ProtectedMessage from './protected_message.js';
import * as FirestoreController from '../controller/firestore_controller.js';
import * as Constants from '../model/constants.js';
import { buildHomeScreen } from './home_page.js';

export function addEventListeners(){

    Elements.formSearch.addEventListener('submit',async e=> {
        e.preventDefault();
        const searchKeys = e.target.searchKeys.value.trim();
        if(searchKeys.length == 0){
            Util.info('Error','No Search Keys');
            return;
        }

        const button = e.target.getElementsByTagName('button')[0];
        const label = Util.disableButton(button);

        const searchKeysArray = searchKeys.toLowerCase().match(/\S+/g);
        const joinedSearchKeys = searchKeysArray.join(',');

        history.pushState(null,null,routePath + "#" + joinedSearchKeys);
        search_page(joinedSearchKeys);
        await search_page(joinedSearchKeys);

        Util.enableButton(button, label);

    });

}

export async function search_page(joinedSearchKeys) {
    //console.log('search page: ' + joinedSearchKeys);

    if(!joinedSearchKeys){
        Util.info('Error','No Search Keys');
        return;
    }

    const searchKeysArray = joinedSearchKeys.split(',');
    if(searchKeysArray.length == 0){
        Util.info('Error', 'No Search Keys');
        return;
    }

    if(searchKeysArray.length > 10){
        Util.info('Error', 'The number of search keys cannot exceed 10');
        return;
    }

    //Check Authorization or Authorization
    if(!currentUser){
        Elements.root.Elements = ProtectedMessage.html;
        return;
    }

    let threadList;
    try{
        threadList=await FirestoreController.searchThreads(searchKeysArray);
    }catch(e){
        if(Constants.DEV) console.log(e);
        Util.info('Search Error', JSON.stringify(e));
        return;
    }

    //Elements.root.innerHTML = `<h1>Search for: ${joinedSearchKeys}</h1>`;
    buildHomeScreen(threadList);

}