(function() {
    'use strict';
    angular
        .module('ngAdvancedForm',[])
        .config(['$provide', ngCauseValidation]);

    function ngCauseValidation($provide) {
        $provide.decorator('formDirective', [
            '$delegate', '$q', formDirectiveOverride
        ]);
        $provide.decorator('ngFormDirective', [
            '$delegate', '$q', formDirectiveOverride
        ]);
    }

    function formDirectiveOverride($delegate, $q) 
    {
        var controllerFactory = $delegate[0].controller;
        $delegate[0].controller = function (element, attrs)
        {
            var form = this;
            if (attrs.ngFormIsolateValidation == "true") {
                var obj = element.parent().data("$formController");
                element.parent().data("$formController", {
                    $addControl: angular.noop,
                    $$renameControl: function(control, name) { control.$name = name; },
                    $removeControl: angular.noop,
                    $setValidity: angular.noop,
                    $setDirty: angular.noop,
                    $setPristine: angular.noop,
                    $setSubmitted: angular.noop
                });
                controllerFactory.apply(this, arguments);

                if (obj)
                    element.parent().data("$formController", obj);
                else
                    $.removeData(element.parent(), "$formController");
            }
            else
                controllerFactory.apply(this, arguments);

            form.validate = function() {
                var promisesArr = [];
                var forAlldefer = $q.defer();
                for (var i in form) {
                    if (i.charAt(0) != '$' && "$validate" in form[i]) {

                        form[i].$commitViewValue();
                        form[i].$setDirty();
                        form[i].$validate();

                        //if (form[i].$invalid)
                        //    break;

                        for (var vld in form[i].$asyncValidators) {
                            if (form[i].$asyncValidators[vld] && form[i].$asyncValidators[vld].$asyncPromise)
                                promisesArr.push(form[i].$asyncValidators[vld].$asyncPromise);
                        }
                    }
                }
                if (promisesArr.length == 0) {
                    forAlldefer.resolve(form.$valid);
                } else {
                    var alldefer = $q.all(promisesArr);
                    alldefer.then(function() {
                        forAlldefer.resolve(form.$valid);
                    }, function() {
                        forAlldefer.resolve(form.$valid);
                    });
                }
                return forAlldefer.promise;
            };
        };
        $delegate[0].controller.$inject = controllerFactory.$inject;

        return $delegate;
    }
})();