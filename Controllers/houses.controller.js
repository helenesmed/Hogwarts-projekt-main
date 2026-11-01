import { getAllHouses, getHouseById } from "../Repository/houses.repository.js";

export async function listHouses(req, res) {
    try {
        res.status(200).json(await getAllHouses());
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}

export async function showHouse(req, res) {
    try {
        const house = await getHouseById(req.params.id);
        if (!house) {
            return res.status(404).send({ message: "House not found" });
        }
        res.status(200).json(house);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}
