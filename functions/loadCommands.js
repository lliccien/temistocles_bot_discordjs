import fs from "fs";
import AsciiTable from "ascii-table";

async function loadCommands(client) {
  const table = new AsciiTable("Commands").setHeading("Command", "Status");
  await client.commands.clear();

  const commandFolder = fs.readdirSync("./commands");

  const commandsArray = [];

  for (const folder of commandFolder) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = await import(`../commands/${folder}/${file}`);

      const command = commandFile.default;

      if ("data" in command && "execute" in command) {
        const properties = { folder, ...command };
        client.commands.set(command.data.name, properties);
      } else {
        console.log(
          `[WARNING] The command at ../commands/${folder}/${file} is missing a required "data" or "execute" property.`
        );
      }

      if (command.data.name) {
        commandsArray.push(command.data.toJSON());
        table.addRow(file, "Loaded");
      } else {
        table.addRow(file, "Not loaded");
        continue;
      }
    }
  }
  client.application.commands.set(commandsArray);
  return console.log(table.toString());
}

export default loadCommands;
