import  Mother from "../models/kitchenModel.js" ;

export const handleFetchNearByMothers = async (req, res) =>{

    try {
        const { latitude, longitude } = req.query;
    
        if (!latitude || !longitude) {
          return res.status(400).json({ error: "Latitude and Longitude are required" });
        }
    
        const nearbyMothers = await Mother.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
              },
              distanceField: "distance",
              maxDistance: 4000, // 4 km radius
              spherical: true,
              query: { isActive: true }
            }
          }
        ]);
    
        res.status(200).json({ success: true, data: nearbyMothers });
      } catch (error) {
        console.error("Error fetching nearby mothers:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }


}