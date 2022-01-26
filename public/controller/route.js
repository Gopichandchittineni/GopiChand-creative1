import { home_page } from "../viewpage/home_page.js";
import { about_page } from "../viewpage/about_page.js";
import { thread_page } from "../viewpage/thread_page.js";
import { search_page } from "../viewpage/search_page.js";

export const routePath = {
    HOME: '/',
    ABOUT: '/about',
    THREAD: '/thread',
    SEARCH: '/search',
}

export const routes = [
    {path: routePath.HOME, page: home_page },
    {path: routePath.ABOUT, page: about_page},
    {path: routePath.THREAD, page: thread_page},
    {path: routePath.SEARCH, page: search_page},
];

export function routing(pathname, hash){
    const route = routes.find(element => element.path == pathname);
    if(route){
        if(hash && hash.length > 1) 
            route.page(hash.substring(1));
        else 
            route.page();
    }else{
        routes[0].page();
    }
}