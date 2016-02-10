var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope', '$http',
	function($scope, $http){
		$scope.IsResultVisible = false;
		$scope.shortenedURLs = [];
		
		var customFlag = false;
		if($scope.customURL.name != ""){
			customFlag = true;
			var pattern = new RegExp("[a-zA-Z0-9]{8}$/A");
			if(!pattern.test($scope.customURL.name))
			$scope.myForm.$invalid = true;
			}
		$scope.shortenURL = function() {
			$scope.myForm.$invalid = true;

			var longURL = $scope.longURL.name;
			var duplicate = false;

			for(var i in $scope.shortenedURLs){
				if($scope.shortenedURLs[i].longURL == longURL) {
					duplicate = true;
					$scope.longURL.name = "";
				}
			}

			if(!duplicate) {
				
				var data = {
						longURL : $scope.longURL.name,
						customFlag : customFlag,
						customURL : $scope.customURL.name
					}
				$http.post('/longURL', data).success(function(response) {
					var tLongURL = "";
					if(longURL.length > 80) {
						tLongURL = longURL.substring(0, 80) + "...";
					} else {
						tLongURL = longURL;
					}
					var shortURL = response;

					$scope.shortenedURLs.push({longURL:longURL, tLongURL:tLongURL, shortURL:shortURL});	

					$scope.IsResultVisible = true;
					$scope.longURL.name = "";
				});
			}
    	}

	    $http.get('/analytics').success(function(data) {
            $scope.analyticsData = data;
        }).error(function(data) {
            console.log('Error: ' + data);
            
        });

        $scope.showDetails = function(shortURL) {
        	$scope.analyticsCheck = shortURL;
        	shortURL = { 'shortURL': shortURL };
        	$http.post('/analyticsByURL', shortURL).success(function(response) {

				$scope.clientBrowser = [];
				$scope.clientCountry = [];
				$scope.clientDevice = [];
				$scope.clientDeviceType = [];
				$scope.clientIP = [];
				$scope.clientOS = [];

				response.forEach(function(obj) {

				    obj.forEach(function(data) {

				    	if(data.clientBrowser) {
				    		$scope.clientBrowser.push({clientBrowser:data.clientBrowser, count:data.count});
				    	} else if(data.clientCountry) {
				    		$scope.clientCountry.push({clientCountry:data.clientCountry, count:data.count});
				    	} else if(data.clientDevice) {
				    		if(data.clientDevice == "undefined undefined") {
				    			$scope.clientDevice.push({clientDevice:"Other", count:data.count});
				    		} else {
				    			$scope.clientDevice.push({clientDevice:data.clientDevice, count:data.count});
				    		}
				    	} else if(data.clientDeviceType) {
				    		$scope.clientDeviceType.push({clientDeviceType:data.clientDeviceType, count:data.count});
				    	} else if(data.clientIP) {
				    		$scope.clientIP.push({clientIP:data.clientIP, count:data.count});
				    	} else if(data.clientOS) {
				    		$scope.clientOS.push({clientOS:data.clientOS, count:data.count});
				    	}
					});

				});
			}).error(function(response) {
	            console.log('Error: ' + response);
	        });
        }

	}
]);
