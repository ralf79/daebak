/**
 * Created by system on 2014. 5. 14..
 */
var CONFIG;

(function() {

    var appPrefix = '/';
    var templateUrlPrefix = '/static/template/';
    var appVersion = 1;

    CONFIG = {

        version : appVersion,

        baseDirectory : appPrefix,
        templateDirectory : templateUrlPrefix,
        templateFileQuerystring : "?v=" + appVersion,

        routing : {
            prefix : '',
            html5Mode : false
        },

        viewUrlPrefix : templateUrlPrefix + 'views/',
        partialUrlPrefix : templateUrlPrefix + 'partials/',

        templateFileSuffix : '.html',

        prepareViewTemplateUrl : function(url) {
            var name = this.viewUrlPrefix + url + this.templateFileSuffix + this.templateFileQuerystring;
            console.log('prepareViewTemplateUrl:' + name)
            return name;
        },

        preparePartialTemplateUrl : function(url) {
            var name = this.partialUrlPrefix + url + this.templateFileSuffix + this.templateFileQuerystring;
            console.log('preparePartialTemplateUrl:' + name)
            return name;
        }

    };
})();

