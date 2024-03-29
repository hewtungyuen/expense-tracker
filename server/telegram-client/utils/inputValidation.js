const numberValidationDecorator = (func) => {
  const inner = (ctx) => {
    const userInput = ctx.message.text;
    if (userInput === "Cancel") {
      func(ctx);
    }
    const num = +userInput;

    if (num) {
      func(ctx);
    } else {
      ctx.reply("please input a valid number");
    }
  };
  return inner;
};

module.exports = numberValidationDecorator;
