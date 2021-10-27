import axios from "axios";

const getGuildRoles = async (serverId) => {
  let guildRoles = [];
  let rolesRaw = await axios.get(
    `https://discord.com/api/v9/guilds/${serverId}/roles`,
    {
      headers: {
        authorization: process.env.TOKEN,
        "content-type": "application/json",
      },
    }
  );
  rolesRaw.data.map(async function (role) {
    guildRoles.push({
      name: role.name,
      permissions: role.permissions,
      id: role.id,
      position: role.position,
      color: role.color,
      hoist: role.hoist,
      mentionable: role.mentionable,
    });
  });
  guildRoles.sort((a, b) => (a.position > b.position ? 1 : -1));

  return guildRoles;
};

export { getGuildRoles };
