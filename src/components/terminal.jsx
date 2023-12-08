import "../index.css";
import commands, { websiteCommands, socialsCommands } from "./commands";
import { useState, useRef, useEffect } from "react";
import charlie_image from "../assets/charlie.png";

function Terminal() {
	/* set default states for blank input and initial output message */
	const [input, setInput] = useState("");
	const [output, setOutput] = useState(
		"Hi! We are thrilled to have you here with us! Type 'help' for a list of commands."
	);
	const inputRef = useRef();
	const [commandContext, setCommandContext] = useState(null);
	const [history, setHistory] = useState([]);
	const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
	const [username, setUsername] = useState("user");
	const [changeClimate, setChangeClimate] = useState(false);
	const [background, setBackground] = useState("bg-primary");
	const [charlie, setCharlie] = useState(false);
	const [charlieSolved, setCharlieSolved] = useState(false);
	const [isStarting, setIsStarting] = useState(false);
	const [endTime, setEndTime] = useState(false);
	useEffect(() => {
		inputRef.current.focus();
	}, []);
	useEffect(() => {
		let timer;

		if (endTime) {
			setCharlie(true);
			alert(
				"You have been hacked! But the hacker left a trace on your system! The Antivirus has detected a new file called charlie.png, type 'open charlie.png' to view it."
			);

			return;
		}

		if (isStarting) {
			// Start the timer when isStarting becomes true
			timer = setTimeout(() => {
				// Alert if the time exceeds 4 minutes

				setEndTime(true);
				// Reset the timer and state
				setIsStarting(false);
			}, 4 * 60 * 1000); // 4 minutes in milliseconds
		}

		return () => {
			// Clear the timer when the component unmounts or isStarting becomes false
			clearTimeout(timer);
		};
	}, [isStarting, endTime]);

	return (
		<div /* on click, focus on input */
			onClick={(e) => {
				inputRef.current.focus();
			}}
			className={
				changeClimate
					? `${background} text-white drop-shadow h-full w-full overflow-auto p-4 box-border bg-[url('assets/background.gif')] bg-no-repeat`
					: `${background} text-white drop-shadow h-full w-full overflow-auto p-4 box-border`
			}>
			{/*  output is displayed here styled white */}
			<div className="whitespace-pre-line text-blue-100 drop-shadow-md">
				{output}
			</div>
			{/* default user is displayed here styled pink */}
			<span className="flex text-pink-300 drop-shadow-md mb-50">
				{username}:&nbsp;
				{/* input box is displayed here styled white */}
				<input
					ref={inputRef}
					type="text"
					className="border-none outline-none m-0 p-0
				bg-transparent color-white w-full text-white drop-shadow "
					value={input}
					onChange={(e) =>
						setInput(e.target.value)
					} /* on change, update input */
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setHistory([...history, input]);
							setCurrentHistoryIndex(history.length);

							const userInput = input
								.trim()
								.toLowerCase(); /* trim white space and make lowercase */
							let newOutput = "";
							newOutput = output + "\n"; /* add new line to output */
							newOutput += "$ " + userInput + "\n";
							/* add user input to output if type is standard is text with no nested context */
							// if (commands.hasOwnProperty(userInput)) {
							if (userInput in commands) {
								const commandResult = commands[userInput]();
								if (userInput == "change climate") {
									setChangeClimate(true);
									alert(
										"Congrats! You solved global warming! Keep up the hard work :)"
									);
								} else if (userInput == "change color") {
									setBackground(
										background == "bg-primary" ? "bg-secondary" : "bg-primary"
									);
								} else if (userInput == "change user") {
									setUsername(username == "user" ? "root" : "user");
								} else if (userInput == "charlie") {
									setCharlie(true);
									commands["help"] = () => ({
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
											"'charlie' - DON'T \n" +
											"'ls' - list files in directory \n" +
											"'open' - view file contents \n",
									});
								} else if (
									!charlie &&
									(userInput == "ls" || userInput == "open")
								) {
									newOutput +=
										"You are not yet authorized to access this ressource";
								} else if (userInput == "open charlie.png") {
									setCharlieSolved(true);
								} else if (userInput == "start looking for charlie") {
									setIsStarting(true);
								} else if (commandResult.type === "text") {
									newOutput += commandResult.value;
								} else if (commandResult.type === "link") {
									/* if type is link, open link in new tab. More types and actions to do with them made here. Can add image type for example */
									window.open(
										commandResult.value,
										"_blank",
										"noopener,noreferrer"
									);
									newOutput += `Opened ${commandResult.value} in a new tab`; /* add link to output */
								} else if (commandResult.type === "clear") {
									window.location.reload();
								}
								if (commandResult.exec) {
									console.log(commandResult.exec);
									eval(commandResult.exec);
								}

								if (commandResult.context) {
									setCommandContext(commandResult.context);
								} else {
									setCommandContext(null);
								} /* change context to nested context if there is one */
							} else if (
								commandContext === "websites" &&
								websiteCommands.hasOwnProperty(userInput)
							) {
								const commandResult = websiteCommands[userInput]();
								if (commandResult.type === "link") {
									window.open(
										commandResult.value,
										"_blank",
										"noopener,noreferrer"
									);
									newOutput += `Opened ${commandResult.value} in a new tab`;
								}
								setCommandContext(null);
							} else if (
								commandContext === "socials" &&
								socialsCommands.hasOwnProperty(userInput)
							) {
								const commandResult = socialsCommands[userInput]();
								if (commandResult.type === "link") {
									window.open(
										commandResult.value,
										"_blank",
										"noopener,noreferrer"
									);
									newOutput += `Opened ${commandResult.value} in a new tab`;
								}
								setCommandContext(null);
							} else {
								/* if command is not found, display error message */
								newOutput += "Command not found";
							}
							setOutput(newOutput); /* update output */
							setInput(""); /* clear input */
						}
						if (e.key === "ArrowUp") {
							/* on up arrow, get previous command from history */
							if (history.length > 0) {
								if (currentHistoryIndex >= 0) {
									setCurrentHistoryIndex(currentHistoryIndex - 1);
									setInput(history[currentHistoryIndex]);
								} else {
									setInput(history[0]);
								}
							}
						}
						if (e.key === "ArrowDown") {
							/* on down arrow, get next command from history */
							if (history.length > 0) {
								if (currentHistoryIndex < history.length - 1) {
									setCurrentHistoryIndex(currentHistoryIndex + 1);
									setInput(history[currentHistoryIndex]);
								} else {
									setInput(history[history.length - 1]);
								}
							}
						}
					}}
				/>
			</span>
			<div className={charlieSolved ? "" : "hidden"}>
				<img src={charlie_image} />
			</div>
		</div>
	);
}

export default Terminal;
