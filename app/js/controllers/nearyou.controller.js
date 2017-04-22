(function() {
  'use strict';

  angular
    .module('appMaps')
    .service('dataService', dataService)
    .controller('nearyouController',nearyouController);


  /** @ngInject */
  function nearyouController(dataService) {
      var scope = this;
      scope.postcode = '';
      scope.searchDone = false;
      scope.search = function () {

          if (!scope.postcode || scope.postcode.length==0) {
            return
          }
          scope.isLoading = true;
          dataService
              .getNearLocations(scope.postcode)
              .success(function(result){
                  scope.results =  result;
                  showMap(result)
                  scope.isLoading = false;
                  scope.searchDone = true;
                  
              }) 
              .error(function(error){
                  console.log(error);
                  scope.isLoading = false;
                  return; 
              });

      };
    
    function showMap(endpoint){
      
        
        scope.map = {
            center: {
              latitude: endpoint.data[0].latitude,
              longitude: endpoint.data[0].longitude
            },
            zoom: 8,
            markersEvents: {
              click: function(marker, eventName, model, args) {
                scope.map.window.model = model;
                scope.map.window.show = true;
              }
            },
            window: {
              marker: {},
              show: false,
              closeClick: function() {
                this.show = false;
              },
              options: {},
            
            }
          
        }; 

        scope.options = {
          scrollwheel: true
        };

        scope.maxDepth = 0;
        var createMarker = function(i, bounds, idKey) {
          
          if (idKey === undefined) {
            idKey = "id";
          }
    
          var latitude = endpoint.data[i].latitude;
          var longitude = endpoint.data[i].longitude;
          var title = endpoint.data[i].name;
          
           var templateParameter = {
            name:       endpoint.data[i].name,
            address:    endpoint.data[i].address1,
            town:       endpoint.data[i].town_city,
            postcode:   endpoint.data[i].postal_code,
            phone:  endpoint.data[i].telephone
          }


          var ret = {
            latitude: latitude,
            longitude: longitude,
            info: templateParameter
          };

          ret[idKey] = i;
          return ret;
        };
        var markers = [];
        for (var i = 0; i < endpoint.data.length; i++) {
         
          var marker = createMarker(i);
          markers.push(marker);
        }
        
        scope.markers = markers;
      
    }
  }
})();

function dataService($http){
    var service = {
        getNearLocations: getNearLocations
    }
    console.log('its dataService loaded');
    return service;

    function getNearLocations(postcode){
        console.log('its dataService.getNearLocations');
        return $http({
            method: 'GET',
            url: 'https://d3p7q99ocgfmj6.cloudfront.net/v2/lookup/retailers/mercedes?index=haversine',
            params: {
                limit: 5,
                postcode: postcode.replace(/\s/g, '').toUpperCase()
            }
        });
    }
}