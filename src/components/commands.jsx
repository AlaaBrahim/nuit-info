let commands = {
	/* define each command as an object, with type either text or link, value being what is returned in the output, and context sets the state for further nested commands */
	help: () => ({
		/* if user types help, display list of commands */
		type: "text" /* type is either text or link. Add new types in terminal.jsx file */,
		/* value is what is returned in the output */
		value:
			"Available commands: \n" +
			"'websites' - view a list of Ellie's self developed websites \n" +
			"'hi' - say hello to Ellie \n" +
			"'clear' - clear the terminal \n" +
			"'socials' - view a list of Ellie's social media accounts \n" +
			"'about' - learn more about Ellie \n" +
			"'contact' - send Ellie an email \n",
		/* !todo	"'more commands", */
	}),
	about: () => ({
		type: "text",
		value:
			"Hi! My name is Ellie Kerns, I'm 30 a year old sys admin, web developer, and a nerd!. \n" +
			"I'm a full stack web developer, and I'm currently working on a lot of new projects while mastering languages like javascript, python, and C#! \n" +
			"When I'm not coding, I love making music, yes I'm also a producer, or playing video games. \n",
	}),
	hi: () => ({ type: "text", value: "Hello! :)" }),
	toutou: () => ({ type: "text", value: "Toutou is the best in the world!" }),
	ls: () => ({
		type: "text",
		value: "test1 \n test2 \n test3 \n",
	}),
	contact: () => ({ type: "link", value: "mailto:ellie@epklabs.com" }),
	websites: () => ({
		type: "text",
		value:
			"What website would you like to visit: \n" +
			"'portfolio' - Ellie's personal portfolio site \n" +
			"'docs' - Ellie's technical documentaiton \n" /* !todo +
		"website3" */,
		context: "websites",
	}),
	socials: () => ({
		type: "text",
		value:
			"What social media account would you like to visit: \n" +
			"'github' - Ellie's github account \n" +
			"'linkedin' - Ellie's linkedin account \n" +
			"'instagram' - Ellie's instagram account \n" +
			"'facebook' - Ellie's facebook account \n",
		context: "socials",
	}),
	clear: () => ({
		type: "clear",
	}) /* clear performs a window reload, and has no output */,
};

const websiteCommands = {
	/* each nested command is defined in the same way as the parent command */
	portfolio: () => ({ type: "link", value: "https://epklabs.com" }),
	docs: () => ({ type: "link", value: "https://docs.epklabs.com" }),
};

const socialsCommands = {
	github: () => ({ type: "link", value: "https://github.com/biohackerellie" }),
	linkedin: () => ({
		type: "link",
		value: "https://www.linkedin.com/in/ellie-kerns-ab1328a0/",
	}),
	instagram: () => ({
		type: "link",
		value: "https://www.instagram.com/biohacker_ellie/",
	}),
	facebook: () => ({
		type: "link",
		value: "https://www.facebook.com/elliana.kerns/",
	}),
};

// TODO : snap : clear
// TODO : change climate : u solved global warming

commands = {
	ls: () => ({ type: "text", value: "charlie.png \n" }),
	change: () => ({
		type: "text",
		value:
			"What would you like to change: \n" +
			"'color'\n" +
			"'climate'\n" +
			"'user'\n",
	}),

	"change climate": () => ({
		type: "text",
		value: "u solved global warming\n",
	}),

	"change color": () => ({
		type: "text",
		value: "u changed color\n",
	}),

	"change user": () => ({
		type: "text",
		value: "u changed user\n",
	}),

	help: () => ({
		type: "text",
		value:
			"Available commands: \n" +
			"'hi' - say hello to Earth \n" +
			"'clear' - clear the terminal \n" +
			"'joke' - get a random joke \n" +
			"'quote' - get an inspirational quote \n" +
			"'roll' - roll a virtual six-sided die \n" +
			"'emoji' - get a random emoji \n" +
			"'play' - play the air guitar \n" +
			"'weather' - get a virtual weather update \n" +
			"'change' - change settings \n" +
			"'fact' - learn an interesting fact \n" +
			"'start looking for charlie' - I dont know? \n",
	}),

	hi: () => ({ type: "text", value: "Hello! :)" }),

	clear: () => ({ type: "clear" }),

	joke: () => ({
		type: "text",
		value: "Why don't scientists trust atoms? Because they make up everything!",
	}),

	quote: () => ({
		type: "text",
		value: "In the middle of difficulty lies opportunity. - Albert Einstein",
	}),

	roll: () => ({
		type: "text",
		value: `You rolled a ${Math.floor(Math.random() * 6) + 1}.`,
	}),

	emoji: () => ({
		type: "text",
		value: "Here's a random emoji for you: 😄",
	}),

	play: () => ({
		type: "text",
		value: "Playing the air guitar...",
	}),

	weather: () => ({
		type: "text",
		value:
			"The weather today: Cloudy with a chance of virtual rain. I suggest you try to make a 'change'!",
	}),

	fact: () => ({
		type: "text",
		value:
			"Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
	}),

	charlie: () => ({
		type: "text",
		value:
			"Oh no! It appears that your system has been compromised. I am Charlie, the mightiest hacker in the world! Even if you try to gather all the 'help' available, you won't be able to track me down. Brace yourself for the challenge, and let's see if you can navigate through the commands to regain control!",
	}),

	open: () => ({
		type: "text",
		value:
			"Please enter the file name you would like to open \nExp: open file.png",
	}),

	"open charlie.png": () => ({
		type: "text",
		value: "IMPOSSIBLE! HOW DID YOU DO IT!!",
	}),
	"start looking for charlie": () => ({
		type: "text",
		value: "You can start your search!",
	}),
};

export default commands;
export { websiteCommands, socialsCommands };
