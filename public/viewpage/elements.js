//main root element
export const root = document.getElementById('root');

//forms
export const formSearch = document.getElementById('form-search');
export const formSignIn = document.getElementById('form-signin');
export const formCreateThread = document.getElementById('form-create-thread');
export const formCreateAccount = document.getElementById('form-create-account');

// menu buttons
export const menuSignOut = document.getElementById('menu-signout');
export const menuHome = document.getElementById('menu-home');
export const menuAbout = document.getElementById('menu-about');
//modals
export const modalSignin = new bootstrap.Modal(document.getElementById('modal-signin-form'),{backdrop:'static'});
export const modalInfobox = {
    modal:new bootstrap.Modal(document.getElementById('modal-infobox'), {backdrop: 'static'}),
    title:document.getElementById('modal-infobox-title'),
    body:document.getElementById('modal-infobox-body'),
}

export const modalCreateThread = new bootstrap.Modal(document.getElementById('modal-create-thread'),{backdrop: 'static'});
export const modalCreateAccount = new bootstrap.Modal(document.getElementById('modal-create-account',{backdrop: 'static'}));