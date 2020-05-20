export const getListingData = async (id) => {
    try {
        let response = await fetch("https://vrad-api.herokuapp.com/api/v1/listings/" + id)
        let data = await response.json()
        return data
    } 
    catch(e) {
        console.error(e);
    }
}

export const getAreas = async () => {
    try {
        let response = await fetch("https://vrad-api.herokuapp.com/api/v1/areas")
        let data = await response.json()
        return data
    } catch(e) {
        console.error(e);
    }
}

export const getAreaData = async () => {
    try {
        let areas = await getAreas()
        return Promise.all(
            areas.areas.map((area) =>
              fetch(
                "https://vrad-api.herokuapp.com" + area.details
              ).then((response) => response.json())
            )
        );
    } catch(e) {
        console.error(e);
    }
}

export const getFaveListings = async (favorites) => {
    try {
        let response = await Promise.all(
             favorites.map(async (favId) => {
              let fave =  await fetch("https://vrad-api.herokuapp.com/api/v1/listings/" + favId)
              return fave.json()
             } )
           )
         return response
    } catch(e) {
        console.error(e);
    }
}

export const getAreaListings = async (area) => {
    try {
        let response = await fetch("https://vrad-api.herokuapp.com/api/v1/areas/" + area)
        let data = await response.json()
        let allListings = await Promise.all(
              data.listings.map( async (listing) => {
                  let singleListing = await fetch("https://vrad-api.herokuapp.com" + listing).then((response) =>
                    response.json()
                    )
                    return singleListing
                })
            )
        return allListings
    } catch(e) {
        console.error(e);
    }
}