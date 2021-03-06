//index,show,store,update,destroy

//Models//
const Spot = require('../models/Spot') 
const User = require('../models/User')
//======//

module.exports = {
    async show(req,res){
        const {user_id} = req.headers;
        
       const spots = await Spot.find({user: user_id});

       res.json(spots);
    }
}