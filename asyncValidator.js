(function() {
    'use strict';

    angular
        .module('ngAdvancedForm')
        .directive('ngAsyncValidator', pdAsyncValidator);

    function pdAsyncValidator() {

        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {

            scope.$watchCollection(attrs.ngAsyncValidator, function (val, oldVal) {
                if (ngModel.$asyncValidators[oldVal.name]) {
                    delete ngModel.$asyncValidators[oldVal.name];
                }
                ngModel.$asyncValidators[val.name] = asyncHook;

                function asyncHook() {
                    var promise = val.action.apply(this, arguments);
                    asyncHook.$asyncPromise = promise;
                    return promise;
                };
            });
        }

    }
})();