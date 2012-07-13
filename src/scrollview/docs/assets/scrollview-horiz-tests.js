YUI.add('scrollview-horiz-tests', function(Y) {
    
    var suite = new Y.Test.Suite('scrollview-horiz test suite');

    suite.add(new Y.Test.Case({

        name : 'Example Tests',

        'Large flick should offset scrollview to the end' : function () {
            var Test = this;

            Y.one('#scrollview-content').simulateGesture('flick', {
                distance: -800,
                axis: 'x'
            });

            Test.wait(function () {
                var transform = Y.one('#scrollview-content').getStyle('transform'),
                    offset = transform.split(',')[4].replace(')', '').trim();


                if (offset == -986 /*Chrome/Safari*/ && offset == -987 /*FF*/) {
                    Y.Assert.pass();
                }
                else {
                    Y.Assert.fail();
                }
            }, 3000);
        }
    }));

    suite.add(new Y.Test.Case({

        name : 'Manual tests',

        'More complex swipe gestures should behave correctly' : function () {
        	Y.Assert.fail();
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {requires:['node-event-simulate']});