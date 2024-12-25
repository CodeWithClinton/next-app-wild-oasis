import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service"

export async function GET(request, {params}){

    const { cabinID} = params
    try{
        const [cabins, bookedDates] = await Promise.all([getCabin(cabinID), getBookedDatesByCabinId(cabinID)])
        return Response.json({cabins, bookedDates})
    }

    catch{
        return Response.json({message: "Cabin not found"})
    }
}

