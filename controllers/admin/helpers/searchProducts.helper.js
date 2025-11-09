module.exports = (query) => {
    const searchObject = {};
    
    if(query.keyword) {
        const regex = new RegExp(query.keyword, "i");
        searchObject.title = regex;
    }

    return searchObject;  // Chỉ return object chứa điều kiện tìm kiếm
};