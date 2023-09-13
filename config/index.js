import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envVarsSchema = joi.object({
  NODE_ENV: joi
    .string()
    .allow("development", "production", "test", "provision")
    .required(),
  DISCORD_TOKEN: joi.string().required(),
});

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error && !error.message.includes("NVM_INC")) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  discordToken: envVars.DISCORD_TOKEN,
};

export default config;
