import axios from "axios";

export default async function (serverId) {
  const { data: channels } = await axios.get(
    `https://discord.com/api/v8/guilds/${serverId}/channels`,
    {
      headers: {
        authorization: process.env.TOKEN,
        "content-type": "application/json",
      },
    }
  );
  return channels;
}
