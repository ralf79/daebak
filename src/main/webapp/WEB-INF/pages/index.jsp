<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.2.0
Version: 3.2.0
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" ng-app="MyApp" ng-controller="AppCtrl">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8"/>
<title>Bulletin Board</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<%--<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>--%>
<link href="/static/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<link href="/static/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
<link href="/static/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="/static/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
<link href="/static/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css"/>
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
<link rel="stylesheet" type="text/css" href="/static/assets/global/plugins/select2/select2.css"/>
<link rel="stylesheet" type="text/css" href="/static/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="/static/assets/global/plugins/bootstrap-datepicker/css/datepicker.css"/>
<!-- END PAGE LEVEL STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
<link href="/static/assets/admin/pages/css/news.css" rel="stylesheet" type="text/css"/>
<link href="/static/assets/admin/pages/css/blog.css" rel="stylesheet" type="text/css"/>
<!-- END PAGE LEVEL STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
<link rel="stylesheet" type="text/css" href="/static/assets/global/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css"/>
<link rel="stylesheet" type="text/css" href="/static/assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css">
<link rel="stylesheet" type="text/css" href="/static/assets/global/plugins/bootstrap-summernote/summernote.css">
<!-- END PAGE LEVEL STYLES -->
<!-- BEGIN THEME STYLES -->
<link href="/static/assets/global/css/components.css" rel="stylesheet" type="text/css"/>
<link href="/static/assets/global/css/plugins.css" rel="stylesheet" type="text/css"/>
<link href="/static/assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css"/>
<link id="style_color" href="/static/assets/admin/layout/css/themes/default.css" rel="stylesheet" type="text/css"/>
<link href="/static/assets/admin/layout/css/custom.css" rel="stylesheet" type="text/css"/>
<!-- END THEME STYLES -->
<link rel="shortcut icon" href="favicon.ico"/>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<!-- DOC: Apply "page-header-fixed-mobile" and "page-footer-fixed-mobile" class to body element to force fixed header or footer in mobile devices -->
<!-- DOC: Apply "page-sidebar-closed" class to the body and "page-sidebar-menu-closed" class to the sidebar menu element to hide the sidebar by default -->
<!-- DOC: Apply "page-sidebar-hide" class to the body to make the sidebar completely hidden on toggle -->
<!-- DOC: Apply "page-sidebar-closed-hide-logo" class to the body element to make the logo hidden on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-hide" class to body element to completely hide the sidebar on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-fixed" class to have fixed sidebar -->
<!-- DOC: Apply "page-footer-fixed" class to the body element to have fixed footer -->
<!-- DOC: Apply "page-sidebar-reversed" class to put the sidebar on the right side -->
<!-- DOC: Apply "page-full-width" class to the body element to have full width page without the sidebar menu -->
<body class="page-header-fixed page-quick-sidebar-over-content" ng-view>

<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="/static/assets/global/plugins/respond.min.js"></script>
<script src="/static/assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
<script src="/static/assets/global/plugins/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="/static/assets/global/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script type="text/javascript" src="/static/assets/global/plugins/select2/select2.min.js"></script>
<script type="text/javascript" src="/static/assets/global/plugins/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/static/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="/static/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script type="text/javascript" src="/static/assets/global/plugins/bootstrap-wysihtml5/wysihtml5-0.3.0.js"></script>
<script type="text/javascript" src="/static/assets/global/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.js"></script>
<script src="/static/assets/global/plugins/bootstrap-markdown/lib/markdown.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/bootstrap-markdown/js/bootstrap-markdown.js" type="text/javascript"></script>
<script src="/static/assets/global/plugins/bootstrap-summernote/summernote.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->

<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="/static/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="/static/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="/static/assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="/static/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="/static/assets/global/scripts/datatable.js"></script>
<script src="/static/assets/admin/pages/scripts/table-ajax.js"></script>

<script src="/static/vendor/angular.js"></script>
<script src="/static/vendor/angular-loader.js"></script>
<script src="/static/vendor/angular-animate.js"></script>
<script src="/static/vendor/angular-cookies.js"></script>
<script src="/static/vendor/angular-messages.js"></script>
<script src="/static/vendor/angular-resource.js"></script>
<script src="/static/vendor/angular-route.js"></script>
<script src="/static/vendor/angular-sanitize.js"></script>
<script src="/static/vendor/ui-bootstrap-tpls-0.11.0.js"></script>


<script src="/static/js/app.js"></script>
<script src="/static/js/lib/router.js"></script>
<script src="/static/js/config/config.js"></script>
<script src="/static/js/config/routes.js"></script>
<script src="/static/js/services/common.service.js"></script>
<script src="/static/js/services/user.service.js"></script>
<script src="/static/js/services/board.service.js"></script>
<script src="/static/js/directives/user.directive.js"></script>
<script src="/static/js/directives/board.directive.js"></script>
<script src="/static/js/controllers/app.ctrl.js"></script>
<script src="/static/js/controllers/user.ctrl.js"></script>
<script src="/static/js/controllers/board.ctrl.js"></script>

<!-- END PAGE LEVEL SCRIPTS -->
<script>
    jQuery(document).ready(function() {    
//        Metronic.init(); // init metronic core components
//        Layout.init(); // init current layout
//        QuickSidebar.init(); // init quick sidebar
//        Demo.init(); // init demo features
//        TableAjax.init();
    });
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>