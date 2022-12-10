import { rest } from "msw";

export const handlers = [
  rest.get("https://thesimpsonsquoteapi.glitch.me/quotes", (req, res, ctx) => {
    const invalidCharacterTest = req.url.searchParams.get("character") == "Mauricio Boye";
    const characterQuoteTest = req.url.searchParams.get("character") == "Milhouse Van Houten";
    if(invalidCharacterTest){
      return res(
        ctx.status(403)
      );
    }
    if(characterQuoteTest){
      return res(
        ctx.json([{
          quote:"But my mom says I'm cool.",
          character:"Milhouse Van Houten",
          image:"https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMilhouseVanHouten.png?1497567513002",
          characterDirection:"Right"}])
      );
    }
    return res(
      ctx.json([{
        quote:"Thank you. Come again.",
        character:"Apu Nahasapeemapetilon",
        image:"https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FApuNahasapeemapetilon.png?1497567511629",
        characterDirection:"Left"}])
    );
  }
  )
];