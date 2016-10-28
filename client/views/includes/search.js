Template.searchForm.events({
  'keypress input.searchQuery': function (e) {
     var val = $(e.target).val()+e.key;
     if (val === "") $('.gallery-item').show('slow');
     if (val.length > 2) {
         $('.gallery-item').each(function(e){
             var tags = $(this).find('[data-tags]').data('tags');
             //if(!tags) $(this).hide('slow');
             if (!tags || tags.indexOf(val) < 0) {
                 $(this).hide('slow');
             } else {$(this).show('slow')}
         });
     }
     var code = (e.keyCode ? e.keyCode : e.which);
     if (code==13) {
         e.preventDefault();
         $('input.searchQuery').val("");
         $('.gallery-item').show('slow');
     }
   },

   'click .clearInput': function (e) {
        e.preventDefault();
        $('input.searchQuery').val("");
        $('.gallery-item').show('slow');
    },

   'submit form': function (e) {
      e.preventDefault();
   },

});
