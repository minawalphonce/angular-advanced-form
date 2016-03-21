(function() {
    'use strict';

    angular
        .module('ngAdvancedForm')
        .directive('ngCustomValidator', customValidator);

    function customValidator() {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {

            scope.$watch(attrs.ngCustomValidator, function (val, oldVal) {
                for (var i in oldVal) {
                    if (ngModel.$validators[i])
                        delete ngModel.$validators[i];
                }
                for (i in val) {
                    ngModel.$validators[i] = val[i];
                }
            });
        }
    }

})();