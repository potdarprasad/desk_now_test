class HomeController{
    /**
     * Method To Render Home Page
     * @param {*} req 
     * @param {*} res 
     */
    renderPage = (req, res) => {
        return res.render('home/index');
    };
}

module.exports = new HomeController();