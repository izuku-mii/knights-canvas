const Greeting = require("./Base");

module.exports = class Goodbye extends Greeting {
    constructor() {
        super();
        this.textTitle = "GOODBYE";
        this.textMessage = "{server}";
        this.colorTitle = "#df0909";
        this.assent = "https://g.top4top.io/p_3604cdqyo1.png";
    }
};

