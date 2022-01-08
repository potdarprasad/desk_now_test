const Bookings = require("../../data/bookings.json").poiList;
const Hosts = require("../../data/hosts.json").placemarks;
const Booking = require("../../models/booking.md");
const Host = require("../../models/host.md");
const ApiRes = require("../../helpers/apiRes");

class DataLoaderController {
  /**
   * Method To Save Bookings Data To Database
   * @param{Object} req
   * @param{Object} res
   */
  saveBookings = async (req, res) => {
    try {
      for (let i = 0, j = Bookings.length, chunk = 50; i < j; i += chunk) {
        let data = Bookings.slice(i, i + chunk);
        await Booking.insertMany(data, { ordered: false, silent: true });
      }

      return ApiRes.successResponse(res, "Bookings Saved Successfully");
    } catch (err) {
      return ApiRes.ErrorResponse(res, err.message);
    }
  };

  /**
   * Method To Save Hosts Data To Database
   * @param{Object} req
   * @param{Object} res
   */
  saveHosts = async (req, res) => {
    try {
      for (let i = 0, j = Hosts.length, chunk = 50; i < j; i += chunk) {
        let data = Hosts.slice(i, i + chunk);
        for (let item of data) {
          item.coordinate = {
            latitude: item.coordinates[1],
            longitude: item.coordinates[0],
          };
          delete item.coordinates;
        }
        await Host.insertMany(data, { ordered: false, silent: true });
      }

      return ApiRes.successResponse(res, "Hosts Saved Successfully");
    } catch (err) {
      return ApiRes.ErrorResponse(res, err.message);
    }
  };
}

module.exports = new DataLoaderController();
