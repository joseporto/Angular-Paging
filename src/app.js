/**
 * @ngDoc module
 * @name ng.module:joseporto
 *
 * @description
 * This module is here for sample purposes
 */
angular.module('joseporto', ["joseporto.paging"]);

/**
 * @ngDoc controller
 * @name ng.module:joseporto
 *
 * @description
 * This controller is here for sample purposes
 */
angular.module('joseporto').controller('sampleCtrl', ['$scope', '$log', function($scope, $log) {

    // A function to do some act on paging click
    // In reality this could be calling a service which
    // returns the items of interest from the server
    // based on the page parameter
    $scope.DoCtrlPagingAct = function(text, page, pageSize, total) {
        $log.info({
            text: text,
            page: page,
            pageSize: pageSize,
            total: total
        });
    };

}]);
