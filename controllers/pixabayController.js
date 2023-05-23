const axios = require('axios');

const fetchPixabayImages = async (req, res) => {
    const { category, page} = req.query;
    const perPage = 9; // Number of items per page
    const parsedPage = parseInt(page); // Convert page to a number
    
    try {
        const encodedCategory = encodeURIComponent(category); // URL-encode the category
        let apiURL = `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${encodedCategory}&per_page=${perPage}&page=${parsedPage}&order=${req.query.order}`
        const response = await axios.get(apiURL); //results response ased on url
        const imageDataFULL = response.data.hits; //full data information, retrieved from "hits", where data is encapsulated as default
        let sortedImageData = imageDataFULL;// assigning new variable to be able to manipulate

        if (req.query.order === 'id') { // if "order" value passed from frontend is "id":
            sortedImageData = imageDataFULL.sort((a, b) => a.id - b.id);  // Sort images by ID
        } 

        res.setHeader('Cache-Control', 'no-store'); //just in case cached results want to show up
        res.json({ //method is used to send a JSON response from server to the client
            page: parsedPage, //page number
            perPage: perPage, //images per page
            totalItems: response.data.totalHits, //total number of images
            totalPages: Math.ceil(response.data.totalHits / perPage), //total number of pages
            data: sortedImageData, //main data
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { fetchPixabayImages };