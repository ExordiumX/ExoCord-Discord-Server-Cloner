import dotenv from "dotenv";
import createChannel from "./wrappers/createChannel.js";
import getChannels from "./wrappers/getChannels.js";
import { sleep } from "./helpers/utils.js";
import createServer from "./wrappers/createServer.js";
import input from "input";
dotenv.config();

const main = async () => {
  let originServerId = await input.text("Enter server ID to clone");
  const createdServerId = await createServer(originServerId);
  console.log("Created server");
  const channels = await getChannels(originServerId);
  let parentChannels = channels
    .filter((channel) => channel.type === 4)
    .map((parent) => [parent]);
  parentChannels = [...parentChannels].sort((a, b) => a.position - b.position);

  parentChannels.map((parent) =>
    channels.forEach(
      (channel) => channel.parent_id === parent[0].id && parent.push(channel)
    )
  );
  const parentsAndChannels = parentChannels;

  for (let group of parentsAndChannels) {
    if (group.length > 1) {
      let parentId = null;
      for (let [index, item] of group.entries()) {
        let res = await createChannel(
          createdServerId,
          parentId,
          item.type,
          item.name,
          item.permission_overwrites
        );
        if (index === 0) parentId = res.id;
        console.log(`Created channel ${item.name}`);
      }
    } else {
      await createChannel(
        createdServerId,
        group.parent_id,
        group.type,
        group.name,
        group.permission_overwrites
      );
      console.log(`Created group ${group.name}`);
    }

    await sleep(2000);
  }
};

main();
