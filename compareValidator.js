(function () {
    'use strict';

    angular
        .module('ngAdvancedForm')
        .directive('ngCompareValidator', compareValidator);

    function compareValidator() {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {

            attrs.$observe("ngCompareValidator", function (val) {
                ngModel.$validators.compare = function (str) {
                    return str == val;
                }
            });
        }
    }

})();