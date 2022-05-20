module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity("on the web 🕸️", { type: 'COMPETING' });
        client.user.setStatus('idle');
        // console.log(client.commands);
        console.log("PCN is up and ready!");
    },
};
