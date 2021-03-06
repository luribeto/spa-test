'use strict';

angular.module('confusionApp')
    .constant("baseURL","http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {

        this.getDishes = function(){
            return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
        };

        // implement a function named getPromotion
        // that returns a selected promotion. 
        this.getPromotion = function(){
            return $resource(baseURL+"promotions/0", null, {'update': {method:'PUT'}});
        };
              
    }])

    .factory('corporateFactory', function() {

        var corpfac = {};


        corpfac.getLeaders=function(){
          return $resource(baseURL + "leadership/:id", null, {'update':{method:'PUT'}});
        };

        return corpfac;
    })

    .service('feedbackFactory', ['$resource','baseURL', function($resource,baseURL) {

        this.getfeedback=function(){
          return $resource(baseURL + "feedback/:id");
        };
    }]);