/**
 * Created by macbookpro on 28-12-15.
 */
(function () {
    angular
        .module('test')
        .filter('splitNewLine', function () {
            return function (text)
            {
                var finalText = text.split(" ");
                return finalText.join()
            };
        });

})();