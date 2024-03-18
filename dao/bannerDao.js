const bannerModel = require('./model/bannerModel')

module.exports.findBannerDao = async function() {
    return await bannerModel.findAll()
}

module.exports.updateBannerDao = async function(bannerArr) {
    await bannerModel.destroy({
        truncate: true
    })
    await bannerModel.bulkCreate(bannerArr)
    return await bannerModel.findAll()
}
