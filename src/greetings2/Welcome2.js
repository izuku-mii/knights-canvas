const { createCanvas, loadImage } = require("canvas");
const axios = require("axios");

module.exports = class Welcome2 {

    constructor() {
        this.fm = "https://k.top4top.io/p_3604d1kx31.png";
        this.bg = "https://files.cloudkuimages.guru/images/b21475ec2285.jpg";
        this.avatar = "https://files.cloudkuimages.guru/images/e7bccdc4da98.jpg";
        this.username = "Corazon - Oota";
        this.grupname = "Kashiwada Bot";
        this.member = "500";
    }

    // setter methods
    setAvatar(v) { this.avatar = v; return this; }
    setUsername(v) { this.username = v; return this; }
    setBg(v) { this.bg = v; return this; }
    setGroupname(v) { this.grupname = v; return this; }
    setMember(v) { this.member = v; return this; }

    // helper: load image from URL or local
    async #load(src) {
        if (!src) throw new Error("No image source provided");
        if (/^https?:\/\//.test(src)) {
            const res = await axios.get(src, { responseType: "arraybuffer" });
            return await loadImage(Buffer.from(res.data));
        } else {
            return await loadImage(src);
        }
    }

    async toAttachment() {
        const canvas = createCanvas(600, 300);
        const ctx = canvas.getContext("2d");

        // background
        const background = await this.#load(this.bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // frame
        const fram = await this.#load(this.fm);
        ctx.drawImage(fram, 0, 0, canvas.width, canvas.height);

        // avatar (rotated)
        ctx.save();
        ctx.beginPath();
        ctx.rotate(-17 * Math.PI / 180);
        const avatar = await this.#load(this.avatar);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.drawImage(avatar, -4, 130, 113, 113);
        ctx.strokeRect(-4, 130, 113, 113);
        ctx.restore();

        // group name
        const usrname = this.grupname;
        const name = usrname.length > 10 ? usrname.substring(0, 10) + "..." : usrname;
        ctx.globalAlpha = 1;
        ctx.font = "20px CubestMedium";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(name, 392, 173);

        // member count
        ctx.font = "700 20px Courier New";
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${this.member}th member`, 250, 290);

        // username
        const username = this.username;
        const namalu = username.length > 12 ? username.substring(0, 15) + "..." : username;
        ctx.globalAlpha = 1;
        ctx.font = "700 27px Courier New";
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(namalu, 242, 248);

        return canvas;
    }
}

