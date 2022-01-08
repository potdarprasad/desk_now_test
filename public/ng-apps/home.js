const app = angular.module("homeScreenApp", []);

// Service For Google Map Functions
app.service("googleMapsService", function () {
  // Method To Create Marker
  this.getMarker = function (map, title, color, coordinate, markerType) {
    return new google.maps.Marker({
      icon: {
        path: google.maps.SymbolPath[markerType],
        strokeColor: color,
        scale: 5,
      },
      map: map,
      position: new google.maps.LatLng(
        coordinate.longitude,
        coordinate.latitude
      ),
      title: title,
    });
    // return this.marker;
  };
});

app.controller("homeScreenAppCtrlr", [
  "$scope",
  "$http",
  "googleMapsService",
  ($scope, $http, googleMapsService) => {
    //  Empty LatLngBounds object to allow map to automatically compute center of map
    const bounds = new google.maps.LatLngBounds();
    const winInfo = new google.maps.InfoWindow();
    $scope.title = "Home Screen";
    $scope.bookings = [];
    $scope.hosts = [];

    // Method To Get All Bookings
    $scope.getBookings = async () => {
      try {
        let pageNum = 1,
          limit = 20,
          bookings = [];
        while (1) {
          let res = await $http.get(`/api/bookings/${pageNum}/${limit}`);
          bookings = res.data.data.bookings;
          $scope.bookings.push(...bookings);
          pageNum = res.data.data.pagination.nextPage;
          if (!pageNum) break;
        }

        addDataToMap("bookings", $scope.bookings);
      } catch (err) {
        console.log("err", err);
      }
    };

    // Method To Get All Hosts
    $scope.getHosts = async () => {
      try {
        let pageNum = 1,
          limit = 20,
          hosts = [];
        while (1) {
          let res = await $http.get(`/api/hosts/${pageNum}/${limit}`);
          hosts = res.data.data.hosts;
          $scope.hosts.push(...hosts);
          pageNum = res.data.data.pagination.nextPage;
          if (!pageNum) break;
        }

        addDataToMap("hosts", $scope.hosts);
      } catch (err) {
        console.log("err", err);
      }
    };

    $scope.getBookings();
    $scope.getHosts();

    // Google Map Options
    const googleMapOption = {
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    // Set-up google map
    $scope.gMap = new google.maps.Map(
      document.getElementById("map"),
      googleMapOption
    );

    //Method To Edir
    function edit() {
      alert("hey");
    }

    // Method To Setup Markers On Map
    const addMarkerOnMap = (
      type,
      title,
      color,
      coordinate,
      markerType,
      info
    ) => {
      let marker = googleMapsService.getMarker(
        $scope.gMap,
        title,
        color,
        coordinate,
        markerType
      );

      //extend the bounds to include each marker's position
      bounds.extend(marker.position);

      // Show Marker Details On Hover
      marker.addListener("mouseover", (event) => {
        winInfo.setContent(
          `<div class='container-fluid'>
              <h5>Name: <span class="text-info">${info.name}</span></h5>
              ${
                type === "hosts"
                  ? `<h6>Address: <span class="text-info">${info.address}</span></h6>
              <h6>Property: <span class="text-info">${info.property}</span></h6>`
                  : ""
              }
              <h6>Status: <span class="text-info">${info.status}</span></h6>
          </div>`
        );
        winInfo.setPosition(event.latLng);
        winInfo.open({
          anchor: marker,
          map: $scope.gMap,
          shouldFocus: true,
        });
      });
    };

    // Method To Add Data To Map
    const addDataToMap = (type, data) => {
      const markerType = type === "hosts" ? "FORWARD_OPEN_ARROW" : "CIRCLE";
      for (const item of data) {
        let color, info;
        if (type === "hosts") {
          color = item.status === "Active" ? "red" : "blue";
          info = {
            id: item.id,
            name: item.hostName,
            address: item.address,
            property: item.property,
            status: item.status,
          };
        } else {
          color = item.status === "Booked" ? "red" : "blue";
          info = {
            id: item.id,
            name: item.name,
            status: item.status,
          };
        }
        addMarkerOnMap(
          type,
          info.name,
          color,
          item.coordinate,
          markerType,
          info
        );
      }

      //now fit the map to the newly inclusive bounds
      $scope.gMap.fitBounds(bounds);
    };
  },
]);
