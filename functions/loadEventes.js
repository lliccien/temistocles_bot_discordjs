import fs from "fs";
import AsciiTable from "ascii-table";

async function loadEvents(client) {
  const table = new AsciiTable("Events Handler").setHeading("Events", "Status");
  await client.events.clear();

  const eventFolder = fs.readdirSync("../events");

  for (const folder of eventFolder) {
    const eventFiles = fs
      .readdirSync(`../events/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const eventFile = await import(`../events/${folder}/${file}`);

      if (eventFile.rest) {
        if (eventFile.once)
          client.rest.once(eventFile.name, (...args) =>
            eventFile.execute(...args, client)
          );
        else
          client.rest.on(eventFile.name, (...args) =>
            eventFile.execute(...args, client)
          );
      } else {
        if (eventFile.once)
          client.once(eventFile.name, (...args) =>
            eventFile.execute(...args, client)
          );
        else
          client.on(eventFile.name, (...args) =>
            eventFile.execute(...args, client)
          );
      }

      if (file) {
        table.addRow(file, "✅".green);
      } else {
        table.addRow(file, "❌".red);
        continue;
      }
    }
  }

  return console.log(table.toString());
}

export default loadEvents;
