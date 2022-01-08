const ApiRes = require("../../helpers/apiRes");
const Booking = require("../../models/booking.md");

class BookingController {
  /**
   * Method To Get List Of Bookings
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getBookings = async (req, res) => {
    try {
      const { page, limit } = req.params;

      const pagination = {
        currentPage: parseInt(page),
        recordsPerPage: limit,
        totalCount: 0,
        skip: (parseInt(page) - 1) * limit,
        limit: limit,
      };

      pagination.totalRecords = await Booking.count();

      const bookings = await Booking.find({}, { _id: 0 })
        .lean()
        .read("sp")
        .skip(pagination.skip)
        .limit(pagination.limit);

      //Add Next Page To Pagination If Data For Next Page Exist
      pagination.nextPage =
        pagination.totalRecords <=
        pagination.currentPage * pagination.recordsPerPage
          ? null
          : pagination.currentPage + 1;

      //Get Total Number Of Pages For Pagination
      pagination.totalPages =
        pagination.totalRecords % pagination.recordsPerPage != 0
          ? parseInt(pagination.totalRecords / pagination.recordsPerPage) + 1
          : pagination.totalRecords / pagination.recordsPerPage;

          
      return ApiRes.successResponseWithData(res, "Bookings List", {
        bookings,
        pagination,
      });
    } catch (err) {
      console.log(err.message);
      return ApiRes.ErrorResponse(res, err.message);
    }
  };
}

module.exports = new BookingController();
