import fs from "fs";
import AsciiTable from "ascii-table";

async function loadCommands(client) {
  const table = new AsciiTable("Commands").setHeading("Command", "Status");
  await client.commands.clear();

  const commandFolder = fs.readdirSync("../commands");

  const commandsArray = [];

  for (const folder of commandFolder) {
    const commandFiles = fs
      .readdirSync(`../commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = await import(`../commands/${folder}/${file}`);

      const properties = { folder, ...commandFile };

      client.commands.set(commandFile.data.name, properties);

      if (commandFile.data.name) {
        commandsArray.push(commandFile.data.toJSON());
        table.addRow(file, "✅".green);
      } else {
        table.addRow(file, "❌".red);
        continue;
      }
    }
  }
  client.application.commands.set(commandsArray);
  return console.log(table.toString());
}

export default loadCommands;
