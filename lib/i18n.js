i18n.setDefaultLanguage('en');

if (Meteor.isClient) {
    var lang = window.navigator.userLanguage || window.navigator.language;
    i18n.setLanguage(lang.split('-')[0]);
}

//Meteor.call('language', function(error, string) {
//    console.log(string);
//  i18n.setLanguage(string.split('-')[0]);
//});

i18n.showMissing('[no translation for "<%= label %>" in <%= language %>]');

toggleLanguage = function () {
    var lang =  i18n.getLanguage();
    var newLang = (!lang || lang === 'en') ? 'es' : 'en';
    return newLang

}

var title = config.title;

i18n.map('en', {
  site: {
    title: title + ' Gallery',
    description: 'Single-Page Gallery Application',
  },
  singlePage: 'Single-Page',
  routes: 'Routes',
  gallery: 'gallery',
  dragNDrop: 'Drag and Drop upload',
  filter: 'filter by tag',
  clear: 'clear',
  by: 'by',
  features: 'features',
  about: {
    name: 'about',
    title: 'About this site',
  },
  mobileFriendly: 'Mobile-Friendly',
  multilingual: 'Multilingual',
  socialIntegration: 'Social Integration',
  userAccounts: 'User Accounts',
  tags: 'tags',
  credit: 'who?',
  atribution: 'Code, Design and Photos by',
  play: 'play',
  pause: 'pause',
  notFound: 'Not Found'


});

i18n.map('es', {
  site: {
    title: 'Galería ' + title,
    description: 'Galería de Una Sola Página',
  },
  singlePage: 'Una Sola Página',
  routes: 'Rutas',
  gallery: 'galería',
  dragNDrop: 'Arrastrar y Soltar para Subidas',
  filter: 'filtra por etiqueta',
  clear: 'reinicia campo',
  by: 'por',
  features: 'características',
  about: {
    name: 'sobres',
    title: 'Sobre este sitio',
  },
  mobileFriendly: 'Adaptado a Dispositivos Móviles',
  multilingual: 'Multilingua',
  socialIntegration: 'Integración Social',
  userAccounts: 'Cuentas de Usuario',
  tags: 'Etiquetas',
  credit: '¿quien?',
  atribution: 'Código, Diseño y Fotos por',
  play: 'inicia',
  pause: 'pausa',
  notFound: 'No Encontrado'

});
