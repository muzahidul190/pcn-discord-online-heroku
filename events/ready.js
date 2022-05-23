
//Codes for member count
const memberCount = require('../member-count.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity("the web 🕸️", { type: 'COMPETING' });
        client.user.setStatus('idle');
        // console.log(client.commands);
        console.log("PCN is up and ready!");

        
        memberCount(client);
    },
};
