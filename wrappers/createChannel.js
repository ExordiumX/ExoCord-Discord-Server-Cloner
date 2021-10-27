import axios from "axios";

export default async function (
  serverId,
  parent_id = null,
  type,
  name,
  permission_overwrites
) {
  try {
    const { data } = await axios.post(
      `https://discord.com/api/v9/guilds/${serverId}/channels`,
      {
        type,
        name,
        permission_overwrites,
        parent_id,
      },
      {
        headers: {
          authorization: process.env.TOKEN,
          "content-type": "application/json",
        },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}
