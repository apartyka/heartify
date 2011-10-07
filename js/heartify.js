/*
,d88b.d88b,
88888888888
`Y8888888Y'
  `Y888Y'
    `Y'
+HEARTIFY PLUGIN+
 	Author: Adam Partyka
 	Date: 10/7/2011
 	
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

         text: 'What do you heart?',
         cssClass: {
            enabled: 'enabled',
            disabled: 'disabled'
         },
         //probably want to leave these as is
         attr: {
            enabled: 'enabled',
            disabled: 'disabled'
         },
         counter: 140

      };

      options = $.extend({}, defaults, options);

      return this.each(function () {

         console.log('plugin called!');

         //form objects
         var $formDiv = $('<div></div>'),
            $labelText = $('<p></p>'),
            $textArea = $('<textarea></textarea>'),
            $counter = $('<span></span>'),
            $submitBtn = $('<input type="submit" />');

         var $anchor = $(this);

         /*
            Initial click function:
              - click $anchor element
              - set $labelText's html to our default text
              - grab $formDiv, append it to the parent element - in this case, <div class='heartify_wrapper'>
              - hide $anchor
              - append form objects to $formDiv, fadeIn
              - set counter to 140 (int)
              - set focus to textarea
              - set $submitBtn attr to disabled, addClass disabled
         */
         $anchor.click(function (e) {

            $labelText.html(defaults.text);

            $formDiv.appendTo($anchor.parent());

            $anchor.hide();
            $formDiv.append($labelText, $textArea, $counter, $submitBtn).fadeIn();

            $counter.html(140);

            $textArea.focus();

            $submitBtn.attr('disabled', 'disabled').addClass('disabled');

            e.preventDefault();

            console.log('click!');
            console.log($formDiv, 'formDiv is here!');

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
               $submitBtn.removeAttr('enabled').attr('disabled', 'disabled').removeClass('enabled').addClass('disabled');
            } else {
               $submitBtn.removeAttr('disabled').attr('enabled', 'enabled').removeClass('disabled').addClass('enabled');
            }

            if (count < 0) {
               $counter.addClass('disabled');
            } else {
               $counter.removeClass('disabled');
            }

            $counter.html(count);

         });

      });

   };

   $(document).ready(function () {

      $('.cta').heartify();

   });

})(jQuery);