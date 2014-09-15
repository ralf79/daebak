/**
 * Created by system on 2014. 5. 14..
 */
angular.module('MyApp.Routes', [])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        if(CONFIG.routing.html5Mode) {
            $locationProvider.html5Mode(true);
        }
        else {
            var routingPrefix = CONFIG.routing.prefix;
            if(routingPrefix && routingPrefix.length > 0) {
                $locationProvider.hashPrefix(routingPrefix);
            }
        }

//        ROUTER.when('login_path', '/login', {
//            controller : 'UserCtrl',
//            templateUrl : CONFIG.prepareViewTemplateUrl('login')
//        });

        ROUTER.when('board_list_path', '/board/list', {
            controller : 'BoardListCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('board-list')
        });
        ROUTER.when('board_view_path', '/board/view/:id', {
            controller : 'BoardViewCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('board-view')
        });
        ROUTER.when('board_add_path', '/board/add', {
            controller : 'BoardAddCtrl',
            templateUrl : CONFIG.prepareViewTemplateUrl('board-add')
        });


//        ROUTER.alias('home_path', 'board_add_path');

        ROUTER.otherwise({
            redirectTo : '/board/add'
        });

        ROUTER.install($routeProvider);
    }])

    .run(['$rootScope', '$location', function($rootScope, $location) {
        var prefix = '';
        if(!CONFIG.routing.html5Mode) {
            prefix = '#' + CONFIG.routing.prefix;
        }
        $rootScope.route = function(url, args) {
            return prefix + ROUTER.routePath(url, args);
        };

        $rootScope.r = $rootScope.route;

        $rootScope.c = function(route, value) {
            var url = ROUTER.routePath(route);
            if(url == $location.path()) {
                return value;
            }
        };
    }])
;
