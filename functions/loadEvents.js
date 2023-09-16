import fs from "fs";
import AsciiTable from "ascii-table";

async function loadEvents(client) {
  const table = new AsciiTable("Events Handler").setHeading("Events", "Status");
  await client.events.clear();

  const eventFolder = fs.readdirSync("./events");

  for (const folder of eventFolder) {
    const eventFiles = fs
      .readdirSync(`./events/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const eventFile = await import(`../events/${folder}/${file}`);
      const event = eventFile.default;
      if (event.rest) {
        if (event.once)
          client.rest.once(event.name, (...args) =>
            event.execute(...args, client)
          );
        else
          client.rest.on(event.name, (...args) =>
            event.execute(...args, client)
          );
      } else {
        if (event.once)
          client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
      }

      if (file) {
        table.addRow(file, "Loaded");
      } else {
        table.addRow(file, "Not loaded");
        continue;
      }
    }
  }

  return console.log(table.toString());
}

export default loadEvents;
