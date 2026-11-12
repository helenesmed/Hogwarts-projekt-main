import { getAllHouses, getHouseById } from "../Repository/houses.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";

export async function listHouses(req, res, next) {
    try {
        res.status(200).json(await getAllHouses());
    } catch (error) {
        next(error);
    }
}

export async function showHouse(req, res, next) {
    try {
        const id = req.params.id;
        if (!/^[1-9]\d*$/.test(id) || Number(id) > 2147483647) {
            throw new HTTPError(400, "House id must be a positive integer");
        }

        const house = await getHouseById(id);
        if (!house) {
            throw new HTTPError(404, "House not found");
        }
        res.status(200).json(house);
    } catch (error) {
        next(error);
    }
}
