import { Response, Request, Router } from "express";
import { swapiClient } from "..";
import { Types, Models } from "lifeway-coding-challenge-shared";

const router = Router();

router.post("/people/get/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id) as Types.ResourceIdentifier;

  const body = req.body as Types.ResourceGetRequest<Models.Application.PersonIncludes>;

  const resource = await swapiClient.getPerson(id, body.includes);

  if (!resource) return res.status(404).json(null);

  else return res.status(200).json(resource);
});

router.post("/people/search", async (req: Request, res: Response) => {
  const body = req.body as Types.ResourceSearchRequest<Models.Application.PersonIncludes>;

  const resource = await swapiClient.searchPeople(body.search, body.includes);

  return res.status(200).json(resource);
});

export default router;
