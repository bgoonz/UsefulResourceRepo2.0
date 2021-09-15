const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let tos = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle(`Terms of Service (embedded)`)
    .addField(
      `Longer version:`,
      `click [here](https://discord.com/terms) for the base terms.`
    )
    .addField(
      `Welcome to Discord!`,
      `These terms which include and hereby incorporate the [Privacy Policy](https://discord.com/privacy) are a legal agreement between Discord Inc. and its related companies and you.`
    )
    .addField(
      `cont.`,
      ` By using or accessing the [Discord application](https://discord.com) which are collectively referred to as the “Service,” you agree:`
    )
    .addField(`1:`, `you ARE *at least* 13 years of age or older.`)
    .addField(
      `2/3:`,
      `If you are of Legal age, you have accepted these terms/If you ARE between 13 and the legal age, your parent(s)/guardian(s) have accepted these terms.`
    )
    .addField(
      `The Company reserves the right to update these Terms, which include, complying with the law/reflecting enhancements to Discord. If the changes affect usage of Discord/any legal rights, you’ll be notified no less than a week before they take effect.`,
      `Unless otherwise stated, your continued use of the Service after modifications are made will constitute your acceptance of + agreement to those changes.`
    )
    .addField(
      `RIGHTS:`,
      `The Service provides a chat and social platform. The Service may allow you to participate in public and private chat rooms and to utilize messaging features to communicate with other users of the Service. The Service may also allow you to access certain software and/or other content that is available to purchase from the Company. `
    )
    .addField(
      `Subject to your compliance with these Terms, the Company grants you a limited, revocable, non-exclusive, non-transferable,`,
      `non-sublicensable license to use and access the Service solely for your personal, non-commercial use, unless we agree to your commercial use in writing. You agree not to (and not to attempt to):`
    )
    .addField(
      `1:`,
      `Using Discord for any use or purpose other than as expressly permitted by these Terms`
    )
    .addField(
      `2:`,
      `copy, adapt, modify, prepare derivative works based upon, distribute, license, sell, transfer, publicly display, publicly perform, transmit, stream, broadcast, attempt to discover any source code, reverse engineer, decompile, disassemble, or otherwise exploit the Service or any portion of the Service, except as expressly permitted in these Terms`
    )
    .addField(
      `3:`,
      `use data mining, robots, spiders, or similar data gathering and extraction tools on the Service.`
    )
    .addField(
      `No licenses or rights are granted to you by implication `,
      `or otherwise under any intellectual property rights owned or controlled by the Company or its licensors, except for the permissions and rights expressly granted in these Terms.`
    );
  message.channel.send(tos);
};
module.exports.help = {
  name: "tos",
  category: "util",
  description: "Terms of Service.",
};
