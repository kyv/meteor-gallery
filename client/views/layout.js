Template.layout.rendered = function() {
    $('[data-toggle="tooltip"]').tooltip(); //initialize all tooltips in this template

   //$('[data-cancel-timout]').click(function () {
   //
   //    clearPlayerTimeout;
   //});
}

UI.registerHelper('langButton', function () {

    var lang = toggleLanguage();
    var a = "<a href=\"#\" class=\"toggleLang\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Switch Language\">"+lang+"</a>";
    return new Handlebars.SafeString(a)

});

Template.layout.events({

  'click .toggleLang': function (e) {
    e.preventDefault();
    var lang = toggleLanguage();
    i18n.setLanguage(lang);
   }

});


