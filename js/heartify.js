/*
,d88b.d88b,
88888888888
`Y8888888Y'
  `Y888Y'
    `Y'
+HEARTIFY PLUGIN+
 	Author: Adam Partyka
 	Date: 10/10/2011
 	
 	Special thanks to John Weis (weisjohn@gmail.com) for lending a hand!
	
	Dev notes:
	There are some default settings for the text to display, the css classes, attributes and the counter
	
	I was using $anchor.replaceWith($labelText); to swap out elements. That works fine
	as a static script, but with the plugin those elements are not recognized when the click
	function is called because they aren't in the DOM yet! AppendTo is the correct way in this
	case.
*/

(function ($) {

   $.fn.heartify = function (options) {

      var defaults = {

         labelText: 'What do you heart?',
         textArea: { 
        	 value: 'I heart'
         },
         cssClass: {
            enabled: 'enabled',
            disabled: 'disabled'
         },
         attr: {
            enabled: 'enabled',
            disabled: 'disabled'
         },
         counter: 133,
         on_submit : null
         
      };

      options = $.extend({}, defaults, options);

      return this.each(function () {

         //form objects
         var $formDiv = $('<div></div>'),
            $labelText = $('<p></p>'),
            $textArea = $('<textarea></textarea>'),
            $counter = $('<span></span>'),
            $submitBtn = $('<input type="submit" value="Submit" />');
         
         //object we're enabling the plugin on
         var $anchor = $(this);

         /*
            Initial click function:
              - click $anchor element
              - set $labelText's html to our default labelText
              - grab $formDiv, append it to the parent element - in this case, <div class='heartify_wrapper'>
              - hide $anchor
              - append form objects to $formDiv, fadeIn
              - set counter to 140 (int)
              - set focus to textarea
              - set $submitBtn attr to disabled, addClass disabled
         */
         $anchor.click(function (e) {

            $labelText.html(defaults.labelText);

            $formDiv.appendTo($anchor.parent());

            $anchor.hide();
            
            $formDiv.append($labelText, $textArea, $counter, $submitBtn).fadeIn();

            $counter.html(defaults.counter);

            $textArea.val(defaults.textArea.value);

            $submitBtn.attr('disabled', 'disabled').addClass('disabled');

            e.preventDefault();

         });

         /*
            Keyup function:
             - If count is equal to 140 or less than 0 - remove enabled attr, add disabled attr, remove enabled class, add disabled class
             Else, remove disabled attr, add enabled attr, remove disabled class, add enabled class
             - If count is less than 0, add disabled class to $counter
             Else remove disabled class
             - Subtracts from $counter w/ each character keyup
         */
         $textArea.keyup(function () {
        	 
             var count = 140 - $textArea.val().length;

             if (count === 140 || count < 0) {
                $submitBtn.removeAttr(defaults.attr.enabled)
                .attr('disabled', defaults.attr.disabled)
                .removeClass(defaults.cssClass.enabled)
                .addClass(defaults.cssClass.disabled);
             } else {
                $submitBtn.removeAttr(defaults.attr.disabled)
                .attr('enabled', defaults.attr.enabled)
                .removeClass(defaults.cssClass.disabled)
                .addClass(defaults.cssClass.enabled);
             }

             if (count < 0) {
                $counter.addClass(defaults.cssClass.disabled);
             } else {
                $counter.removeClass(defaults.cssClass.disabled);
             }

             $counter.html(count);
        	 
         });
         
         /*
         
         Submit function:
           - ajax call to submit the textArea.val() to a results <div>
           - detach form elements, restore $anchor to its original visual state
          
         */
         $submitBtn.click(function(e) {
       	  
	       	 $.ajax({ 
	       		 type: 'POST',
	       		 url: 'index.html',
	       		 datatype: 'html',
	       		 context : $submitBtn,
	       		 success: function() { 
	       			
        			 var data = $textArea.val();
        			 //find $submitBtn's parent, append data to a <p> within the sibling .results <div>
        			 $(this).parent().parent().siblings('.results').append(	
        				$('<p>' + data + '</p>')
        			 );
	       			 
	       			$formDiv.detach().css( { 'display' : 'none' } );
	           		 
	       			$anchor.fadeIn();
	       			
	       			if (typeof options.on_submit == 'function') {
	       				options.on_submit();
	       			}
	       			
	       		 }
	       	 });
	       	  
	       	 e.preventDefault();
	       	 
         });

      });

   };


})(jQuery);