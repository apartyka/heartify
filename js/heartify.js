/*
,d88b.d88b,
88888888888
`Y8888888Y'
  `Y888Y'
    `Y'
+HEARTIFY PLUGIN+
	Author: Adam Partyka
 	Date: 10/11/2011
 	
 	Special thanks to John Weis (weisjohn) for lending a hand!
 	Check the readme file on github (github.com/apartyka/heartify) for additional notes and implementation.
*/

(function($) {

    $.fn.heartify = function(options) {

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
            counter: 140,
            on_submit: null

        };

        options = $.extend({}, defaults, options);

        return this.each(function() {

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
              - set counter to the current value of textarea 
              - set $submitBtn attr to disabled, addClass disabled
         */
            $anchor.click(function(e) {
            	
            	//options.counter(140) - current length of textArea.value
            	var counterTotal = options.counter - options.textArea.value.length;
            	
                $labelText.html(options.labelText);

                $formDiv.appendTo($anchor.parent());

                $anchor.hide();

                $formDiv.append($labelText, $textArea, $counter, $submitBtn).fadeIn();

                $textArea.val(options.textArea.value);

                $counter.html(counterTotal);

                $submitBtn.attr('disabled', options.attr.disabled).addClass(options.cssClass.disabled);

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
            $textArea.keyup(function() {

                var count = 140 - $textArea.val().length;

                if (count === 140 || count < 0) {
                    $submitBtn.removeAttr(options.attr.enabled)
                    .attr('disabled', options.attr.disabled)
                    .removeClass(options.cssClass.enabled)
                    .addClass(options.cssClass.disabled);
                } else {
                    $submitBtn.removeAttr(options.attr.disabled)
                    .attr('enabled', options.attr.enabled)
                    .removeClass(options.cssClass.disabled)
                    .addClass(options.cssClass.enabled);
                }

                if (count < 0) {
                    $counter.addClass(options.cssClass.disabled);
                } else {
                    $counter.removeClass(options.cssClass.disabled);
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
                    context: $submitBtn,
                    success: function() {

                        var data = $textArea.val();
                        //find $submitBtn's parent, append data to a <p> within the sibling .results <div>
                        $(this).parent().parent().siblings('.results').append($('<p>' + data + '</p>'));

                        $formDiv.detach().css({
                            'display': 'none'
                        });

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