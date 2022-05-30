const { MessageAttachment } = require('discord.js');
const fs = require('fs');
const { registerFont, createCanvas, loadImage } = require('canvas');

const colors = ['#00FFFF', '#FF00FF', '#fff', '#FFFF00', '#00FF00', '#FFA500',];

function sendMessage(msgObj, message) {
    msgObj.reply(message)
        .then(() => console.log(`Replied to message ${msgObj.content}`))
        .catch(err => console.err);
}

function deleteMessage(msgObj) {
    msgObj.delete();
}

function messageHandler(message) {
    if(message.content.toLowerCase() === 'iama' && message.channel.id === "980787684391915520"){
        const user = message.author.member;
        sendMessage(message, `Okay, you are added.`);
        roleManager(user, "974722363386122280", true, true);
    }else if (message.content.toLowerCase() === 'hello') {
        sendMessage(message, `Hi @${message.author.username}`);
    }else if(message.content.toLowerCase() === 'invite'){
        message.reply(`The public invitation link for this server is https://discord.gg/rpudFRTBJj`).then(msg => setTimeout(() => msg.delete(), 25000));
    } else if (message.content.toLowerCase() === 'how are you?') {
        message.react('❤️');
        sendMessage(message, "I'm good! What about you?");
    }
    if (message.author.username === 'Angry〆Mental' || message.author.username === '!    HiddenFigure🔆') {
        if (message.content === 'addRole')
            roleManager(message.member, "Select Your Roles", true);
        else if (message.content === 'removeRole')
            roleManager(message.member, 'Select Your Roles', false);
        else if (message.content === 'constructImage')
            constructImageAndSend(message.member.user, message.channel, 'Goodbye', 'Testing');
        else if (message.content === 'sendMessage') {
            const channel = message.guild.channels.cache.get('974724504825774161');
            let msg = channel.send("HADAHSDAHDHA");
        } else console.log(message.content);
        return;
        console.log(message.author.avatarURL({ 'format': 'png', 'size': 256 }));
        constructImageAndSend(message.author, message.channel);

    }
}

async function fetchAllMessages(channel) {
    let messages = [];

    // Create message pointer
    let message = await channel.messages.fetch({ limit: 1 })
        .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

    while (message) {
        await channel.messages.fetch({ limit: 100, before: message.id })
            .then(messagePage => {
                messagePage.forEach(msg => messages.push(msg));

                // Update our message pointer to be last message in page of messages
                message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
            })
    }

    console.log(messages.length);  // Print all messages
    return messages;
}

async function deleteMessages(channel, amount) {
    console.log('amount', amount);
    let messages;
    if (amount != 'all')
        messages = await channel.messages.fetch({ limit: amount });
    else
        messages = await fetchAllMessages(channel);


    let { size } = messages;
    if (!size) size = messages.length;
    messages.forEach(msg => msg.delete());
    return size;
}


async function constructImageAndSend(memberObj, channel, upper = "Welcome", tagline = "Have a great journey!") {

    // Retrieves all banners from wc-banner folder
    const banners = fs.readdirSync('./assets/images/wc-banner')
        .filter(file => file.endsWith('.png'));
    // select a banner randomly
    const selectedImage = banners[Math.floor(Math.random() * banners.length)];

    const img = loadImage(`./assets/images/wc-banner/${selectedImage}`).then(image => {

        //default avatar
        let avatarURL = 'https://siteforsuccess.com/JS/pcn_images/discord.jpg';
        if (memberObj.avatar)
            // get user avatar
            avatarURL = memberObj.avatarURL({ 'format': 'png', 'size': 256 });

        loadImage(avatarURL).then(avatarImage => {
            // Generate 4 random color index
            let randomColorIndex = new Set()
            const getRandom = () => { return Math.floor(Math.random() * colors.length) };
            randomColorIndex.add(getRandom());
            while (randomColorIndex.size < 4) {
                randomColorIndex.add(getRandom());
            }
            randomColorIndex = Array.from(randomColorIndex);

            // Register fonts
            registerFont('./assets/fonts/code2000.ttf', { family: 'CODE2000' })
            registerFont('./assets/fonts/Impacted2.ttf', { family: 'Impacted2' })

            // Banner Image
            const width = image.width;
            const height = image.height;

            // create canvas
            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');

            // Draw Banner Image
            context.drawImage(image, 0, 0, width, height);

            context.font = 'bold 50px "Calibri"';
            const text1Width = canvas.context.measureText(upper).width;
            context.fillStyle = colors[randomColorIndex[0]];
            context.fillText(upper, parseInt((width - text1Width) / 2), 100);


            // Styling of the text under the avatar circle
            context.font = 'bold 40px "CODE2000"';
            context.textAlign = 'left';
            context.textBaseline = 'top';
            const username = memberObj.username;
            // console.log(username);
            const textWidth = context.measureText(username).width;

            context.fillStyle = colors[randomColorIndex[1]];
            context.fillText(username, parseInt((width - textWidth) / 2), 320);

            context.fillStyle = colors[randomColorIndex[2]];
            context.font = 'bold 50px Impacted2';
            const greetingWidth = context.measureText(tagline).width;
            context.fillText(tagline, parseInt((width - greetingWidth) / 2), 370);


            // Draw the circle around the avatar
            context.beginPath();
            const centerX = parseInt(width / 2);
            const centerY = parseInt(height / 2);
            const radius = 95;
            const startAngle = 0;
            const endAngle = Math.PI * 2;
            context.arc(centerX, centerY, radius, startAngle, endAngle);
            context.closePath();
            context.clip();

            // Draw the avatar image into the circle
            const avatarImageWidth = avatarImage.width;
            const avatarImageHeight = avatarImage.height;
            // console.log(avatarImageWidth, avatarImageHeight);
            context.drawImage(avatarImage, centerX - 95, centerY - 95, avatarImageWidth * .75, avatarImageHeight * .75);

            //Stroke of the circle
            context.strokeStyle = colors[randomColorIndex[3]];
            context.lineWidth = 12;
            context.stroke();
            context.restore();

            // the actual constructed image
            const buffer = canvas.toBuffer('image/png');
            try {
                const filePath = './assets/images/bannerWithAvatar.png';

                // save the buffer to a image file
                fs.writeFileSync(filePath, buffer);

                const attachments = new MessageAttachment(filePath);
                let message = `Huh! ${username} has just left us`;

                if (upper.toLowerCase() == 'welcome')
                    message = `Welcome <@${memberObj.id}>,\nFor detailed guide please visit <#974719552929796108> and follow.`;

                channel.send({ files: [attachments], content: message });
                return true;
            }
            catch (e) { return false; }
        })
    });
}

// Adding a role while joining the server
function roleManager(member, theRole, addRole = true, isId = false) {
    let role = theRole;
    let memberHasRole = false;

    if (!isId) {
        role = member.guild.roles.cache.find(role => role.name == theRole);
        role = role.id;
        console.log("Role", role);
    }
    if (member.roles.cache.some(rol => rol.id === role)) {
        memberHasRole = true;
        console.log(addRole, memberHasRole, isId);
        console.log(`"${member.nickname} "already has role "${role.name}"`);
        if (addRole) return;
    }
    // addRole true means add.
    if (addRole) {
        if (role) {
            member.roles.add(role);
            console.log(`Successfully added "${role.name ? role.name : role}" to "${member.nickname}"`);
        }
    } else if (memberHasRole) {
        let check = member.roles.remove([role]);
        if (check) console.log(`Successfully removed "${role.name ? role.name : role}" form ${member.nickname}`);
    }
}


module.exports = { sendMessage, messageHandler, fetchAllMessages, deleteMessages, constructImageAndSend, roleManager }